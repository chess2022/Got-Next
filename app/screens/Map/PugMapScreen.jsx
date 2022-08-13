// https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=YOURAPIKEY
// find detail on each result
// https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKSp50NI0K4gR6C6L3yYqpYY&fields=name&key=YOURKEY

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";

const apiKey = Constants.manifest?.extra?.googleApiKey;


export default function GetPugs() {

    const [location, setLocation] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [places, setPlaces] = React.useState(null);

    React.useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setError("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({}) 
        // let backPerm = await Location.requestBackgroundPermissionsAsync();
        const latitude =  location.coords.latitude;
        const longitude = location.coords.longitude;
        setLocation(location.coords);

        const radMeter = 2000; //radius in meters
        const keyword = `&keyword=basketball+court`;

        const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        latitude +
        "," +
        longitude +
        "&radius=" +
        radMeter +
        keyword +
        "&key=" +
        apiKey;

        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            const places = []; // This Array will contain locations received from google
            for (let googlePlace of res.results) {
            const place = {};
            const lat = googlePlace.geometry.location.lat;
            const lng = googlePlace.geometry.location.lng;
            const coordinate = {
                latitude: lat,
                longitude: lng,
            };

            const gallery = [];
            const baseImage = "../assets/basketball.jpeg";

            if (googlePlace.photos) {
                for (let photo of googlePlace.photos) {
                let photoUrl =
                    googlePlace.photos.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${googlePlace.photos[0].photo_reference}&sensor=false&maxheight=${googlePlace.photos[0].height}&maxwidth=${googlePlace.photos[0].width}&key=${apiKey}`
                    : baseImage;

                gallery.push(photoUrl);
                }
            }

            place["coordinate"] = coordinate;
            place["placeId"] = googlePlace.place_id;
            place["placeName"] = googlePlace.name;
            place["gallery"] = gallery;

            places.push(place);
            setPlaces(places)
            console.log(places);
            }
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });


        })();
    }, []);
        

    return (
      <View style={{ marginTop: 50, flex: 1 }}>
        {/* <Text>{text}</Text> */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation="true"
          region={{
            latitude: 45.5152,
            longitude: -122.6784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {places.map(({ coordinate }) => (
            <Marker coordinate={coordinate} pinColor="red"></Marker>
          ))}
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
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    });
