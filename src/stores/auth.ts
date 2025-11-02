import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url } from '@/utils/config';
import { nextTick } from 'vue';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // Validate data from local storage during initialization
    user: validateLocalStorageItem('user', true), // Validate user as an object
    token: validateLocalStorageItem('token', false), // Validate token as a string
    returnUrl: null,
  }),
  actions: {
    // Sync state from localStorage (called when storage event fires from other tabs)
    syncFromStorage() {
      this.user = validateLocalStorageItem('user', true);
      this.token = validateLocalStorageItem('token', false);
    },
    async login(email: string, password: string) {
      try {
        const responseData = await fetchWrapper.post(`${base_url}/auth/login`, { email, password });
        console.log("Login response:", responseData);

        if (responseData && responseData.user) {
          // Update Pinia state
          this.user = responseData.user;
          this.token = responseData.token;

          // Persist to local storage
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.token);
          
          // Note: Storage event automatically fires in other tabs when localStorage changes
          // No need to manually dispatch - browser handles this
          
          console.log("User set in store:", this.user);
          console.log("Token set:", this.token);
          
          // Wait for next tick to ensure state is fully updated
          await nextTick();
          
          // Redirect to the previous URL or default to dashboard
          await router.push('/dashboard');
        } else {
          console.error("Login failed: Invalid response structure", responseData);
          throw new Error('Invalid response from server. Please try again.');
        }
      } catch (error: any) {
        console.error("Error during login:", error);
        // Extract error message properly
        const errorMessage = error?.response?.data?.message || error?.message || 'Login failed. Please check your credentials.';
        // Re-throw the error so it can be caught by the form validation
        throw new Error(errorMessage);
      }
    },
    logout() {
      this.user = null;
      this.token = '';

      // Remove from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('placeholder_image');

      // Trigger storage event for other tabs to sync logout
      // Set a flag in localStorage to indicate logout
      localStorage.setItem('auth_logout', Date.now().toString());
      setTimeout(() => localStorage.removeItem('auth_logout'), 100);

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
