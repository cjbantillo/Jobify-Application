import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePageView from '@/views/system/HomePageView.vue';
import AdminDashboardView from '@/views/system/AdminDashboardView.vue';
import JobsDashboardView from '@/views/system/JobsDashboardView.vue';
import TalentDashboardView from '@/views/system/TalentDashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  // Root path
      redirect: '/homepage'  // Redirect to login when accessing the root
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
    {
      path: '/homepage',  
      name: 'homepage',
      component: HomePageView
    }, 
  
  // admin vue 
    {
      path: '/dashboard-admin',  
      name: 'dashboardadmin',
      component: AdminDashboardView
    }, 

    // Job seeker vue
    {
      path: '/job-dashboard',  
      name: 'jobdashboard',
      component: JobsDashboardView
    }, 
    //talent vue
    {
      path: '/talent-dashboard',  
      name: 'talentdashboard',
      component: TalentDashboardView
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
