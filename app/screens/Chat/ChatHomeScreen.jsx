import { StatusBar } from 'expo-status-bar'
import { SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { getAuth, signOut, collection, getFirestore, onSnapshot } from '../../config/firebase'

const ChatHomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])
  const auth = getAuth()
  const db = getFirestore()
  
  const signOutUser = () => {
    signOut(auth)
  }

  useEffect(
    () =>
      onSnapshot(collection(db, 'chats'), (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }),
    []
  )
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      // headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      headerLeft: () => (
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
            width: 120,
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.replace("AddChatScreen")}
          >
            <SimpleLineIcons name="pencil" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginLeft: 30,
            }}
            activeOpacity={0.5}
            onPress={signOutUser}
          >
            <SimpleLineIcons name="logout" size={18} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('ChatDetailScreen', {
      id,
      chatName,
    })
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, chatName }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatHomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
})
