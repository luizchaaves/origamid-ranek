import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatPrice(value) {
    value = Number(value);
    if (!isNaN(value))
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    else return '';
  },
};

app.use(store).use(router).mount('#app');
