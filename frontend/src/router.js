import { createRouter, createWebHistory } from 'vue-router';
// import 'dotenv/config';

// Import your components
import Courses from './components/Courses.vue';
import Home from './components/Home.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/courses',
    component: Courses
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
