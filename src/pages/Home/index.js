// Home.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';

const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <View>
      <Text>HOmeee</Text>
    </View>
  )
}
