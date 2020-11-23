import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MoviesScreen from '../screens/MoviesScreen';
import BoxesScreen from '../screens/BoxesScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="DVDthèque"
        component={TabBoxesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-disc" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Films"
        component={TabMoviesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-film" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabBoxesStack = createStackNavigator<TabOneParamList>();

function TabBoxesNavigator() {
  return (
    <TabBoxesStack.Navigator>
      <TabBoxesStack.Screen
        name="BoxesScreen"
        component={BoxesScreen}
        options={{ headerTitle: 'Ma DVDthèque' }}
      />
    </TabBoxesStack.Navigator>
  );
}

const TabMoviesStack = createStackNavigator<TabTwoParamList>();

function TabMoviesNavigator() {
  return (
    <TabMoviesStack.Navigator>
      <TabMoviesStack.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{ headerTitle: 'Mes films' }}
      />
    </TabMoviesStack.Navigator>
  );
}
