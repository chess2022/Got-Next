import { NavigationHelpersContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthentication, auth } from "../utils/hooks/useAuthentication";
import { SimpleLineIcons } from "@expo/vector-icons";
import { signOut } from "../config/firebase";

export default function HomeScreen() {
  
  const { user } = useAuthentication();
  const signOutUser = () => {signOut(auth)};

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      {/* <View style={styles.signout}>
        <Text>Sign Out</Text>
        <TouchableOpacity
          style={{
            marginLeft: 10,
          }}
          activeOpacity={0.5}
          onPress={signOutUser}
        >
          <SimpleLineIcons name="logout" size={18} color="black" />
        </TouchableOpacity>
      </View> */}
      <Button
        title="Sign Out"
        style={styles.button}
        onPress={signOutUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signout: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  }
});
