import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import { useAuthStore } from './stores/auth';

// import { fakeBackend } from '@/utils/helpers/fake-backend';

// print
import print from 'vue3-print-nb';

const app = createApp(App);
// fakeBackend();
app.use(router);
app.use(PerfectScrollbarPlugin);
const pinia = createPinia();
app.use(pinia);
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');

// Set up cross-tab authentication synchronization
const authStore = useAuthStore();

// Listen for storage changes from other tabs
window.addEventListener('storage', (e: StorageEvent) => {
  // Check if user or token was changed/removed
  if (e.key === 'user' || e.key === 'token' || e.key === 'auth_logout') {
    if (e.key === 'auth_logout') {
      // Another tab logged out
      authStore.user = null;
      authStore.token = '';
      router.push('/login');
    } else {
      // Sync auth state from localStorage
      authStore.syncFromStorage();
      
      // If user/token was removed, redirect to login
      if (!authStore.user && !authStore.token) {
        router.push('/login');
      }
    }
  }
});

// Also listen for custom storage events (for same-tab sync)
window.addEventListener('auth-changed', () => {
  authStore.syncFromStorage();
});
