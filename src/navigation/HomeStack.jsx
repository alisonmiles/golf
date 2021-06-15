import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: 'Post a round',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="golf" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
