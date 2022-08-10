
import { PermissionsAndroid } from "react-native";

import Geolocation from "react-native-geolocation-service";

export function useGoogleAndroid() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  async function getPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }
  useEffect(() => {
    getPermission().then(() => {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 15000 }
      );
    });
  }, []);
}
