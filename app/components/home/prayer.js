import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import moment from "moment";
import { usePrayersTime } from "@/app/context/PrayersContext";

const PRAYER_NAMES_AR = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

function convertToArabicNumbers(num) {
  return num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

export default function Prayer() {
  const { nextPrayer, parsedTimings, countdown, hijriDate } = usePrayersTime();

  const todayGregorian = moment().format("DD MMMM YYYY"); // e.g., "24 November 2025"

  const hijriFormatted = hijriDate
    ? `${convertToArabicNumbers(hijriDate.day)} ${
        hijriDate.month.ar
      } هجري ${convertToArabicNumbers(hijriDate.year)}`
    : "";

  const nextPrayerTime =
    parsedTimings?.[nextPrayer]?.format("hh:mm A") || "--:--";

  return (
    <View style={styles.prayerContainer}>
      <BlurView style={styles.blurLayer} tint="light" intensity={80}>
        <View style={styles.prayerBox}>
          <View style={styles.dateBox}>
            <Text style={styles.title}>{todayGregorian}</Text>
            <Text style={styles.slash}></Text>
            <Text style={styles.title}>{hijriFormatted || "..."}</Text>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{nextPrayerTime}</Text>
              <Text style={styles.countText}>{countdown || "--:--"}</Text>
            </View>

            <View style={styles.nameBox}>
              <Text style={styles.prayerName}>
                {PRAYER_NAMES_AR[nextPrayer] || "—"}
              </Text>
              <Text style={styles.prayerName}>
                {nextPrayer || "Loading..."}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  prayerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  blurLayer: {
    overflow: "hidden",
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    width: "100%",
  },
  prayerBox: {
    backgroundColor: "#00000033",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  slash: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    height: 1,
    width: 20,
  },
  timeContainer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  timeBox: {
    backgroundColor: "#FFFFFF1A",
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  timeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.7,
  },
  nameBox: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  prayerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
