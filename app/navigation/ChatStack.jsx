import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatDetailScreen from "../screens/Chat/ChatDetailScreen";
import AddChatScreen from "../screens/Chat/AddChatScreen";
import ChatHomeScreen from "../screens/Chat/ChatHomeScreen";
import { Avatar } from "react-native-elements";
import { getAuth } from "../config/firebase";

const Stack = createNativeStackNavigator();
const auth = getAuth();

function AvatarPic() {
  return <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />;
}

export default function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatIndex"
        component={ChatHomeScreen}
        options={({ navigation, route }) => ({ headerTitle: (props) => <AvatarPic {...props}/> })}
      />
      <Stack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{ title: "AddChat" }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{ title: "ChatDetail" }}
      />
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
