import React, { useLayoutEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatDetailScreen from "../screens/Chat/ChatDetailScreen";
import AddChatScreen from "../screens/Chat/AddChatScreen";
import ChatHomeScreen from "../screens/Chat/ChatHomeScreen";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { getAuth, signOut} from "../config/firebase";

const Stack = createNativeStackNavigator();
const auth = getAuth();

const signOutUser = () => {
    signOut(auth);
  };
const globalScreenOptions = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 120,
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChatScreen")}
          >
            <SimpleLineIcons name="pencil" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginLeft: 30,
            }}
            activeOpacity={0.5}
            onPress={signOutUser}
          >
            <SimpleLineIcons name="logout" size={18} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
};

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen
        name="ChatIndex"
        component={ChatHomeScreen}
        options={{ title: "ChatIndex" }}
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
