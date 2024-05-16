import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import ARCreation from './components/ARCreation.vue';
import MyLibrary from  './components/MyLibrary.vue';
import RegisterPage from './components/Register.vue';
import LoginPage from './components/Login.vue';

const routes = [
  {
    	path: '/',
    	component: Home
  },
  {
    	path: '/arcreation',
    	component: ARCreation,
    	props: true
  },
  {
    	path: '/mylibrary',
    	component: MyLibrary
  },
  {
	path: '/register',
	component: RegisterPage
  },
  {
	path: '/login',
	component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
