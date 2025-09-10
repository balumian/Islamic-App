// i18n/languageDetector.js
import * as Localization from "expo-localization";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    const locale = Localization.locale || "en";
    callback(locale.split("-")[0]); // 'en-US' -> 'en'
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

export default languageDetector;
