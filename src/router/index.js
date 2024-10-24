import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  // Root path
      redirect: '/login'  // Redirect to login when accessing the root
    },
    {
      path: '/login',  
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',  
      name: 'register',
      component: RegisterView
    }, 
  ],
  // Move scrollBehavior outside of routes
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // Retain position when using browser's back/forward buttons
    } else {
      return { top: 0 }; // Scroll to the top on navigation or refresh
    }
  }
})

export default router
