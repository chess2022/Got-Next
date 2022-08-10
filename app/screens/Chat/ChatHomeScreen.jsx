import { StatusBar } from 'expo-status-bar'
import { SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { getAuth, signOut, collection, getFirestore, onSnapshot } from '../../config/firebase'

function ChatHomeScreen({navigation}) {
  const [chats, setChats] = useState([])
  const db = getFirestore()

  useEffect(
    () =>
      onSnapshot(collection(db, 'chats'), (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      }),
    []
  )
  
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
