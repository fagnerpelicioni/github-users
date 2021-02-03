import Vue from 'vue';

// ServiceWorker
import './registerServiceWorker';

import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import router from './router';

import ptBR from './lang/pt_BR';
import enUS from './lang/en_US';

Vue.use(VueI18n);

// Browser language
const locale = window.navigator.userLanguage || window.navigator.language;

// Config for i18n
// the language is applied according to the browser language
const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en-US',
  messages: {
    'pt-BR': ptBR,
    'en-US': enUS,
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
