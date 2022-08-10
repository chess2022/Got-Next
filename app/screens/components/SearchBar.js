import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

export default class Search extends Component {
    render() {
        return (
            <SearchBar
                placeholder="Search city for PUGs"
                value={null}
                // round
                platform="android"
                style={styles.searchContainer}
                />
        ) 
        
    }
}

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomColor: "#ECECEC",
    borderBottomWidth: 2
  },
  searchBar:{
    description:{
      fontWeight:"bold"
    },
    predefinedPlacesDescription:{
      color:"red"
    },
    textInputContainer:{
      backgroundColor:'#369',
      top:50,
      width: "80%",
      borderWidth:0
    },
    textInput:{
      marginLeft:0,
      marginRight:0,
      height:38,
      color:'#5d5d5d',
      fontSize:16,
      borderWidth:0
    },
    listView:{
      backgroundColor:'rgba(192,192,192,0.9)',
      top:23
    }}
})