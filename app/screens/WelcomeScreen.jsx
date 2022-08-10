import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/got-next-background.png")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/got-next-logo.png")}
        />
        <Text style={styles.text}>Find Your Next Pick-up Game</Text>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  loginButton: {
    position: "absolute",
    alignItems: "center",
    height: 80,
    paddingTop: 30,
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  logo: {
    width: 280,
    height: 40,
  },
  logoContainer: {
    position: "absolute",
    top: 220,
    alignItems: "center",
  },
  loginText: {
    color: "#fc5603",
    fontSize: 18,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default WelcomeScreen;
