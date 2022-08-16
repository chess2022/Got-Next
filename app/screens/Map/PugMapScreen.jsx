import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image, 
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import ReviewStars from "../components/ReviewStars";

const apiKey = Constants.manifest?.extra?.googleApiKey;

export default function GetPugs(props) {
  const [location, setLocation] = React.useState({});
  const [newLatitude, setNewLatitude] = React.useState([]);
  const [newLongitude, setNewLongitude] = React.useState([]);
  const [error, setError] = React.useState();
  const [places, setPlaces] = React.useState([]);
  const [value, setValue] = React.useState("");
  const newSearch = value.replaceAll(", ", "+");
  // console.log(newSearch);
  const [region, setRegion] = React.useState();
  const INITIAL_REGION = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.2,
    longitudeDelta: 0.1,
  };

  const mapRef = React.useRef(null);

  // initial setting of mapped basketball courts based on user's current location
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
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
            // to construct the coordinate array
            const lat = googlePlace.geometry.location.lat;
            const lng = googlePlace.geometry.location.lng;
            const coordinate = {
              latitude: lat,
              longitude: lng,
            };
            // to construct the gallery array
            const gallery = [];
            const baseImage = require("../../assets/basketball.jpeg");

            if (googlePlace.photos) {
              for (let photo of googlePlace.photos) {
                let photoUrl =
                  googlePlace.photos.length > 0
                    ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${googlePlace.photos[0].photo_reference}&sensor=false&maxheight=${googlePlace.photos[0].height}&maxwidth=${googlePlace.photos[0].width}&key=${apiKey}`
                    : baseImage;

                gallery.push(photoUrl);
              }
            }
            // the data I want from the google results
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
    // when a location search is made in the searchbar, this new query is made to a different google api url
    React.useEffect(() => {
      (async () => {
        const keyword = `basketball+court+${newSearch}`;
        const url =
          "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
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
                const baseImage = require("../../assets/basketball.jpeg");

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
                place["address"] = googlePlace.formatted_address;

                places.push(place);
              }
              setPlaces(places);
              let newLatitude = places[0].coordinate.latitude;
              let newLongitude = places[0].coordinate.longitude;
              setNewLatitude(newLatitude);
              setNewLongitude(newLongitude);
              let region = {
                latitude: newLatitude,
                longitude: newLongitude,
                latitudeDelta: 0.25,
                longitudeDelta: 0.12,
              };
              setRegion(region);

            })
            .catch((error) => {
              console.log(error);
            });
        })();
      }, [newSearch]);


    React.useEffect(() => {
      if (region) {
        // console.log("change region, region: ", region);
        mapRef.current.animateToRegion(region);
      }
    }, [region])


  // console.log("places", places)
  // console.log("location", location.latitude);


  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <SearchBar
        platform="default"
        loadingProps={{}}
        onChangeText={(newVal) => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Enter city, state"
        onSubmitEditing={() => console.log(`user has entered ${value}`)}
        placeholderTextColor="#888"
        // cancelButtonTitle="Cancel"
        // cancelButtonProps={{}}
        // onCancel={() => console.log(onCancel())}
        value={value}
      />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation="true"
        initialRegion={INITIAL_REGION}
        ref={mapRef}
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
                    <ReviewStars
                      ratings={place.rating}
                    />
                    <Text>
                      {place.vicinity ? place.vicinity : place.address}
                    </Text>
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
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});
