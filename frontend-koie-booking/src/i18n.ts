import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';
import enJson from './locales/en.json';

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
  // Testing currently only supports manually importing of json-files. English is the only language that gets loaded now
  let locales: any;
  const messages: LocaleMessages = {};
  if (process.env.NODE_ENV === 'test') {
    messages['en'] = enJson;
  } else {
    locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    locales.keys().forEach((key: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
  }
  return messages;
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
});
