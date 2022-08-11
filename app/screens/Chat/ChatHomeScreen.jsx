import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { collection, getFirestore, onSnapshot } from '../../config/firebase'
import { SimpleLineIcons } from "@expo/vector-icons";


function ChatHomeScreen({navigation}) {
  const [chats, setChats] = useState([])
  const db = getFirestore()
  
  useEffect(
    () =>
      onSnapshot(collection(db, 'chats'), (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }),[])
      
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat Topics",
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("AddChat")}>
            <SimpleLineIcons name="pencil" size={18} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
