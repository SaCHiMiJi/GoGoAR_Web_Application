import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import ARCreation from './components/ARCreation.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/arcreation',
    component: ARCreation
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
