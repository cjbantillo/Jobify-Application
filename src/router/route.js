import { createRouter, createWebHistory } from 'vue-router'
import EmployerLoginView from '@/views/auth/Employeer/LoginEmployerView.vue'
import StudentLoginView from '@/views/auth/Student/LoginStudentView.vue'
import EmployerRegisterView from '@/views/auth/Employeer/RegisterEmployerView.vue'
import StudentRegisterView from '@/views/auth/Student/RegisterStudentView.vue'
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
      name: 'Employer Login',
      component: EmployerLoginView,
    },
    {
      path: '/studentlogin',
      name: 'Student Login',
      component: StudentLoginView,
    },
    {
      path: '/employerregister',
      name: 'Employer Register',
      component: EmployerRegisterView,
    },
    {
      path: '/studentregister',
      name: 'Student Register',
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
      name: 'dashboard admin',
      component: AdminDashboardView,
    },

    // Job seeker vue
    {
      path: '/job-dashboard',
      name: 'job dashboard',
      component: JobsDashboardView,
    },
    //talent vue
    {
      path: '/talent-dashboard',
      name: 'talent dashboard',
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