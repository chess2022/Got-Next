import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Constants from "expo-constants";

const apiKey = Constants.manifest?.extra?.googleApiKey;


export default class MapViewScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLocationPermission: false,
      latitude: 0,
      longitude: 0,
      results: [],
      isLoading: true
    };
  }
  
  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      alert("Location permission not granted");
    }
  }

  async getHoopSearch() {
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = "&radius=16000";
    const type = "&keyword=basketball+court";
    const key = `&key=${apiKey}`;
    const hoopSearchUrl = url + location + radius + type + key;
    fetch(hoopSearchUrl)
      .then((response) => response.json())
      .then((results) => this.setState({ hoopList: results }))
      .catch((e) => console.log(e));
  }


  componentDidMount() {
    this.getLocationAsync();
    this.getHoopSearch();
  }

  render() {
    console.log(this.state.hoopList.results);
    return (
      <View style={this.styles.container}>
        <FlatList
          data={this.state.hoopList.results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          style={{
            backgroundColor: "grey",
            width: "80%",
            margin: 60,
            padding: 5,
          }}
        />
        <TouchableOpacity onPress={() => this.handleHoopSearch()}>
          <Text
            style={{
              backgroundColor: "grey",
              color: "white",
              padding: 20,
              marginBottom: 50,
            }}
          >
            Search Courts
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});