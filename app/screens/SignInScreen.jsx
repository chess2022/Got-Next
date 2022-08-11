import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { getAuth, signInWithEmailAndPassword } from "../config/firebase";

const logo = require("../assets/got-next-logo.png");
const auth = getAuth();

function LoginScreen({ navigation }) {
 const [value, setValue] = React.useState({
   email: "",
   password: "",
   error: "",
 });

 async function signIn() {
   if (value.email === "" || value.password === "") {
     setValue({
       ...value,
       error: "Email and password are mandatory.",
     });
     return;
   }

   try {
     await signInWithEmailAndPassword(auth, value.email, value.password);
     navigation.navigate("Sign In");
   } catch (error) {
     setValue({
       ...value,
       error: error.message,
     });
   }
 }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image source={logo} style={styles.ImageDimension} />
      <View style={styles.inputContainer}>
        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />
        <Input
          placeholder="Password"
          type="password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Sign Up")}
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
