import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser' // Assuming you use Pinia for authentication state

// footer 
import AboutView from '@/views/system/Footer/AboutView.vue'
import HomePageView from '@/views/system/HomePageView.vue'
import LoginView from '@/views/auth/LoginStudentView.vue'
import RegisterView from '@/views/auth/RegisterStudentView.vue'
import JobDashboardView from '@/views/system/Student/JobsDashboardView.vue' // sttudent job dashboard
import EmployerDashboardView from '@/views/system/Employer/EmployerDashboard.vue' // employer dashboard
import PostedJobView from '@/views/system/Employer/PostJobDashboard.vue' //employer posted jobs
import ResumeDashboard from '@/views/system/Student/ResumeDashboard.vue' //student resume dashboard
import ApplicationListView from '@/views/system/Employer/ApplicationListView.vue'
//settings pages
import AccountSettingsInfo from '@/views/system/settings/AccountInformationView.vue'
import AccountSettingsChangePassword from '@/views/system/settings/ChangePasswordView.vue'
import AccountSettingsPersonalization from '@/views/system/settings/PersonalizationView.vue'
import AccountSettingsSecurityPrivacy from '@/views/system/settings/SecurityPrivacyView.vue'
import EmployerInformationView from '@/views/system/Employer/EmployerInformationView.vue'

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
  {
    path: '/postedjobs',
    name: 'postedjobs',
    component: PostedJobView,
    meta: { requiresAuth: true, isDefault: true },
  },
  // resume dashboard
  {
    path: '/resume',
    name: 'resume',
    component: ResumeDashboard,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    // application list view
    path: '/application-list',
    name: 'application=list',
    component: ApplicationListView,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/employerinformation',
    name: 'employerinformation',
    component: EmployerInformationView,
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
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUserStore()
  const isAuthenticated = authStore.isAuthenticated
  const is_employer = authStore.is_employer // Assuming you have a `userRole` field in your auth store to determine if they are a student or employer

  // If the user is already authenticated and tries to access the login or register page, redirect to their dashboard
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    // Redirect to the correct dashboard based on the role
    if (is_employer === true) {
      return next('/employerdashboard')
    } else {
      return next('/jobdashboard')
    }
  }

  // Redirect to login if the route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login')
  }

  // Allow navigation to the route if none of the above conditions were met
  next()
})

// Exporting router without `export default`
export { router, routes }
