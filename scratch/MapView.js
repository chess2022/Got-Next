import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import PlaceList from "../components/PlaceList";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";


class MapViewScreen extends Component {
  constructor(props) {
    super(props);
    // Initial State
    this.state = {
      lat: null,
      long: null,
      places: [],
      isLoading: false,
      placeType: "",
    };
  }

  // Get current user's position
  async getCurrentLocation() {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION_FOREGROUND
    );
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      this.getPlaces();
    } else {
      alert("Location permission not granted");
    }
  }

  // url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY",
  // Get the place url
  getPlacesUrl(lat, long, radius, apiKey) {
    const baseUrl = `https://maps.googleapis.com/maps/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const keyword = `&keyword=basketball+court`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${keyword}${api}`;
  }

  getPlaces() {
    const { lat, long } = this.state;
    const markers = [];
    const apiKey = Constants.manifest?.extra?.googleApiKey;
    const url = this.getPlacesUrl(lat, long, 16000, apiKey);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        res.results.map((element, index) => {
          const marketObj = {};
          marketObj.place_id = element.id;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          marketObj.vicinity = element.vicinity;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng,
          };
          markers.push(marketObj);
        });
        // update the places array
        this.setState({ places: markers });
      });
  }
  componentDidMount() {
    console.log(this.props);
    this.getCurrentLocation();
  }
  
  render() {
    const { lat, long, places } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            loadingEnabled={true}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {places.map((marker, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.marker.latitude,
                  longitude: marker.marker.longitude,
                }}
                title={marker.name}
              />
            ))}
          </MapView>
        </View>
        <View style={styles.placeList}>
          <PlaceList places={places} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: "60%",
  },
  placeList: {
    flex:1,
    justifyContent: "center",
  }, 
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  searchBar: {
    description: {
      fontWeight: "bold",
    },
    predefinedPlacesDescription: {
      color: "red",
    },
    textInputContainer: {
      backgroundColor: "#369",
      top: 50,
      width: "80%",
      borderWidth: 0,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: "rgba(192,192,192,0.9)",
      top: 23,
    },
  },
});

export default MapViewScreen;
