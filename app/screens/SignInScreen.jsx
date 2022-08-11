import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { getAuth, signInWithEmailAndPassword } from "../config/firebase";

const logo = require("../assets/got-next-logo.png");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      console.log(error.message)
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image source={logo} style={styles.ImageDimension} />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={signIn}
        title="Login"
      />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  ImageDimension: {
    width: 210,
    height: 30,
    marginBottom: 30,
  },
  inputContainer: {
    width: 300,
    marginVertical: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
