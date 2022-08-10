import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function SignUpScreen(navigation) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Sign In");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signup</Text>

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <View style={styles.inputSection}>
          <FontAwesome
            style={styles.inputIcon}
            name="envelope"
            size={16}
            color="black"
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.inputSection}>
          <FontAwesome
            style={styles.inputIcon}
            name="key"
            size={16}
            color="black"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
        </View>
        <Text
          style={{ color: "blue", textAlign: "center", fontSize: 16 }}
          onPress={() => navigation.navigate("Sign In")}
        >
          Already have an account? Sign in here.
        </Text>
        <View style={styles.control}>
          <Button
            title="Sign up"
            onPress={signUp}
            backgroundColor="#fc5603"
            color="white"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    paddingTop: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  controls: {
    flex: 1,
  },
  control: {
    marginTop: 20,
    width: 350,
    backgroundColor: "#fc5603",
    alignItems: "center",
    fontSize: 18,
    alignSelf: "center",
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    margin: 10,
    width: 350,
    fontSize: 18,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    fontSize: 18,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignUpScreen;