import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatDetailScreen from "../screens/Chat/ChatDetailScreen";
import AddChatScreen from "../screens/Chat/AddChatScreen";
import ChatHomeScreen from "../screens/Chat/ChatHomeScreen";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c68ed", alignItems: "left" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function ChatStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="ChatIndex" component={ChatHomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      </Stack.Navigator>
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
