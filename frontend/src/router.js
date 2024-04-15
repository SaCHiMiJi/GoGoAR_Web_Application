import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import ARCreation from './components/ARCreation.vue';
import ARContent from './components/ARContent.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/arcreation',
    component: ARCreation
  },
  {
    path: '/arcontent',
    component: ARContent
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
