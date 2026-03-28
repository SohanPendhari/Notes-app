import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function NoteCard({ note, onDelete, onEdit }: any) {
  return (
    <View style={styles.card}>
      {/* 🔥 ACTION BUTTONS */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(note)}>
          <Image
            source={require('../../assets/editicon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(note.id)}>
          <Image
            source={require('../../assets/deleticon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* 📝 TITLE */}
      <Text style={styles.title} numberOfLines={1}>
        {note.title}
      </Text>

      {/* 📄 CONTENT */}
      <Text style={styles.content} numberOfLines={3} ellipsizeMode="tail">
        {note.content}
      </Text>

      {/* 📅 DATE */}
      <Text style={styles.date}>
        {new Date(note.createdAt).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    margin: 8,
    position: 'relative',
    width: '45%',
    minHeight: 130,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  title: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },

  content: {
    color: '#333',
    marginTop: 5,
    marginBottom: 20,
  },

  date: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    fontSize: 12,
    color: '#aaa',
  },

  actions: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    gap: 14,
  },

  icon: {
    width: 24, // 🔥 adjust size here
    height: 24,
    resizeMode: 'contain',
  },
});
