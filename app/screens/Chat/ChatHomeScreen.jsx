import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { collection, getFirestore, onSnapshot } from '../../config/firebase'
import { Ionicons } from "@expo/vector-icons";


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
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <View style={{flexDirection:"row", alignItems:"center", marginLeft: 10}}>
          <Text>Start a new chat</Text>
          <TouchableOpacity
            style={{marginLeft: 10}}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <Ionicons name="ios-add-circle-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
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
