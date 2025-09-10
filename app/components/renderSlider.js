import React from "react";
import { BlurView } from "expo-blur";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import IconAudio from "@/assets/images/tour-audio.svg";
import IconLeft from "@/assets/images/chevron_left.svg";
import IconRight from "@/assets/images/chevron_right.svg";
const renderSlide = ({ item, handlePrev, handleNext, slides }) => {
  return (
    <ImageBackground style={styles.container} source={item.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <BlurView style={styles.blurLayer} intensity={80}>
            <View style={styles.itemContainer}>
              <View style={[styles.iconBox]}>{item.icon}</View>
              <View style={styles.textBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
              </View>

              {/* Pagination buttons and dots */}
              <View style={styles.paginationBox}>
                <TouchableOpacity onPress={handlePrev}>
                  <View style={styles.paginationBtn}>
                    <IconLeft />
                  </View>
                </TouchableOpacity>

                {/* Dots */}
                <View style={styles.dotsRow}>
                  {slides.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        i === currentIndex && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>

                <TouchableOpacity onPress={handleNext}>
                  <View style={styles.paginationBtn}>
                    <IconRight />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>

        {/* Skip button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Text style={styles.skipBtn}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
    justifyContent: "flex-end",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFFCC",
    borderRadius: 100,
    color: "#925D3C",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  blurLayer: {
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
  },
  itemContainer: {
    backgroundColor: "#00000033",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox: {
    backgroundColor: "#FFFFFF0D",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  textBox: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    color: "#E9DFD8",
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20,
  },
  desc: {
    color: "#E9DFD8",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 400,
  },
  paginationBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  paginationBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 100,
    backgroundColor: "#FFFFFF26",
  },
  borderRotate: {
    borderColor: "#E9DFD8",
    borderStyle: "solid",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    transform: [{ rotate: "45deg" }],
  },
  iconReverse: {
    transform: [{ rotate: "-45deg" }],
  },
});

export default renderSlide;
