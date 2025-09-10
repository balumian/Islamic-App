import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import IconHomeLight from "@/assets/images/home-light.svg";
import IconAudioLight from "@/assets/images/audio-light.svg";
import IconPdfLight from "@/assets/images/pdf-light.svg";
import IconDiscountLight from "@/assets/images/discount-light.svg";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/app/components/ThemedText";
export default function FooterMenu() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={styles.navContainer}>
      <BlurView intensity={50} tint="light" style={styles.blurLayer}>
        <View style={styles.navBox}>
          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.touchBtn}
            >
              <IconHomeLight />
              <ThemedText style={styles.navText}>{t("home")}</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AudioCatalog")}
              style={styles.touchBtn}
            >
              <IconAudioLight />
              <ThemedText style={styles.navText}>{t("audio")}</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate("PDFCatalog")}
              style={styles.touchBtn}
            >
              <IconPdfLight />
              <ThemedText style={styles.navText}>{t("pdf")}</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.navItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Zakat")}
              style={styles.touchBtn}
            >
              <IconDiscountLight />
              <ThemedText style={styles.navText}>{t("zakat")}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "column",
    paddingHorizontal: 40,
  },
  blurLayer: {
    overflow: "hidden",
    borderRadius: 100,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
  },
  navBox: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    borderRadius: 100,
    backgroundColor: "#00000033",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    textAlign: "center",
  },
  touchBtn: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
});
