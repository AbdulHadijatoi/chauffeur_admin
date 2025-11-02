
const DashboardRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/dashboard',
  component: () => import('@/layouts/full/FullLayout.vue'),
  beforeEnter: (to: any, from: any, next: any) => {
    next(); // Allow access to specific routes

    // if (isSuperAdmin()) { // this function is defined inside api.ts file, it check user role
    //   next(); // Allow access to all routes
    // } else {
    //   const allowedRoutes = ['Dashboard', 'Create Quote', 'Quote History'];
    //   const routeName = to.name;

    //   if (allowedRoutes.includes(routeName)) {
    //     next(); // Allow access to specific routes
    //   } else {
    //     next('/main/dashboard'); // Redirect to the dashboard or another allowed route
    //   }
    // }
  },
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue')
    },
  
    {
      name: 'Vehicles',
      path: '/vehicles',
      component: () => import('@/views/dashboard/Vehicles/Vehicles.vue')
    },
    
    
    {
      name: 'Services',
      path: '/services',
      component: () => import('@/views/dashboard/Services/Services.vue')
    },
    {
      name: 'Services Categories',
      path: '/services-categories',
      component: () => import('@/views/dashboard/ServicesCategories/ServicesCategories.vue')
    },
    {
      name: 'City To City Routes',
      path: '/city-to-city-routes',
      component: () => import('@/views/dashboard/CityToCityRoutes/CityToCityRoutes.vue')
    },
    {
      name: 'Guidelines',
      path: '/guidelines',
      component: () => import('@/views/dashboard/Guidelines/Guidelines.vue')
    },
    {
      name: 'Settings',
      path: '/settings',
      component: () => import('@/views/dashboard/Settings/Settings.vue')
    },
    {
      name: 'Reviews',
      path: '/reviews',
      component: () => import('@/views/dashboard/Reviews/Reviews.vue')
    },
    
  ]
};

export default DashboardRoutes;
