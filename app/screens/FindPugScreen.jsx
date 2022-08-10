import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

const GOOGLE_API_KEY = Constants.manifest?.extra?.googleApiKey;

function FindPugScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        loadingEnabled={true}
        initialRegion={{
          latitude: 45.5152,
          longitude: -122.6784,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 45.5152,
            longitude: -122.6784,
          }}
        />
      </MapView>
      <GooglePlacesAutocomplete
        style={styles.searchBar}
        placeholder="Search City for Pick-up Games"
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        GooglePlacesDetailsQuery={{
          fields: "geometry",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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

export default FindPugScreen;
