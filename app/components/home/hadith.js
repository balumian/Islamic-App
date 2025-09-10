import * as React from "react";

import { View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";

export default function Hadith() {
  return (
    <View style={styles.hadithContainer}>
      <BlurView style={styles.blurLayer} intensity={80}>
        <View style={styles.hadithBox}>
          <View style={styles.titleBox}>
            <Text style={styles.slash}></Text>
            <Text style={styles.title}>Hadith of the day</Text>
            <Text style={styles.slash}></Text>
          </View>
          <View>
            <Text style={styles.HadithTextAr}>
              باب الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ
            </Text>
            <Text style={styles.HadithTextEn}>
              A Muslim is the one who avoids harming Muslims with his tongue and
              hands
            </Text>
          </View>
          <View style={styles.reffBox}>
            <Text style={styles.ReffTextEn}>Bukhari & Muslim</Text>
            <Text style={styles.ReffTextAr}>صحيح البخاري 10</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  hadithContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  blurLayer: {
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
  hadithBox: {
    backgroundColor: "#00000033",
    padding: 30,
  },
  titleBox: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 800,
    textTransform: "uppercase",
  },
  slash: {
    color: "#fff",
    marginHorizontal: 10,
    backgroundColor: "#fff",
    width: "10%",
    height: 1,
    alignSelf: "center",
  },

  HadithTextAr: {
    textAlign: "right",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
  },
  HadithTextEn: {
    paddingVertical: 16,
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
    textAlign: "left",
  },
  reffBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  ReffTextEn: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    opacity: 0.5,
  },
  ReffTextAr: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    opacity: 0.5,
  },
});
