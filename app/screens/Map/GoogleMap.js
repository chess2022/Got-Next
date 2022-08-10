import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PlaceList from "../components/PlaceList";
import Constants from "expo-constants";

// const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=basketball+court`;

class GoogleMap extends Component {
  static navigationOptions = (props) => {
    const placeName = props.navigation.getParam("placeName");
    return { headerTitle: placeName.toUpperCase() };
  };
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
  componentDidMount() {
    console.log(this.props);
    const { navigation } = this.props;
    const placeType = navigation.getParam("placeType");
    this.setState({ placeType: placeType });

    this.getCurrentLocation();
  }
  
   // Get current user's position
  

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        this.setState({ lat: lat, long: long });
        this.getPlaces();
    });
  }

  // Get the place url
  getPlacesUrl(lat, long, radius, type, apiKey) {
    const baseUrl =`https://maps.googleapis.com/maps/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=${type}`;
    // const apiKey = Constants.manifest?.extra?.googleApiKey;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${api}&input=basketball+court`;

  }

  getPlaces() {
    const { lat, long, placeType } = this.state;
    const markers = [];
    const apiKey = Constants.manifest?.extra?.googleApiKey;
    const url = this.getPlacesUrl(lat, long, 1500, placeType, apiKey);
    fetch(url)
        .then(res => res.json())
        .then(res => {
            res.results.map((element, index) => {
                const marketObj = {};
                marketObj.id = element.id;
                marketObj.name = element.name;
                marketObj.photos = element.photos;
                marketObj.rating = element.rating;
                marketObj.vicinity = element.vicinity;
                marketObj.marker = {
                    latitude: element.geometry.location.lat,
                    longitude: element.geometry.location.lng
                };
                markers.push(marketObj);
            });
            // update the places array
            this.setState({ places: markers });
        });
  }

  render() {
    const { lat, long, places } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <MapView
            style={{flex:1}}
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
            <PlaceList places={places}/>
        </View>
      </View>
    );
  }
}

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

export default GoogleMap;
