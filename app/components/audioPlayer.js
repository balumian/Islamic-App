import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import IconPlay from "@/assets/images/ico-play.svg";
export default function AudioPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/assets/images/static/surah.mp3"), // Replace with your local file
        { shouldPlay: false }
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(updateStatus);
    } catch (e) {
      console.log("Error loading sound:", e);
    }
  };

  const updateStatus = (status) => {
    if (!status.isLoaded) return;
    if (status.didJustFinish) {
      sound.setPositionAsync(0); // reset to beginning
      setIsPlaying(false);
    } else {
      setIsPlaying(status.isPlaying);
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (
      status.didJustFinish ||
      status.positionMillis === status.durationMillis
    ) {
      await sound.setPositionAsync(0);
      setPosition(0);
    }
    if (status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const onSeek = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const formatTime = (millis) => {
    const totalSec = Math.floor(millis / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayPause} style={styles.icoBtn}>
        <IconPlay />
      </TouchableOpacity>
      <Slider
        style={styles.player}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={onSeek}
        minimumTrackTintColor="#925D3C"
        maximumTrackTintColor="#925D3C4D"
        thumbTintColor="#925D3C"
      />

      <View style={styles.timeContainer}>
        <Text>{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  icoBtn: {
    marginTop: 10,
  },
  player: {
    width: "100%",
    marginVertical: 10,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
