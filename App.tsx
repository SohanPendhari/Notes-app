import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import Main from './screens/Main';

import { configureGoogleLogin } from './src/config/googleAuth';
import { googleLogin } from './src/services/authService';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    configureGoogleLogin();
  }, []);

  const login = async () => {
    const t = await googleLogin();
    if (t) setToken(t);
  };

  // 🔐 Stylish Login Screen
  if (!token) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f4f6',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* 🔲 Card */}
        <View
          style={{
            width: '85%',
            backgroundColor: '#fff',
            padding: 25,
            borderRadius: 20,
            alignItems: 'center',
            elevation: 5,
          }}
        >
          {/* 🔥 App Logo */}
          <Image
            source={require('./assets/NOTESAPP.png')} // <-- add your logo here
            style={{
              width: 80,
              height: 80,
              marginBottom: 10,
            }}
            resizeMode="contain"
          />

          {/* 📝 App Name */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#FFD700',
              marginBottom: 5,
            }}
          >
            EasyNoteX
          </Text>

          {/* 📄 Description */}
          <Text
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: 20,
            }}
          >
            Store your notes securely in your Google Drive. Login is required to
            access your personal cloud notes.
          </Text>

          {/* 🔵 Google Button */}
          <TouchableOpacity
            onPress={login}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
              paddingVertical: 12,
              paddingHorizontal: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              elevation: 2,
            }}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
              }}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />

            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 🔥 After login → Main App
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => <Main token={token} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
