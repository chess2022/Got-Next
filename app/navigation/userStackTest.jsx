import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatDetailScreen from "../screens/Chat/ChatHomeScreen";
import AddChatScreen from "../screens/Chat/AddChatScreen";
import ChatHomeScreen from "../screens/Chat/ChatHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function UserStackTest() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={ChatHomeScreen} />
        <Stack.Screen name="Add Chat" component={AddChatScreen} />
        <Stack.Screen name="Chat Detail" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
