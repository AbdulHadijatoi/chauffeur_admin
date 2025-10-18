import { useAuthStore } from '../stores/auth';
import { base_url } from './config';

import "vue3-toastify/dist/index.css";

const isAuthenticated = () => {
  const authStore = useAuthStore();
  return !!authStore.user; // Returns true if user is authenticated, false otherwise
};
 
// const isSuperAdmin = () => {
//   const authStore = useAuthStore();
//   return !!authStore.user; // Returns true if user is authenticated, false otherwise
// };



async function handleUnauthorized(response: Response) {
  if (response.status === 401) {
    const authStore = useAuthStore();
    authStore.logout(); // Log out the user
    throw new Error('Unauthorized access, logging out...');
  }
}

async function getData<T>(endpoint: string): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${base_url}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    await handleUnauthorized(response); // Check for unauthorized status
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

async function postData<T>(endpoint: string, formData: FormData): Promise<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${base_url}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      // Do not set Content-Type when sending FormData
    },
    body: formData,
  });

  if (!response.ok) {
    await handleUnauthorized(response); // Check for unauthorized status
    throw new Error('Failed to post data');
  }

  return response.json(); // Return the JSON response
}

async function getPdf(endpoint: string): Promise<void> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${base_url}${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    await handleUnauthorized(response); // Check for unauthorized status
    throw new Error('Failed to fetch PDF');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

async function postPdf(endpoint: string, data: FormData): Promise<void> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${base_url}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      // Do not set 'Content-Type' for FormData; let the browser set it automatically
    },
    body: data,
  });

  if (!response.ok) {
    await handleUnauthorized(response); // Check for unauthorized status
    throw new Error('Failed to post PDF');
  }

  // Check for correct Content-Type
  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/pdf')) {
    throw new Error('The server did not return a PDF');
  }

  // Create a blob from the response
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  // Create a link element
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;

  // Set a default filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `shipping_quote_${timestamp}.pdf`;

  // Append the link to the document body
  document.body.appendChild(a);
  a.click(); // Trigger the download

  // Clean up the URL object and remove the link
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

async function uploadImage<T>(endpoint: string, formData: FormData): Promise<T> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = user.token;

  const response = await fetch(`${base_url}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    await handleUnauthorized(response); // Check for unauthorized status
    throw new Error('Failed to upload image');
  }

  return response.json();
}

// Common export for all functions
export { getData, postData, getPdf, postPdf, uploadImage, isAuthenticated};
