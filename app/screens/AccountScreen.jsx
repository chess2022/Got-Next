import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { signOut, getAuth } from "../config/firebase";

export default function HomeScreen() {
  
  const { user } = useAuthentication();
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>

      <Button
        title="Sign Out"
        style={styles.button}
        onPress={() => signOut(auth)}
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
