import React, { useState, useEffect, useRef } from "react";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconAudio from "@/assets/images/tour-audio.svg";
import IconLeft from "@/assets/images/chevron_left.svg";
import IconRight from "@/assets/images/chevron_right.svg";
import IconPdf from "@/assets/images/icon-pdf.svg";
import IconPlus from "@/assets/images/icon-plus.svg";
import { useNavigation } from "@react-navigation/native";
const slides = [
  {
    key: 0,
    title: "Audio Files",
    desc: "Listen to all your audio files with our built in audio file player.",
    background: require("@/assets/images/tourbg1.png"),
    icon: IconAudio,
  },
  {
    key: 1,
    title: "PDF Files",
    desc: "Read all your PDF files with our built in PDF Viewer.",
    background: require("@/assets/images/tourbg2.png"),
    icon: IconPdf,
  },
  {
    key: 2,
    title: "More Features",
    desc: "Zakat Calculator",
    background: require("@/assets/images/tourbg3.png"),
    icon: IconPlus,
  },
];
export default function Tours() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const navigation = useNavigation();
  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const completeTour = async () => {
    await AsyncStorage.setItem("hasSeenTour", "true");
    navigation.replace("Home");
  };
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeTour(); // go to Home at end
    }
  };

  const handleSkip = () => {
    // navigation.replace("Zakat");
    completeTour();
  };

  useEffect(() => {
    // Reset values instantly
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSlide]);
  const slide = slides[currentSlide];
  return (
    <ImageBackground style={styles.container} source={slide.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <BlurView style={styles.blurLayer} intensity={80}>
            {/* Slide 1 */}
            <View style={styles.itemContainer}>
              {/* Icon */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <View style={[styles.iconBox, styles.borderRotate]}>
                  {/* <IconAudio style={styles.iconReverse} /> */}
                  <slide.icon style={styles.iconReverse} />
                </View>
              </Animated.View>
              {/* Text */}
              <Animated.View
                style={[
                  styles.textBox,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.desc}>{slide.desc}</Text>
              </Animated.View>

              <View style={styles.paginationBox}>
                <TouchableOpacity
                  onPress={prevSlide}
                  disabled={slide.key === 0 ? true : false}
                >
                  <View
                    style={[
                      styles.paginationBtn,
                      styles.borderRotate,
                      slide.key === 0 && styles.disable,
                    ]}
                  >
                    <IconLeft style={styles.iconReverse} />
                  </View>
                </TouchableOpacity>
                {/* Dots */}
                <View style={styles.dotsRow}>
                  {slides.map((_, i) => (
                    <View
                      key={i}
                      style={[styles.dot, i === slide.key && styles.activeDot]}
                    />
                  ))}
                </View>
                <TouchableOpacity onPress={nextSlide}>
                  <View style={[styles.paginationBtn, styles.borderRotate]}>
                    <IconRight style={styles.iconReverse} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {/* End */}
          </BlurView>
        </View>
        {/* <FooterMenu /> */}
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipBtn}>Skip</Text>
          </TouchableOpacity>
        </View>
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
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: "#fff",
    opacity: 1,
  },
  disable: {
    opacity: 0.5,
  },
});
