import React, { useEffect } from "react";
import FooterMenu from "@/app/components/home/footer";
import Hadith from "@/app/components/home/hadith";
import Live from "@/app/components/home/live";
import Prayer from "@/app/components/home/prayer";
import TopBar from "@/app/components/home/topBar";
import { registerForPushNotificationsAsync } from "@/app/hooks/useNotification";

import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from "react-native";
export default function Home({ navigation }) {
  registerForPushNotificationsAsync();

  return (
    <ImageBackground
      style={styles.container}
      source={require("@/assets/images/homebg.png")}
    >
      <SafeAreaView style={styles.safeArea}>
        <TopBar />
        <View style={styles.contentContainer}>
          <View style={styles.homeContainer}>
            <Live />
            <Pressable onPress={() => navigation.navigate("Prayers")}>
              <Prayer />
            </Pressable>
          </View>
          <Hadith />
        </View>
        <FooterMenu />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    gap: 20,
  },
  homeContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});
