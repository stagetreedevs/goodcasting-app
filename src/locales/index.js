import {NativeModules, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import pt_br from './translations/pt_BR.json';
import en_us from './translations/en_US.json';
import es_es from './translations/es_ES.json';

const resources = {
  ['en']: en_us,
  ['pt']: pt_br,
  ['es']: es_es,
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    let phoneLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    phoneLanguage = phoneLanguage.replace('_', '-');

    if (phoneLanguage.startsWith('pt')) {
      return callback('pt');
    } else if (phoneLanguage.startsWith('es')) {
      return callback('es');
    } else {
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
