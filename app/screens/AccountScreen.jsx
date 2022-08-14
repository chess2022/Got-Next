import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { signOut, getAuth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function AccountScreen() {
  const { user } = useAuthentication();
  const auth = getAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button
        title="Update Account"
        style={styles.button}
        onPress={() => navigation.navigate("Edit Account")}
      />
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
  },
});
