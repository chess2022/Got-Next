import { updateCurrentUser } from 'firebase/auth';
import React from 'react';
import { StyleSheet, Text, View, Button } from "react-native";
import { getAuth, updateProfile } from "../../config/firebase";



function EditAccount(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imgurl, setImgurl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back To Login",
    });
  }, [navigation]);

  const update = () => {
    const auth = getAuth();
    updateCurrentUser( user)
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

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Got Next account
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
          placeholder="Email"
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
        />
        <Input
          placeholder="Profile ImageURL (Optional)"
          type="text"
          value={imgurl}
          onChangeText={(text) => setImgurl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        raised
        containerStyle={styles.button}
        onPress={handleUpdate}
        title="Update"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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

})

export default EditAccount;