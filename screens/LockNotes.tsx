import React from 'react';
import { View, Text } from 'react-native';

export default function LockNotes() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#FFD700',
          letterSpacing: 2,
        }}
      >
        COMING SOON
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 14,
          color: '#999',
        }}
      >
        Secure notes feature is under development
      </Text>
    </View>
  );
}
