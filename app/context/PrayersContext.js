import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import moment from "moment";
import { useTranslation } from "react-i18next";

const PrayerContext = createContext();

export const PrayersProvider = ({ children }) => {
  const [timings, setTimings] = useState(null);
  const [parsedTimings, setParsedTimings] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hijriDate, setHijriDate] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission access required for prayer");
          return;
        }

        // ✅ 2. Get device coordinates
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest, // or .High for balance
        });
        const { latitude, longitude } = location.coords;

        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const json = await res.json();
        const timingsData = json.data.timings;

        const hijri = json.data.date.hijri;
        setHijriDate(hijri);

        const today = moment();
        const parsed = Object.entries(timingsData).reduce(
          (acc, [name, time]) => {
            const [hours, minutes] = time.split(":");
            acc[name] = moment(today).set({
              hour: +hours,
              minute: +minutes,
              second: 0,
            });
            return acc;
          },
          {}
        );

        setTimings(timingsData);
        setParsedTimings(parsed);
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (!parsedTimings) return;

    const interval = setInterval(() => {
      const now = moment();
      let upcoming = null;
      const validPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      for (const name of validPrayers) {
        const time = parsedTimings[name];
        if (time && time.isAfter(now)) {
          upcoming = { name, time };
          break;
        }
      }

      if (!upcoming) {
        const tomorrowFajr = moment(parsedTimings["Fajr"]).add(1, "day");
        upcoming = { name: "Fajr", time: tomorrowFajr };
      }

      setNextPrayer(upcoming.name);

      const duration = moment.duration(upcoming.time.diff(now));
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      setMinutes(`${hours} ${t("hours")} ${minutes} ${t("minutes")}`);
      setCountdown(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [parsedTimings]);

  // -------------------------
  // Context Value
  // -------------------------
  return (
    <PrayerContext.Provider
      value={{
        timings,
        nextPrayer,
        countdown,
        minutes,
        parsedTimings,
        hijriDate,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayersTime = () => useContext(PrayerContext);
