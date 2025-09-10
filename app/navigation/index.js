import React, { useState, useEffect } from "react";
import Home from "@/app/screens/home";
import AudioCatalog from "@/app/screens/audioCatalogs";
import Audio from "@/app/screens/audios";
import Zakat from "@/app/screens/Zakat";
import PDFCatalog from "@/app/screens/pdfCatalogs";
import AudioSubCat from "@/app/screens/audioSubCat";
import PDFSubCat from "@/app/screens/pdfSubCat";
import PDFList from "@/app/screens/pdfList";
import Tour from "@/app/screens/tours";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Prayers from "@/app/screens/prayers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PDFViewer from "@/app/screens/pdfViewer";
import Notification from "@/app/screens/notifications";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();
import * as Notifications from "expo-notifications";

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Tour");

  const [fontsLoaded] = useFonts({
    AlmaraiLight: require("@/assets/fonts/Almarai-Light.ttf"),
    AlmaraiRegular: require("@/assets/fonts/Almarai-Regular.ttf"),
    AlmaraiBold: require("@/assets/fonts/Almarai-Bold.ttf"),
    AlmaraiExtraBold: require("@/assets/fonts/Almarai-ExtraBold.ttf"),
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    const checkTourStatus = async () => {
      try {
        // await AsyncStorage.setItem("hasSeenTour", "false");
        const seen = await AsyncStorage.getItem("hasSeenTour");
        if (seen === "true") {
          setInitialRoute("Home");
        }
      } catch (e) {
        console.log("Error checking tour status:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkTourStatus();
  }, []);

  if (isLoading) return null; // or show a loading screen
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Tour" component={Tour} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AudioCatalog" component={AudioCatalog} />
        <Stack.Screen name="PDFCatalog" component={PDFCatalog} />
        <Stack.Screen name="Zakat" component={Zakat} />
        <Stack.Screen name="Audio" component={Audio} />
        <Stack.Screen name="AudioSubCat" component={AudioSubCat} />
        <Stack.Screen name="PDFSubCat" component={PDFSubCat} />
        <Stack.Screen name="PDFList" component={PDFList} />
        <Stack.Screen name="Prayers" component={Prayers} />
        <Stack.Screen name="PDFViewer" component={PDFViewer} />
        <Stack.Screen name="Notifications" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
