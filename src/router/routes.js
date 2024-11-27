import HomePageView from '@/views/system/HomePageView.vue'
import LoginView from '@/views/auth/Student/LoginStudentView.vue'
import RegisterView from '@/views/auth/Student/RegisterStudentView.vue'
import JobDashboardView from '@/views/system/JobsDashboardView.vue'
import EmployerDashboardView from '@/views/system/EmployerDashboardView.vue'


// 👉 Routes
export const routes = [
  // Auth Pages
  {
    path: '/',
    name: 'home',
    component: HomePageView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }, // Registration doesn't require authentication
  },

  // System Pages
  {
    path: '/jobdashboard',
    name: 'jobdashboard',
    component: JobDashboardView,
    meta: { requiresAuth: true, isDefault: true }, // Requires authentication to access
  },
  {
    path: '/employerdashboard',
    name: 'employerdashboard',
    component: EmployerDashboardView,
    meta: { requiresAuth: true, isDefault: true }, // Requires authentication to access
  },
]
