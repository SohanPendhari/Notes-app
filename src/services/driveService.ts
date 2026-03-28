import axios from 'axios';

const FOLDER_NAME = 'EasyNoteX';
const FILE_NAME = 'notes_info.json';

// 🔍 Get or create folder
const getOrCreateFolder = async (token: string) => {
  const query = `name='${FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;

  const res = await axios.get(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  const folderRes = await axios.post(
    'https://www.googleapis.com/drive/v3/files',
    {
      name: FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return folderRes.data.id;
};

// 🔍 Get file
const getFile = async (token: string, folderId: string) => {
  const query = `name='${FILE_NAME}' and '${folderId}' in parents and trashed=false`;

  const res = await axios.get(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data.files[0];
};

// 📥 READ
export const readJSON = async (token: string) => {
  try {
    const folderId = await getOrCreateFolder(token);
    const file = await getFile(token, folderId);

    if (!file) return [];

    const res = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.log('READ ERROR:', err);
    return [];
  }
};

// 🚀 CREATE (Upload new note)
export const uploadJSON = async (token: string, newNote: any) => {
  const folderId = await getOrCreateFolder(token);
  const existingFile = await getFile(token, folderId);

  let notes: any[] = [];

  if (existingFile) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/drive/v3/files/${existingFile.id}?alt=media`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      notes = Array.isArray(res.data) ? res.data : [];
    } catch {
      notes = [];
    }
  }

  const updatedNotes = [newNote, ...notes.filter(n => n.id !== newNote.id)];

  if (existingFile) {
    await axios.patch(
      `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=media`,
      JSON.stringify(updatedNotes),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } else {
    const boundary = 'foo_bar_baz';

    const body =
      `--${boundary}\r\n` +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify({
        name: FILE_NAME,
        parents: [folderId],
      }) +
      `\r\n--${boundary}\r\n` +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(updatedNotes) +
      `\r\n--${boundary}--`;

    await axios.post(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
      },
    );
  }
};

// ❌ DELETE NOTE
export const deleteNoteFromDrive = async (token: string, noteId: string) => {
  const folderId = await getOrCreateFolder(token);
  const file = await getFile(token, folderId);

  if (!file) return;

  const res = await axios.get(
    `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const notes = Array.isArray(res.data) ? res.data : [];

  const updatedNotes = notes.filter(n => n.id !== noteId);

  await axios.patch(
    `https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=media`,
    JSON.stringify(updatedNotes),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};

// ✏️ UPDATE (EDIT NOTE)
export const updateNoteInDrive = async (token: string, updatedNote: any) => {
  const folderId = await getOrCreateFolder(token);
  const file = await getFile(token, folderId);

  if (!file) return;

  const res = await axios.get(
    `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  let notes = Array.isArray(res.data) ? res.data : [];

  const updatedNotes = notes.map(n =>
    n.id === updatedNote.id ? updatedNote : n,
  );

  await axios.patch(
    `https://www.googleapis.com/upload/drive/v3/files/${file.id}?uploadType=media`,
    JSON.stringify(updatedNotes),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
};
