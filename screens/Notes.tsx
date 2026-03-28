import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import AddNoteModal from '../src/components/AddNoteModal';
import NoteCard from '../src/components/NoteCard';
import { createNote } from '../src/services/notesService';
import {
  uploadJSON,
  readJSON,
  deleteNoteFromDrive,
  updateNoteInDrive,
} from '../src/services/driveService';

export default function Notes({ token }: any) {
  const [notes, setNotes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<any>(null);

  // 🔥 LOAD NOTES
  const loadNotes = async () => {
    try {
      const data = await readJSON(token);
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log('Fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadNotes();
  }, [token]);

  // 🚀 ADD OR EDIT NOTE
  const handleSave = async (title: string, content: string) => {
    setOpen(false);

    try {
      if (editingNote) {
        // ✏️ EDIT
        const updated = {
          ...editingNote,
          title,
          content,
        };

        await updateNoteInDrive(token, updated);
        setEditingNote(null);
      } else {
        // ➕ ADD
        const newNote = createNote(title, content);
        await uploadJSON(token, newNote);
      }

      // 🔥 ALWAYS REFRESH
      await loadNotes();
    } catch (err) {
      console.log('Save failed', err);
    }
  };

  // ❌ DELETE NOTE
  const deleteNote = async (id: string) => {
    try {
      await deleteNoteFromDrive(token, id);
      await loadNotes();
    } catch (err) {
      console.log('Delete failed', err);
    }
  };

  // ✏️ OPEN EDIT MODAL
  const editNote = (note: any) => {
    setEditingNote(note);
    setOpen(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        padding: 15,
      }}
    >
      {/* 🔄 LOADING */}
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Loading notes...
        </Text>
      ) : (
        <FlatList
          data={notes}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onDelete={deleteNote} onEdit={editNote} />
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      )}

      {/* ➕ FLOATING BUTTON */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: '#f5f5f5',
          height: 105,
          width: 105,
          borderTopLeftRadius: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 70,
            height: 70,
            borderRadius: 45,
            backgroundColor: '#FFD700',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setEditingNote(null); // 🔥 reset edit
            setOpen(true);
          }}
        >
          <Text
            style={{
              fontSize: 50,
              color: '#ffffff',
              marginTop: -2,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🪟 MODAL */}
      <AddNoteModal
        visible={open}
        onSave={handleSave}
        onClose={() => {
          setOpen(false);
          setEditingNote(null);
        }}
        initialData={editingNote} // 🔥 important for edit
      />
    </View>
  );
}
