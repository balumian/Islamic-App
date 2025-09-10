import React from "react";
import TitleBar from "@/app/components/titleBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import NavBar from "@/app/components/navBar";
import { useTranslation } from "react-i18next";
import { usePrayersTime } from "@/app/context/PrayersContext";
import { ThemedText } from "@/app/components/ThemedText";
import { getOrdinal, convertToArabicNumbers } from "@/app/utils/helpers";
export default function Prayers() {
  const { t } = useTranslation();
  const { timings, nextPrayer, minutes, hijriDate, parsedTimings } =
    usePrayersTime();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TitleBar title={t("prayer")} />
        <View style={styles.contentContainer}>
          {timings ? (
            <>
              <View style={styles.dateBox}>
                <ThemedText type="bold" style={styles.dateText}>{`${
                  hijriDate.day
                }${getOrdinal(hijriDate.day)} ${hijriDate.month.en}, ${
                  hijriDate.year
                }h`}</ThemedText>
                <ThemedText
                  type="bold"
                  style={styles.dateText}
                >{`${convertToArabicNumbers(hijriDate.day)} ${
                  hijriDate.month.ar
                } هجري ${convertToArabicNumbers(hijriDate.year)}`}</ThemedText>
              </View>
              <View style={styles.prayerContainer}>
                <View style={styles.itemContainer}>
                  <View style={styles.headingBox}>
                    <ThemedText
                      type="bold"
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("salah")}
                    </ThemedText>
                    <ThemedText type="bold" style={styles.headingText}>
                      {t("time")}
                    </ThemedText>
                  </View>
                  {/* Prayers */}
                  <View
                    style={[
                      styles.prayerItem,
                      nextPrayer === "Fajr" && styles.itemActive,
                    ]}
                  >
                    <ThemedText
                      type={nextPrayer === "Fajr" && "bold"}
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("fajr")}
                    </ThemedText>
                    <ThemedText
                      type={nextPrayer === "Fajr" && "bold"}
                      style={styles.prayerText}
                    >
                      {parsedTimings?.Fajr.format("hh:mm A") || "--:--"}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.prayerItem,
                      nextPrayer === "Dhuhr" && styles.itemActive,
                    ]}
                  >
                    <ThemedText
                      type={nextPrayer === "Dhuhr" && "bold"}
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("dhuhr")}
                    </ThemedText>
                    <ThemedText
                      type={nextPrayer === "Dhuhr" && "bold"}
                      style={styles.prayerText}
                    >
                      {parsedTimings?.Dhuhr.format("hh:mm A") || "--:--"}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.prayerItem,
                      nextPrayer === "Asr" && styles.itemActive,
                    ]}
                  >
                    <ThemedText
                      type={nextPrayer === "Asr" && "bold"}
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("asr")}
                    </ThemedText>
                    <ThemedText
                      type={nextPrayer === "Asr" && "bold"}
                      style={styles.prayerText}
                    >
                      {parsedTimings?.Asr.format("hh:mm A") || "--:--"}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.prayerItem,
                      nextPrayer === "Maghrib" && styles.itemActive,
                    ]}
                  >
                    <ThemedText
                      type={nextPrayer === "Maghrib" && "bold"}
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("maghrib")}
                    </ThemedText>
                    <ThemedText
                      type={nextPrayer === "Maghrib" && "bold"}
                      style={styles.prayerText}
                    >
                      {parsedTimings?.Maghrib.format("hh:mm A") || "--:--"}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.prayerItem,
                      nextPrayer === "Isha" && styles.itemActive,
                    ]}
                  >
                    <ThemedText
                      type={nextPrayer === "Isha" && "bold"}
                      style={[styles.prayerText, styles.prayerName]}
                    >
                      {t("isha")}
                    </ThemedText>
                    <ThemedText
                      type={nextPrayer === "Isha" && "bold"}
                      style={styles.prayerText}
                    >
                      {parsedTimings?.Isha.format("hh:mm A") || "--:--"}
                    </ThemedText>
                  </View>

                  {/* End Prayers */}
                </View>
                <View style={styles.timeBox}>
                  <ThemedText
                    type="bold"
                    style={[styles.timeText, styles.timeTextUpp]}
                  >
                    {t("next prayer")}
                  </ThemedText>
                  <ThemedText type="bold" style={styles.timeText}>
                    {minutes}
                  </ThemedText>
                </View>
              </View>
            </>
          ) : (
            <ActivityIndicator size="large" color="#925D3C" />
          )}
        </View>
        <NavBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9DFD8",
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 20,
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontWeight: 700,
    color: "#583824",
  },
  prayerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "column",
    backgroundColor: "#FFFFFF33",
    borderRadius: 10,
    borderColor: "#925D3C80",
    borderStyle: "solid",
    borderWidth: 1,
    height: 350,
    justifyContent: "space-between",
  },
  headingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headingText: {
    color: "#925D3C",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  prayerItem: {
    borderColor: "#925D3C",
    borderStyle: "solid",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "10",
    opacity: 0.5,
  },
  prayerText: {
    color: "#925D3C",
    fontSize: 12,
    textTransform: "uppercase",
  },
  timeBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  timeText: {
    fontSize: 12,
    color: "#925D3C",
  },
  timeTextUpp: {
    textTransform: "uppercase",
    flex: 1,
  },
  itemActive: {
    fontSize: 16,
    fontWeight: 700,
    opacity: 1,
  },
  prayerName: {
    flex: 1,
  },
  itemContainer: {
    gap: 10,
  },
});
