import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  I18nManager,
  Alert,
} from "react-native";
import IconLanguage from "@/assets/images/language.svg";
import IconNotifications from "@/assets/images/notifications.svg";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import RNRestart from "react-native-restart";
import { ThemedText } from "@/app/components/ThemedText";
export default function TopBar() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const nextLang = currentLang === "en" ? "dv" : "en";
    const isRTL = nextLang === "dv";
    i18n.changeLanguage(nextLang).then(() => {
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
        RNRestart.Restart();
      }
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <ThemedText style={styles.title}>SalafiMV</ThemedText>
      </View>
      <View style={styles.box}>
        {/* <Image
          style={styles.iconLanguage}
          source={require("@/assets/images/language.png")}
        /> */}
        <IconLanguage onPress={toggleLanguage} />
        {/* <Image
          style={styles.iconNoti}
          source={require("@/assets/images/notifications.png")}
        /> */}
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <IconNotifications />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 900,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
  },
  iconLanguage: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  iconNoti: {
    width: 17,
    height: 20,
    tintColor: "#fff",
  },
});
