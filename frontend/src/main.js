import { createApp } from 'vue'; // Import createApp from Vue 3
import axios from 'axios';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';

import './index.css';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import '../node_modules/flowbite-vue/dist/index.css'

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://backend-gogo.tlic.cmu.ac.th/assignment',
  headers: {
    'Connection': 'keep-alive',
  }
});

const emitter = mitt();
const app = createApp(App); // Create a Vue app instance

app.config.globalProperties.$http = http; // Attach axios instance to the app instance
app.config.globalProperties.emitter = emitter;

app.use(router);

// toastification configs
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
});

app.mount('#app'); // Mount the app to the DOM element with id 'app'
