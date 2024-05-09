import { createApp } from 'vue'; // Import createApp from Vue 3
import axios from 'axios';
import App from './App.vue';
import router from './router';
import './index.css';

const http = axios.create({
	baseURL: import.meta.env.BACKEND_URL || 'http://127.0.0.1:3000/assignment',
	headers: {
		'Connection': 'keep-alive'
	}
});

const app = createApp(App); // Create a Vue app instance

app.config.globalProperties.$http = http; // Attach axios instance to the app instance

app.use(router);

app.mount('#app'); // Mount the app to the DOM element with id 'app'
