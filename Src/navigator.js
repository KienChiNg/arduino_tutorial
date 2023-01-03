import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Display from './display';
import Temperature from './Temperature'
import Humidity from './Humidity'
import Led from './Led'

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Display} />
        <Tab.Screen name="Tempera" component={Temperature} />
        <Tab.Screen name="Humidity" component={Humidity} />
        <Tab.Screen name="Led" component={Led} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
