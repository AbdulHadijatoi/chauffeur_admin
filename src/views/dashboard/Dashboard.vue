<script>
import axios from 'axios';
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { EyeIcon, PrinterIcon } from 'vue-tabler-icons';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';
import TotalOrder from './components/TotalOrder.vue';

export default {
  components: { VueDatePicker, TotalOrder },

  data() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the current month
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month

    return {
      loading: false,
      totalDelivered: 0,
      totalCollection: 0,
      dateRange: [firstDayOfMonth, lastDayOfMonth], // Default range set to "This Month"
    };
  },

  methods: {
    async getData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/orders/count`, {
          from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
          to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
        });

        if (responseData) {
          this.totalDelivered = responseData.total_delivered;
          this.totalCollection = responseData.total_collection;
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        console.log('Request completed.');
        this.loading = false;
      }
    },

    formatDate(date) {
      if (!date) return '';

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
  },

  mounted() {
    // this.getData(); // Fetch data immediately on component mount with the default range
  },
};
</script>

<template>
  <v-row>
    <!-- Welcome Section -->
    <v-col cols="12">
      <v-card
        variant="flat"
        class="pa-4 text-center"
      >
        <v-card-title class="text-h2 mb-2 text-bold text-primary">
          Welcome to Chauffeur Dubai Dashboard!
        </v-card-title>
        <v-card-text class="text-[30px] mb-4">
          Everything you need to get started is just a click away! Explore the tabs on left to manage data, view reports, and more.  
        </v-card-text>
       
        
      </v-card>
    </v-col>
  </v-row>
</template>