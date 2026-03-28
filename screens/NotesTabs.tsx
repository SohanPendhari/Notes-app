import React from 'react';
import { Image, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LockNotes from './LockNotes';
import Notes from './Notes';
import Todo from './Todo';

const Tab = createMaterialTopTabNavigator();

function TabIcon({ icon, focused }: any) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={icon}
        style={{
          width: 32,
          height: 32,
          opacity: focused ? 1 : 0.5,
        }}
      />

      {focused && (
        <View
          style={{
            marginTop: 5,
            width: 20,
            height: 3,
            backgroundColor: '#FFD700',
            borderRadius: 5,
          }}
        />
      )}
    </View>
  );
}

export default function NotesTabs({ token }: any) {
  return (
    <Tab.Navigator
      initialRouteName="Notes"
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarIndicator: () => null,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderRadius: 25,
          marginBottom: 15,
          elevation: 3,
        },
      }}
    >
      {/* Lock */}
      <Tab.Screen
        name="Lock"
        component={LockNotes}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require('../assets/locknotesicon.png')}
              focused={focused}
            />
          ),
        }}
      />

      {/* Notes (FIXED ✅) */}
      <Tab.Screen
        name="Notes"
        children={() => <Notes token={token} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require('../assets/notesicon.png')}
              focused={focused}
            />
          ),
        }}
      />

      {/* Todo */}
      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={require('../assets/todolisticon.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
