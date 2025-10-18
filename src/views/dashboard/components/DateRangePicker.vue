<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  modelValue: Array, // Accept date range as v-model
});

const emit = defineEmits(["update:modelValue"]);

// Allow selection from 1st Feb 2025 onwards (including 1st Feb)
const minDate = new Date(2025, 0, 31, 23, 59, 59); // Jan 31, 2025, 23:59:59

const disableDatesBeforeMin = (date) => {
  return date <= minDate; // Disable all dates before (not including) 1st Feb 2025
};
</script>

<template>
  <VueDatePicker
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    persistent
    range
    max-range="30"
    placeholder="Filter by Date"
    :clearable="true"
    :enable-time-picker="true"
    :disabled-dates="disableDatesBeforeMin"
  />
</template>
