import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  item: string;
  index: number;
  deleteNote: (index: number) => void;
};

export default function NoteItem({ item, index, deleteNote }: Props) {
  return (
    <View style={styles.box}>
      <Text>{item}</Text>

      <Button title="Delete" onPress={() => deleteNote(index)} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
  },
});
