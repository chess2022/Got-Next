import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Constants from "expo-constants";
import RenderStarReview from "./ReviewStars"

const GOOGLE_API_KEY = Constants.manifest?.extra?.googleApiKey

class PlaceList extends Component {
    render() {
        const { places } = this.props;
        const baseImage = "../assets/basketball.jpeg"

        return (
          <View style={styles.container2}>
            <View>
              {places.length <= 0 && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" />
                </View>
              )}
              {places.length > 0 && (
                <FlatList
                  data={places}
                  renderItem={({ place }) => (
                    <TouchableOpacity>
                      <ListItem
                        key={place.placeId}
                        title={
                          <View style={styles.rowDirection}>
                            <Text>{place.placeName}</Text>
                            <Text>1.4km</Text>
                          </View>
                        }
                        subtitle={
                          place.rating && (
                            <View>
                              <View style={styles.starReviewsContainer}>
                                <RenderStarReview stars={place.rating} />
                                <Text>{place.rating.toFixed(1)}</Text>
                              </View>
                              <View>
                                <Text>{place.vicinity}</Text>
                              </View>
                            </View>
                          )
                        }
                        leftAvatar={{
                          rounded: false,
                          size: "large",
                          source: place.gallery && {
                            uri:
                              place.photos.length > 0
                                ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&sensor=false&maxheight=${item.photos[0].height}&maxwidth=${item.photos[0].width}&key=${GOOGLE_API_KEY}`
                                : baseImage,
                          },
                        }}
                        bottomDivider
                        chevron={{ color: "#e90000", size: 30 }}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={place => place.placeId.toString()}
                />
              )}
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
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

export default PlaceList;