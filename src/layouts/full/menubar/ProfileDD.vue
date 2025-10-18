<script setup lang="ts">
import { ref } from 'vue';
import { SettingsIcon, LogoutIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = JSON.parse(localStorage.getItem('user') || '');
function greetingMessage() {
  const currentHour = new Date().getHours();
  
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
}
</script>

<template>
  <div class="pa-4">
    <h4 class="mb-n1">{{greetingMessage()}}, <span class="font-weight-regular">{{user?.name}}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">{{user?.email}}</span>

    <perfect-scrollbar>
      <v-list class="mt-3">
        <!-- <v-list-item to="/dashboard/profile-setting" color="secondary" rounded="md">
          <template v-slot:prepend>
            <SettingsIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Account Settings</v-list-item-title>
        </v-list-item> -->

        
        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2"> Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
