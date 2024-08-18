import './assets/main.styl';
import 'fomantic-ui-css/semantic.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import FomanticUI from 'vue-fomantic-ui';
import { createI18n } from 'vue-i18n';
import router from './router';
import messages from './i18n/';

const app = createApp(App);
const i18n = createI18n({
  locale: 'zhcn',
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  legacy: false,
});

app.use(router);
app.use(FomanticUI).use(i18n);

app.mount('#app');

app.config.globalProperties.$t = i18n.global.t;
