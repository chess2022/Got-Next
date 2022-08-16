import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { getAuth, updateProfile } from "../../config/firebase";

function EditAccount({ navigation }) {
  const auth = getAuth();
  const [value, setValue] = React.useState({
    displayName: '',
    photoUrl: '',
    error: ''
  })

  const update = () => {
    const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: value.displayName,
        photoURL: value.photoUrl,
      }).then(() => {
        console.log("Profile updated")
        navigation.navigate("Account Details");
      }).catch((error) => {
        console.log(error.message)
      });
    }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h4 style={{ marginBottom: 50 }}>
        Update your account details
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Fullname"
          autoFocus
          type="text"
          value={value.displayName}
          onChangeText={(text) => setValue({ ...value, displayName: text })}
        />
        <Input
          placeholder="Profile ImageURL (Optional)"
          type="text"
          value={value.photoUrl}
          onChangeText={(text) => setValue({ ...value, photoUrl: text })}
        />
      </View>

      <Button
        raised
        containerStyle={styles.button}
        onPress={update}
        title="Update"
      />
      {/* <Button
        raised
        containerStyle={styles.button}
        onPress={sendPasswordReset}
        title="Reset Password"
      /> */}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ImageDimension: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    width: 300,
    marginVertical: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default EditAccount;
