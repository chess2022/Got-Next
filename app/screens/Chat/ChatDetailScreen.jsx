import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  getAuth,
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from '../../config/firebase';

function ChatDetailScreen({ navigation, route }) {
  const [msgInput, setMsgInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const auth = getAuth();
  const db = getFirestore();

  const scrollRef = useRef();

  const sendMsg = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, `chats/${route.params.id}`, "messages"), {
      timestamp: serverTimestamp(),
      message: msgInput,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
      .then(() => setMsgInput(""))
      .catch((error) => alert(error.message));
  };

  React.useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, `chats/${route.params.id}`, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      ),
    [route]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.photoURL,
            }}
          />
          <Text style={{ color: "black", marginLeft: 10, fontWeight: "bold" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, messages]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* all the sent messages */}
          <>
            <ScrollView
              style={{ bottom: 150, top: 0 }}
              contentContainerStyle={{
                paddingTop: 100,
                justifyContent: "flex-end",
                bottom: 80,
                paddingBottom: 15
              }}
              ref={scrollRef}
              onContentSizeChange={() =>
                scrollRef.current.scrollToEnd({ animated: true })
              }
            >
              {messages.map((message) =>
                message.email === auth.currentUser.email ? (
                  <View key={message.id} style={{ alignItems: "flex-end" }}>
                    <View style={styles.receiver}>
                      <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        right={-5}
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={styles.receiverText}>{message.message}</Text>
                    </View>
                  </View>
                ) : (
                  <View key={message.id} style={{ flexDirection: "column" }}>
                    <View style={styles.sender}>
                      <Avatar
                        rounded
                        source={{ uri: message.photoURL }}
                        size={30}
                        position="absolute"
                        bottom={-15}
                        left={-5}
                        containerStyle={{
                          position: "absolute",
                          bottom: -15,
                          right: -5,
                        }}
                      />
                      <Text style={styles.senderName}>
                        {message.displayName}
                      </Text>
                      <Text style={styles.senderText}>{message.message}</Text>
                    </View>
                  </View>
                )
              )}
            </ScrollView>

            {/* the text input box for typing your message */}
            <View style={styles.footer}>
              <TextInput
                placeholder="Message..."
                style={styles.textInput}
                value={msgInput}
                onChangeText={(text) => setMsgInput(text)}
                onSubmitEditing={sendMsg}
              />
              <TouchableOpacity onPress={sendMsg} activeOpacity={0.5}>
                <Ionicons size="26" name="send" color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    bottom: 55,
    backgroundColor: 'white'
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
  receiverText: {
    color: "black",
    marginLeft: 10,
  },
  senderText: {
    color: "white",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ececec",
    alignItems: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b68e6",
    alignItems: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
