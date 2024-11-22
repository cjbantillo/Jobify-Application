import HomePageView from '@/views/system/HomePageView.vue'
import LoginView from '@/views/auth/Student/LoginStudentView.vue'
import RegisterView from '@/views/auth/Student/RegisterStudentView.vue'
import DashboardView from '@/views/system/JobsDashboardView.vue'


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
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, isDefault: true }, // Requires authentication to access
  },
]
