import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url } from '@/utils/config';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Validate data from local storage during initialization
    user: validateLocalStorageItem('user', true), // Validate user as an object
    token: validateLocalStorageItem('token', false), // Validate token as a string
    returnUrl: null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const responseData = await fetchWrapper.post(`${base_url}/auth/login`, { email, password });
        if (responseData && responseData.user) {
          // Update Pinia state
          this.user = responseData?.user;
          this.token = responseData?.token;

          // Persist to local storage
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.token);
          // Redirect to the previous URL or default to dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        
      }
    },
    logout() {
      this.user = null;
      this.token = '';

      // Remove from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('placeholder_image');

      window.location.href = '/login'; // Redirect to avoid role issue
    },
  },
});

// Utility function to validate local storage items
function validateLocalStorageItem(key: string, isObject: boolean) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return isObject ? null : '';

    if (isObject) {
      const parsedValue = JSON.parse(value);
      return parsedValue && typeof parsedValue === 'object' ? parsedValue : null;
    }

    return typeof value === 'string' && value.trim() !== '' ? value : '';
  } catch (error) {
    // Remove invalid or corrupted data from local storage
    localStorage.removeItem(key);
    return isObject ? null : '';
  }
}
