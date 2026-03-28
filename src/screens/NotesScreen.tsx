import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';

import { createNote } from '../services/notesService';

export default function NotesScreen() {
  const [notes, setNotes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const addNote = (title: string, content: string) => {
    const newNote = createNote(title, content);

    setNotes([newNote, ...notes]);

    setOpen(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notes}
        numColumns={2}
        renderItem={({ item }) => <NoteCard note={item} />}
      />

      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          backgroundColor: 'orange',
          padding: 20,
          borderRadius: 50,
        }}
      >
        <Text style={{ fontSize: 24 }}>+</Text>
      </TouchableOpacity>

      <AddNoteModal
        visible={open}
        onSave={addNote}
        onClose={() => setOpen(false)}
      />
    </View>
  );
}
