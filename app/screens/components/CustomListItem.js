import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "../../config/firebase";

function CustomListItem({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessages] = React.useState([])
  const db = getFirestore()

  React.useEffect(() =>
    onSnapshot(
      query(
        collection(db, `chats/${id}`, 'messages'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      }
    )
  )

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
