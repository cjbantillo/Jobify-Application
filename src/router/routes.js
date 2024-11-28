import { createRouter, createWebHistory } from 'vue-router';
import { useAuthUserStore } from '@/stores/authUser'; // Assuming you use Pinia for authentication state
import { supabase } from '@/utils/supabase'; // Assuming you use Supabase for user data

import HomePageView from '@/views/system/HomePageView.vue';
import LoginView from '@/views/auth/Student/LoginStudentView.vue';
import RegisterView from '@/views/auth/Student/RegisterStudentView.vue';
import JobDashboardView from '@/views/system/JobsDashboardView.vue';
import SettingsDashboard from '@/views/system/SettingsDashboard.vue';
import ResumeDashboard from '@/views/system/ResumeDashboard.vue';

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
    path: '/settings',
    name: 'settings',
    component: SettingsDashboard,
    meta: { requiresAuth: true, isDefault: true },
  },

  {
    path: '/resume',
    name: 'resume',
    component: ResumeDashboard,
    meta: { requiresAuth: true, isDefault: true },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication status and prevent navigation based on roles
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthUserStore();  // Assuming you have a store that manages authentication state
  const isAuthenticated = authStore.isAuthenticated;  // Or use computed properties from your store
  const currentUser = supabase.auth.user();

  // Check if the user is authenticated and if they have `is_student` or `is_employer` set
  if (isAuthenticated && currentUser) {
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('is_student, is_employer')
      .eq('id', currentUser.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return next('/login'); // Redirect to login if there's an error
    }

    // Prevent navigation if the user is already an employer and tries to access the job dashboard
    if (to.name === 'jobdashboard' && userProfile.is_employer) {
      console.log('Employer user cannot access job dashboard.');
      return next('/employerdashboard'); // Redirect to employer dashboard
    }

    // Prevent navigation if the user is already a student and tries to access the employer dashboard
    if (to.name === 'employerdashboard' && userProfile.is_student) {
      console.log('Student user cannot access employer dashboard.');
      return next('/jobdashboard'); // Redirect to job dashboard
    }

    // Prevent accessing job dashboard if the employer has already submitted details (optional)
    if (to.name === 'employerdashboard' && userProfile.is_employer) {
      const { data: employerDetails } = await supabase
        .from('employer_profiles')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (employerDetails) {
        return next('/employerdashboard'); // Prevent re-accessing employer dashboard after details are submitted
      }
    }
  }

  // Check if the route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login'); // Redirect to login if not authenticated
  }

  // Allow navigation to the route if none of the above conditions were met
  next();
});

export default router;
