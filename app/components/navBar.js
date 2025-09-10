import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import IconHomeLight from "@/assets/images/home-light.svg";
import IconAudioLight from "@/assets/images/audio-light.svg";
import IconPdfLight from "@/assets/images/pdf-light.svg";
import IconDiscountLight from "@/assets/images/discount-light.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
export default function NavBar() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;
  return (
    <View style={styles.navContainer}>
      <View style={styles.navBox}>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.touchBtn}
          >
            <IconHomeLight
              style={[styles.navIco, route.name === "Home" && styles.active]}
            />
            <Text
              style={[styles.navText, route.name === "Home" && styles.active]}
            >
              {t("home")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AudioCatalog")}
            style={styles.touchBtn}
          >
            <IconAudioLight
              style={[
                styles.navIco,
                current.startsWith("Audio") && styles.active,
              ]}
            />
            <Text
              style={[
                styles.navText,
                current.startsWith("Audio") && styles.active,
              ]}
            >
              {t("audio")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PDFCatalog")}
            style={styles.touchBtn}
          >
            <IconPdfLight
              style={[
                styles.navIco,
                current.startsWith("PDF") && styles.active,
              ]}
            />
            <Text
              style={[
                styles.navText,
                current.startsWith("PDF") && styles.active,
              ]}
            >
              {t("pdf")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Zakat")}
            style={styles.touchBtn}
          >
            <IconDiscountLight
              style={[styles.navIco, route.name === "Zakat" && styles.active]}
            />
            <Text
              style={[styles.navText, route.name === "Zakat" && styles.active]}
            >
              {t("zakat")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "column",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  navBox: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    borderRadius: 100,
    backgroundColor: "#925D3C",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  navIco: {
    opacity: 0.5,
  },
  navText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    textAlign: "center",
    opacity: 0.5,
  },
  active: {
    opacity: 1,
  },
  touchBtn: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
});
