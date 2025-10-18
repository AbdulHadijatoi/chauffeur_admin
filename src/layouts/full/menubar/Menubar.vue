<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';

import { SettingsIcon, Menu2Icon, UserIcon, LogoutIcon, UserBoltIcon, UserCircleIcon, MoonIcon } from 'vue-tabler-icons';

import ProfileDD from './ProfileDD.vue';
const user = JSON.parse(localStorage.getItem('user') || '');
const customizer = useCustomizerStore();
const showSearch = ref(false);
function searchbox() {
  showSearch.value = !showSearch.value;
}
</script>

<template>
  <v-app-bar elevation="0" height="65">
    <v-btn
      class="hidden-md-and-down text-black bold ml-4"
      icon
      color="lightprimary"
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <v-btn
      class="hidden-lg-and-up text-black bold ml-4"
      icon
      color="lightprimary"
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>


    <v-spacer />
    <div class="d-flex align-center">
      <!-- <v-btn
        class="text-black bold ml-4"
        icon
        color="lightprimary"
        rounded="circle"
        variant="flat"
        size="small"
      >
        <MoonIcon size="20" stroke-width="1.5" />
      </v-btn> -->
  
      <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn class="profileBtn text-black px-4" color="lightprimary" variant="flat" v-bind="props">
            
              <template v-slot:prepend>
                <UserCircleIcon size="20" />
              </template>
  
            <span class="font-weight-regular">{{user?.name}}</span>
          </v-btn>
        </template>
        <v-sheet rounded="md" width="300" elevation="12">
          <ProfileDD />
        </v-sheet>
      </v-menu>
    </div>
  </v-app-bar>
</template>
