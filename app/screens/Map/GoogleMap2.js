// // https://maps.googleapis.com/maps/api/place/textsearch/json?query=[yourquerystring]&key=[YOURAPIKEY]
// // https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=YOURAPIKEY
// // find detail on each result
// // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKSp50NI0K4gR6C6L3yYqpYY&fields=name&key=YOURKEY

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";

const apiKey = Constants.manifest?.extra?.googleApiKey;


export default function Map() {
    const [ pin, setPin ] = React.useState({
      latitude: 37.78825,
      longitude: -122.4324
    })
    
    const [region, setRegion] = React.useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    return (
      <View style={{ marginTop: 50, flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          GooglePlacesDetailsQuery={{
            rankby: "distance"
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details)
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          query={{
            key: apiKey,
            language: "en",
            components: "country:us",
            types: "",
            radius: 30000,
            location: `${region.latitude}, ${region.longitude}`
          }}
          styles={{
            container: { flex: 0, position: "absolute", width: "100%", zIndex: 1},
            listView: {backgroundColor: "white"}
          }}
        />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}}/>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          pinColor="orange"
        >
          <Callout>
            <Text>PUG</Text>
          </Callout>
        </Marker>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
})