import { createRouter, createWebHistory } from 'vue-router';
import DashboardRoutes from './DashboardRoutes';
import AuthRoutes from './AuthRoutes';
import GuestRoutes from './GuestRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    DashboardRoutes,
    GuestRoutes,
    AuthRoutes
  ]
});

interface User {
  // Define the properties and their types for the user data here
  // For example:
  id: number;
  name: string;
}

// Assuming you have a type/interface for your authentication store
interface AuthStore {
  user: User | null;
  returnUrl: string | null;
  syncFromStorage(): void;
  login(username: string, password: string): Promise<void>;
  logout(): void;
}

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth: AuthStore = useAuthStore();

  // Sync auth state from localStorage before checking (handles cross-tab changes)
  auth.syncFromStorage();

  // Check if user exists in store or localStorage as fallback
  const hasUser = auth.user || (typeof window !== 'undefined' && localStorage.getItem('user'));

  // If already on login page and user is authenticated, redirect to dashboard
  if (to.path === '/login' && hasUser) {
    return next('/dashboard');
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !hasUser) {
      auth.returnUrl = to.fullPath;
      return next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
