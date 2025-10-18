<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style>
.v-field--variant-filled .v-field__overlay{
  background: none;
  border-radius: 3px;
}

.v3ti{
  border: 1px solid rgba(0,0,0,0.2) !important;
  padding: 5px;
}

.v3ti .v3ti-tag{
  background-color: rgb(var(--v-theme-lightprimary)) !important;
  color: rgb(var(--v-theme-secondary)) !important;
  border-radius: 20px !important;
  padding: 15px !important;
}

.v3ti--focus{
  border: 0.5px solid rgb(var(--v-theme-secondary)) !important;
}

.v3ti-remove-tag{
  color: rgb(var(--v-theme-secondary)) !important;
  opacity: 1 !important;
}



/* Include the global CSS for sticky columns here */
.v-data-table__thead tr th:first-child,
.v-data-table__tbody tr td:first-child {
  width: 200px !important;
  position: sticky;
  left: 0;
  background-color: rgb(var(--v-theme-containerBg)) !important;
  z-index: 2;
}

.v-data-table__thead tr th:last-child,
.v-data-table__tbody tr td:last-child {
  width: 200px !important;
  position: sticky;
  right: 0;
  background-color: rgb(var(--v-theme-containerBg)) !important;
  z-index: 2;
}

.v-data-table__thead tr, 
.v-data-table__tbody tr {
  height: 45px !important;
}

.v-data-table__tbody tr:nth-child(even) {
  background-color: #ffffff !important;
}

.v-data-table__tbody tr:nth-child(odd) {
  background-color: rgb(var(--v-theme-containerBg)) !important;
}

.v-table__wrapper{
  overflow: scroll !important;
  max-height: 600px !important;
}


</style>