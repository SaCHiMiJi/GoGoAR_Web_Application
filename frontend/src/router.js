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
    	props: true,
	meta: {
		requiresAuth: true
	}
  },
  {
    	path: '/mylibrary',
    	component: MyLibrary,
	meta: {
		requiresAuth: true
        }
  },
  {
	path: '/signup',
	component: RegisterPage
  },
  {
	path: '/signin',
	component: LoginPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
  	if (localStorage.getItem('userInfo') === null) {
    		router.push({ path: '/signin'});
	}
  } else {
    next()
  }
})

export default router;
