import {
  updateCurrentUser,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";
import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { updateProfile } from "../../config/firebase";
import { useAuthentication } from "../../utils/hooks/useAuthentication";

function EditAccount({ navigation }) {
  const [fullname, setFullname] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");
  const { user } = useAuthentication();
  const auth = getAuth();

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerBackTitle: "Back To Account",
//     });
//   }, [navigation]);

  const update = () => {
    updateCurrentUser(user)
      .then((authUser) => {
        const user = authUser.user;
        updateProfile(user, {
          displayName: fullname,
          photoURL: imgurl,
        })
          .then(() => console.log("Profile Updated!"))
          .catch((error) => console.log(error.message));
      })
      .catch((error) => alert(error.message));
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Update your account details
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Fullname"
          autoFocus
          type="text"
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />
        <Input
          placeholder="Profile ImageURL (Optional)"
          type="text"
          value={imgurl}
          onChangeText={(text) => setImgurl(text)}
        //   onSubmitEditing={register}
        />
      </View>

      <Button
        raised
        containerStyle={styles.button}
        onPress={update}
        title="Update"
      />
      <Button
        raised
        containerStyle={styles.button}
        onPress={sendPasswordReset}
        title="Reset Password"
      />
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
