import React from 'react';
import { View, Image, Text } from 'react-native';
import NotesTabs from './NotesTabs';

export default function Main({ token }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 🔥 Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 40,
          paddingHorizontal: 15,
          height: 90,
        }}
      >
        <Image
          source={require('../assets/NOTESAPP.png')}
          style={{ width: 50, height: 50, resizeMode: 'contain' }}
        />

        <Text
          style={{
            marginLeft: 10,
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'Fredoka-Regular',
          }}
        >
          <Text
            style={{
              color: '#000',
              textShadowColor: '#1e3a8a',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 0,
              fontFamily: 'Fredoka-Regular',
              fontSize: 25,
            }}
          >
            EasyNote
          </Text>

          <Text
            style={{
              color: '#FFD700',
              fontFamily: 'Fredoka-Regular',
              textShadowColor: '#1e3a8a',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 0,
            }}
          >
            X
          </Text>
        </Text>
      </View>

      {/* 🔥 Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: 15,
          paddingBottom: 30,
        }}
      >
        {/* ✅ PASS TOKEN HERE */}
        <NotesTabs token={token} />
      </View>
    </View>
  );
}
