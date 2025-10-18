<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './sidebar/Sidebar.vue';
import Menubar from './menubar/Menubar.vue';
import { useCustomizerStore } from '../../stores/customizer';
const customizer = useCustomizerStore();
</script>

<template>
  <v-locale-provider>
    <v-app theme="DalileeTheme" :class="[customizer.fontTheme, customizer.mini_sidebar ? 'mini-sidebar' : '', customizer.inputBg ? 'inputWithbg' : '']">
      <Sidebar />
      <Menubar />
      <v-main>
        <v-container fluid class="page-wrapper">
          <div>
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
