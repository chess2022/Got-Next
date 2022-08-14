import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";

const apiKey = Constants.manifest?.extra?.googleApiKey;

export default function GetPugs(props) {
  const [location, setLocation] = React.useState({});
  const [error, setError] = React.useState();
  const [places, setPlaces] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  // url for text search
  // url: "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20Sydney&key=YOUR_API_KEY",

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // let backPerm = await Location.requestBackgroundPermissionsAsync();
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const radMeter = 10000; //radius in meters
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
            place["rating"] = googlePlace.rating;
            place["vicinity"] = googlePlace.vicinity;

            places.push(place);
          }

        setLocation(location.coords);
        setPlaces(places);

        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  // console.log("places", typeof(places))
  // console.log("location", location.latitude);
  
  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation="true"
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        }}
      >
        {places && places.length
          ? places.map((place) => {
              return (
                <Marker
                  coordinate={place.coordinate}
                  key={place.placeId}
                  pinColor="red"
                >
                  <Image
                    source={require("../../assets/icons/basketball-marker.png")}
                    style={{
                      height: Dimensions.get("window").width * 0.1,
                      width: Dimensions.get("window").width * 0.1,
                    }}
                  />
                  <Callout
                    style={{ width: Dimensions.get("window").width * 0.3 }}
                  >
                    <Text>{place.placeName}</Text>
                  </Callout>
                </Marker>
              );
            })
          : null}
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
  container1: {
    flex: 1,
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#575757",
    marginLeft: 20,
    marginTop: 10,
  },
  mapView: {
    flex: 1,
    justifyContent: "center",
  },
  restaurantList: {
    flex: 1,
    justifyContent: "center",
  },
  chevron: {
    color: "#e90000",
  },
  rowDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starReviewsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
