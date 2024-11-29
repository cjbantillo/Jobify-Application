import { createRouter, createWebHistory } from 'vue-router';
import { useAuthUserStore } from '@/stores/authUser'; // Assuming you use Pinia for authentication state
import { supabase } from '@/utils/supabase'; // Assuming you use Supabase for user data

import HomePageView from '@/views/system/HomePageView.vue';
import LoginView from '@/views/auth/Student/LoginStudentView.vue';
import RegisterView from '@/views/auth/Student/RegisterStudentView.vue';
import JobDashboardView from '@/views/system/JobsDashboardView.vue';
import ResumeDashboard from '@/views/system/ResumeDashboard.vue';
import AccountSettings from '@/views/system/AccountInformationView.vue';

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
    path: '/settings/account-information',
    name: 'settings/account-information',
    component: AccountSettings,
    meta: { requiresAuth: true, isDefault: true },
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumeDashboard,
    meta: { requiresAuth: true, isDefault: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to handle authentication and redirection
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUserStore();
  const isAuthenticated = authStore.isAuthenticated;
  const currentUser = supabase.auth.user();

  if (isAuthenticated && currentUser) {
    const { data: error } = await supabase
      .from('users')
      .select('is_student, is_employer')
      .eq('id', currentUser.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return next('/login'); // Redirect to login if there's an error
    }

    // Redirect `/settings/account-information` to `/jobdashboard`
    if (to.path === '/settings/account-information') {
      return next('/jobdashboard');
    }

  }

  // Redirect to login if the route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  // Allow navigation to the route if none of the above conditions were met
  next();
});

// Exporting router without `export default`
export { router, routes };
