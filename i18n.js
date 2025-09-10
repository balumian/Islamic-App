import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "@/app/components/languageDetector";
import { I18nManager } from "react-native";

// Import translations
import en from "./locales/en.json";
import dv from "./locales/dv.json";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      dv: { translation: dv },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Optional: Force RTL for Dhivehi
i18n.on("languageChanged", (lng) => {
  if (lng === "dv") {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
});

export default i18n;
