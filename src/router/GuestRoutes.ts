import { isAuthenticated } from '@/utils/api';

const GuestRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  beforeEnter: (to: any, from: any, next: any) => {
    if (isAuthenticated()) {
      next('/dashboard'); // Redirect to the dashboard if authenticated
    } else {
      next(); // Proceed to the auth route if not authenticated
    }
  },
  children: [
    {
      name: 'Login Page',
      path: '/login',
      component: () => import('@/views/authentication/auth/LoginPage.vue')
    },
  ]
};

export default GuestRoutes;
