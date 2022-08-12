// // https://maps.googleapis.com/maps/api/place/textsearch/json?query=[yourquerystring]&key=[YOURAPIKEY]
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=YOURAPIKEY
// find detail on each result
// https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKSp50NI0K4gR6C6L3yYqpYY&fields=name&key=YOURKEY

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as Location from "expo-location";

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

    const [location, setLocation] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
       const locate = await Location.getCurrentPositionAsync({});
         setLocation(locate.coords);
      })();
    }, []);

    return (
      <View style={{ marginTop: 50, flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          query={{
            key: apiKey,
            keyword: "basketball court",
            radius: 16000,
            components: "country:us",
            location: `${region.latitude}, ${region.longitude}`,
          }}
          // requestUrl={{
          //   useOnPlatform: "all",
          //   url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?",
          // }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "100%",
              zIndex: 1,
            },
            listView: { backgroundColor: "white" },
          }}
        />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation="true"
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          <Marker coordinate={location} pinColor="red">
            <Callout>
              <Text>You are here</Text>
            </Callout>
          </Marker>
        </MapView>
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