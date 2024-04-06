import { createRouter } from 'vue-router';

// Import your components
// import TodoHome from './components/TodoHome.vue';
import Courses from './components/Courses.vue';
import Home from './components/Home.vue';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/courses',
      component: Courses
    }
  ]
})

export default router
