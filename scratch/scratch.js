// const initMap = React.createClass ({
//   getInitialState() {
//     return {
//       region: {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         latitudeDelta: 0.2,
//         longitudeDelta: 0.1
//       }
//     }
//   }
// });

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
        region={(region) => setRegion(region)} ></MapView>