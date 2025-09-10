import * as React from "react";
import { View, StyleSheet, Text, Button, Slider } from "react-native";
import IconAudio from "@/assets/images/ico-aud.svg";
import AudioPlayer from "@/app/components/audioPlayer";
const AudioItem = ({ playarea }) => {
  return (
    <View style={styles.audioContainer}>
      <View style={styles.titleBar}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Lectures</Text>
        </View>
        <View style={styles.iconBox}>
          <IconAudio />
        </View>
      </View>
      {playarea && <AudioPlayer />}
    </View>
  );
};
const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF33",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderColor: "#925D3C80",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.15);",
  },
  titleBar: {
    flexDirection: "row",
  },
  titleBox: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#643F29",
    fontSize: 12,
    fontWeight: 700,
  },
});

export default AudioItem;
