// import 'dotenv/config';
import { createApp } from 'vue'; // Import createApp from Vue 3
import axios from 'axios';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import './index.css';

const http = axios.create({
  baseURL: import.meta.env.BACKEND_URL || 'http://localhost/todos',
});

const app = createApp(App); // Create a Vue app instance
const eventBus = mitt;

app.config.globalProperties.$http = http; // Attach axios instance to the app instance

app.provide('eventBus', eventBus);
app.use(router);

app.mount('#app'); // Mount the app to the DOM element with id 'app'