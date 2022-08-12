// https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+toronto+canada&key=YOURAPIKEY
// find detail on each result
// https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKSp50NI0K4gR6C6L3yYqpYY&fields=name&key=YOURKEY

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";

const apiKey = Constants.manifest?.extra?.googleApiKey;


export default function GetPubs() {

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

    let radMeter = 2 * 1000; // Search withing 2 KM radius
    const keyword = `&keyword=basketball+court`;

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius='+radMeter+keyword+'&key='+apiKey

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {

      const places = [] // This Array will contain locations received from google
        for(let googlePlace of res.results) {
          const place = {}
          const lat = googlePlace.geometry.location.lat;
          const lng = googlePlace.geometry.location.lng;
          const coordinate = {
            latitude: lat,
            longitude: lng,
          }

          const gallery = []
          const baseImage = "../assets/basketball.jpeg";

          if (googlePlace.photos) {
           for(let photo of googlePlace.photos) {
             var photoUrl = item.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&sensor=false&maxheight=${item.photos[0].height}&maxwidth=${item.photos[0].width}&key=${GOOGLE_API_KEY}` : baseImage

             gallery.push(photoUrl);
          }
        }

          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name
          place['gallery'] = gallery

          places.push(place);
          console.log(places)
        }
        console.log(res);

        // Do your work here with places Array
      })
      .catch(error => {
        console.log(error);
      });
    

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
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
        {/* {places.map(({ coordinate }) => (
          <Marker coordinate={coordinate} pinColor="red">
          </Marker>
        ))} */}
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
