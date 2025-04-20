import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { registerGlobalComponents } from '@/plugins/globalComponents';
const app = createApp(App);

app.use(createPinia());
app.use(router);

registerGlobalComponents(app);
app.mount('#app');
