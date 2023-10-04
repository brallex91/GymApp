import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateWorkout from "../components/CreateWorkout";
import BottomNav from "./BottomNavigation";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name=" "
        component={BottomNav}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="CreateWorkout"
        component={CreateWorkout}
        options={{
          headerShown: true,
          title: "Create Workout",
        }}
      />
    </Stack.Navigator>
  );
}
