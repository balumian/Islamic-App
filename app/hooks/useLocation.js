import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    try {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Try getting the last known position first
      let loc = await Location.getLastKnownPositionAsync();

      // If no last known position, get current position
      if (!loc) {
        loc = await Location.getCurrentPositionAsync({});
      }

      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return location;
};

export default useLocation;
