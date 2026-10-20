import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./local/en.json";
import ar from "./local/ar.json";

i18n
  .use(LanguageDetector)
  // languagedetector to detect the language from the localstorag 
  .use(initReactI18next)
  // to be like a bridge between react and i18n
  .init({
    
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      // translation take all the namespaces or all the translation file because we don't have translation namespaces 
    },
    supportedLngs: ["en", "ar"],
    // supported languages depend on the language code { en , ar }
    fallbackLng: "en",
    // if there is a problem in the arabic translation get english translation
    interpolation: { escapeValue: false },
    // i18n escape the values in the text so here we stop react from doing the escape
  });

const applyDirection = (lng: string) => {
  document.documentElement.lang = lng;
  // make the document language lng 
  document.documentElement.dir = i18n.dir(lng);
  // make the document direction lng 
};

applyDirection(i18n.resolvedLanguage ?? "en");
// run the function when the file run
i18n.on("languageChanged", applyDirection);
// languageChanged is event but changeLanguage is the function that make that
export default i18n;