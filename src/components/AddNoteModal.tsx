import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button } from 'react-native';

export default function AddNoteModal({
  visible,
  onSave,
  onClose,
  initialData,
}: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData, visible]);

  const save = () => {
    onSave(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <Modal visible={visible}>
      <View>
        <TextInput placeholder="Title" value={title} onChangeText={setTitle} />

        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
        />

        <Button title="Save ✔" onPress={save} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}
