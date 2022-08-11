import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatDetailScreen from "../app/screens/Chat/ChatHomeScreen";
import AddChatScreen from "../app/screens/Chat/AddChatScreen";
import ChatHomeScreen from "../app/screens/Chat/ChatHomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const config = {
  screens: {
    Chat: {
      screens: {
        ChatDetail
      },
    },
  },
};
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
