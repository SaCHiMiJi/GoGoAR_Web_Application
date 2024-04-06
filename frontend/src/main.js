import { createApp } from 'vue'; // Import createApp from Vue 3
import { createRouter, createWebHistory } from 'vue-router'; // Import createRouter and createWebHistory from Vue Router
import { BootstrapVue } from 'bootstrap-vue'; // Import BootstrapVue from BootstrapVue
import axios from 'axios'; // Import axios

import App from './App.vue';
import router from './router';

const http = axios.create({
  baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/todos',
});

const app = createApp(App); // Create a Vue app instance

app.config.globalProperties.$http = http; // Attach axios instance to the app instance

app.use(router); // Use Vue Router
app.use(BootstrapVue); // Use BootstrapVue

app.mount('#app'); // Mount the app to the DOM element with id 'app'