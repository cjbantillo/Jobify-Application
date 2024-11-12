import { createRouter, createWebHistory } from 'vue-router'
import EmployerLoginView from '@/views/auth/Employeer/LoginView.vue'
import StudentLoginView from '@/views/auth/Student/LoginView.vue'
import EmployerRegisterView from '@/views/auth/Employeer/RegisterView.vue'
import StudentRegisterView from '@/views/auth/Student/RegisterView.vue'
import HomePageView from '@/views/system/HomePageView.vue'
import AdminDashboardView from '@/views/system/AdminDashboardView.vue'
import JobsDashboardView from '@/views/system/JobsDashboardView.vue'
import TalentDashboardView from '@/views/system/TalentDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Root path
      redirect: '/homepage', // Redirect to login when accessing the root
    },
    {
      path: '/employerlogin',
      name: 'EmployerLogin',
      component: EmployerLoginView,
    },
    {
      path: '/studentlogin',
      name: 'StudentLogin',
      component: StudentLoginView,
    },
    {
      path: '/employerregister',
      name: 'EmployerRegister',
      component: EmployerRegisterView,
    },
    {
      path: '/studentregister',
      name: 'StudentRegister',
      component: StudentRegisterView,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: HomePageView,
    },

    // admin vue
    {
      path: '/dashboard-admin',
      name: 'dashboardadmin',
      component: AdminDashboardView,
    },

    // Job seeker vue
    {
      path: '/job-dashboard',
      name: 'jobdashboard',
      component: JobsDashboardView,
    },
    //talent vue
    {
      path: '/talent-dashboard',
      name: 'talentdashboard',
      component: TalentDashboardView,
    },
  ],
  // Move scrollBehavior outside of routes
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // Retain position when using browser's back/forward buttons
    } else {
      return { top: 0 } // Scroll to the top on navigation or refresh
    }
  },
})

export default router
