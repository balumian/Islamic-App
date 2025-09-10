import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import moment from "moment";
import { AppState } from "react-native";
import { useTranslation } from "react-i18next";

const PrayerContext = createContext();

export const PrayerProvider = ({ children }) => {
  const { t } = useTranslation();

  const [location, setLocation] = useState(null);
  const [prayerData, setPrayerData] = useState([]);
  const [todayTimings, setTodayTimings] = useState(null);
  const [hijriDate, setHijriDate] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("00:00:00");
  const [minutesText, setMinutesText] = useState("");
  const [lastFetchDate, setLastFetchDate] = useState("");
  const countdownInterval = useRef(null);

  // 📍 Get user location
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
      setLocation(coords);
    } catch (e) {
      console.log("Location error:", e);
    }
  };

  // 🕌 Fetch prayer times
  const fetchPrayerTimes = async (lat, lng) => {
    const today = moment();
    const month = today.month() + 1;
    const year = today.year();

    const res = await fetch(
      `https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=2&month=${month}&year=${year}`
    );
    const json = await res.json();

    const start = today.date() - 1;
    const next7 = json.data.slice(start, start + 7);

    return next7.map((day) => ({
      date: day.date.gregorian.date, // usually "DD-MM-YYYY"
      hijri: day.date.hijri,
      timings: day.timings,
    }));
  };

  // 🔔 Schedule notifications
  const schedulePrayerNotifications = async (days) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const day of days) {
      const date = moment(day.date, "DD-MM-YYYY");

      for (const [name, time] of Object.entries(day.timings)) {
        if (!["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].includes(name))
          continue;

        const [hour, minute] = time.split(" ")[0].split(":");
        const trigger = moment(date).set({
          hour: +hour,
          minute: +minute,
          second: 0,
        });

        if (trigger.isAfter(moment())) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `${t("prayer_time")} - ${name}`,
              body: `${t("it's_time_for")} ${name}`,
            },
            trigger: {
              type: "date",
              date: trigger.toDate(),
            },
          });
        }
      }
    }
  };

  // 📅 Get today's prayer data
  const getTodayData = () => {
    const today = moment(); // ✅ keep as moment object, not string

    return prayerData.find((d) =>
      moment(d.date, "DD-MM-YYYY").isSame(today, "day")
    );
  };

  // 🕌 Find next prayer
  const determineNextPrayer = () => {
    const today = getTodayData();
    console.log(today);
    if (!today) return null;

    const now = moment();
    const validPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let upcoming = null;

    for (const name of validPrayers) {
      const [hour, minute] = today.timings[name].split(" ")[0].split(":");
      const time = moment().set({ hour: +hour, minute: +minute, second: 0 });

      if (time.isAfter(now)) {
        upcoming = { name, time };
        break;
      }
    }

    if (!upcoming) {
      // fallback → tomorrow's Fajr
      const [hour, minute] = today.timings["Fajr"].split(" ")[0].split(":");
      upcoming = {
        name: "Fajr",
        time: moment()
          .add(1, "day")
          .set({ hour: +hour, minute: +minute, second: 0 }),
      };
    }

    setNextPrayer(upcoming.name);
    return upcoming.time;
  };

  // ⏱ Countdown timer
  const startCountdown = (targetTime) => {
    if (!targetTime) return;

    if (countdownInterval.current) clearInterval(countdownInterval.current);

    countdownInterval.current = setInterval(() => {
      const now = moment();
      const duration = moment.duration(targetTime.diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(countdownInterval.current);
        setCountdown("00:00:00");
        setMinutesText("");
        return;
      }

      const h = String(duration.hours()).padStart(2, "0");
      const m = String(duration.minutes()).padStart(2, "0");
      const s = String(duration.seconds()).padStart(2, "0");

      setCountdown(`${h}:${m}:${s}`);
      setMinutesText(
        duration.hours() > 0
          ? `${duration.hours()} ${t("hours")} ${duration.minutes()} ${t(
              "minutes"
            )}`
          : `${duration.minutes()} ${t("minutes")}`
      );
    }, 1000);
  };

  // 🚀 Initialize app logic
  const initialize = async () => {
    if (!location) return;

    const today = moment().format("DD-MM-YYYY");
    if (lastFetchDate === today && prayerData.length > 0) return;

    try {
      const data = await fetchPrayerTimes(
        location.latitude,
        location.longitude
      );
      console.log(
        "Fetched prayerData:",
        data.map((d) => d.date)
      );
      setPrayerData(data);
      setLastFetchDate(today);

      const todayData = data.find((d) =>
        moment(d.date, "DD-MM-YYYY").isSame(moment(), "day")
      );
      if (!todayData) return;

      setTodayTimings(todayData.timings);
      setHijriDate(todayData.hijri);

      await schedulePrayerNotifications(data);

      const targetTime = determineNextPrayer();
      if (targetTime) startCountdown(targetTime);
    } catch (e) {
      console.log("Error fetching/scheduling prayers:", e);
    }
  };

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) initialize();
  }, [location]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        const today = moment().format("DD-MM-YYYY");
        if (today !== lastFetchDate) {
          initialize();
        } else {
          const targetTime = determineNextPrayer();
          if (targetTime) startCountdown(targetTime);
        }
      }
    });

    return () => sub.remove();
  }, [lastFetchDate, prayerData]);

  useEffect(() => {
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, []);

  // -------------------------
  // Context Value
  // -------------------------
  return (
    <PrayerContext.Provider
      value={{
        todayTimings,
        hijriDate,
        nextPrayer,
        countdown,
        minutesText,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayerTimes = () => useContext(PrayerContext);
