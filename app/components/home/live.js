import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";
export default function Live() {
  return (
    <View style={styles.liveContainer}>
      <BlurView style={styles.blurLayer} intensity={80} tint="light">
        <View style={styles.liveBox}>
          <Image
            style={styles.speakerImg}
            source={require("@/assets/images/static/speaker1.png")}
          />
          <View style={styles.textBox}>
            <Text style={styles.title}>Shaykh . Abu Zaid Zameer</Text>
            <Text style={styles.subTitle}>Question & Answer Session.</Text>
            <Text style={styles.span}>Lecture 3</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>LIVE</Text>
            <Text style={styles.indicator}></Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  liveContainer: {},
  blurLayer: {
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
  },
  liveBox: {
    flexDirection: "row",
    backgroundColor: "#00000033",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  speakerImg: {
    width: 64,
    height: 64,
    flexShrink: 0,
  },
  textBox: {
    justifyContent: "center",
    paddingLeft: 14,
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
  },
  subTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 400,
  },
  span: {
    color: "#fff",
    fontSize: 10,
    fontWeight: 400,
    opacity: 0.5,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 0,
    backgroundColor: "#FFFFFF80",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  badgeText: {
    color: "#925D3C",
    fontSize: 10,
    fontWeight: 700,
    paddingEnd: 10,
  },
  indicator: {
    width: 6,
    height: 6,
    backgroundColor: "#FF0000",
    borderRadius: 3,
    position: "absolute",
    top: 5,
    right: 4,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
