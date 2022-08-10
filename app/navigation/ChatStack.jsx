import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatDetailScreen from "../screens/Chat/ChatDetailScreen";
import AddChatScreen from "../screens/Chat/AddChatScreen";
import ChatHomeScreen from "../screens/Chat/ChatHomeScreen";
import AuthStack from "./authStack";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c68ed" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function ChatStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="ChatIndex" component={ChatHomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatDetailScreen} />
        <Stack.Screen name="Home" componenet={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
