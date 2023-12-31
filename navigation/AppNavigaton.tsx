import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ExerciseScreen from "../screens/ExerciseScreen";
import HomeScreen from "../screens/HomeScreen";
import MapViewScreen from "../screens/MapViewScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="My Exercises"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Database"
        component={ExerciseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="database" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Map View"
        component={MapViewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
