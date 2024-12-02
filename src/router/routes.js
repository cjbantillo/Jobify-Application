import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser' // Assuming you use Pinia for authentication state

import HomePageView from '@/views/system/HomePageView.vue'
import LoginView from '@/views/auth/LoginStudentView.vue'
import RegisterView from '@/views/auth/RegisterStudentView.vue'
import JobDashboardView from '@/views/system/JobsDashboardView.vue'
import EmployerDashboardView from '@/views/system/EmployerDashboard.vue'
import ResumeDashboard from '@/views/system/ResumeDashboard.vue'
import AccountSettingsInfo from '@/views/system/settings/AccountInformationView.vue'
//must be updated
import AccountSettingsChangePassword from '@/views/system/settings/ChangePasswordView.vue'
import AccountSettingsNotification from '@/views/system/settings/NotificationView.vue'
import AccountSettingsPersonalization from '@/views/system/settings/PersonalizationView.vue'
import AccountSettingsSecurityPrivacy from '@/views/system/settings/SecurityPrivacyView.vue'


const routes = [
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
    meta: { requiresAuth: false },
  },

  // System Pages
  {
    path: '/jobdashboard',
    name: 'jobdashboard',
    component: JobDashboardView,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/employerdashboard',
    name: 'employerdashboard',
    component: EmployerDashboardView,
    meta: { requiresAuth: true, isDefault: true },
  },
  // resume dashboard
  {
    path: '/resume',
    name: 'resume',
    component: ResumeDashboard,
    meta: { requiresAuth: true, isDefault: true },
  },
  //settings pages
  {
    path: '/settings/account-information',
    name: 'account-information',
    component: AccountSettingsInfo,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/settings/change-password',
    name: 'change-password',
    component: AccountSettingsChangePassword,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/settings/notification',
    name: 'notification',
    component: AccountSettingsNotification,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/settings/personalization',
    name: 'personalization',
    component: AccountSettingsPersonalization,
    meta: { requiresAuth: true, isDefault: true },
  },

  {
    path: '/settings/security-privacy',
    name: 'security-privacy',
    component: AccountSettingsSecurityPrivacy,
    meta: { requiresAuth: true, isDefault: true },
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to handle authentication and redirection
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUserStore()
  const isAuthenticated = authStore.isAuthenticated

  // Redirect to login if the route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // Allow navigation to the route if none of the above conditions were met
  next()
})

// Exporting router without `export default`
export { router, routes }
