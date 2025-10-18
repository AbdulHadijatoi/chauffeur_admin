<template>
  <v-tooltip>
    <template #activator="{ props }">
      <v-chip 
        :color="color" 
        :rounded="rounded"
        class="mr-2 py-5" 
        v-bind="props" 
        @click="handleClick"
      >
        <component :is="icon" :size="iconSize" />
      </v-chip>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "ChipWithTooltip",
  props: {
    color: {
      type: String,
      default: "success", // Default chip color
    },
    rounded: {
      type: String,
      default: "pill", // Default rounded style
    },
    tooltip: {
      type: String,
      required: true, // Tooltip text
    },
    icon: {
      type: [String, Object],
      required: true, // Icon component or string
    },
    iconSize: {
      type: [Number, String],
      default: 20, // Default icon size
    },
    onClick: {
      type: Function,
      required: true, // Click handler
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
};
</script>
