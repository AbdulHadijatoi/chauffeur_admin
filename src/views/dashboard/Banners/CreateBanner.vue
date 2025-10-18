<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker},

  data() {
    return {
      loading: false,
      form: [],
      file: null,
      dateRange: null,
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/banner-ads/create`, { 
          title: this.form.title,
          link: this.form.link,
          ad_type: this.form.ad_type,
          description: this.form.description,
          start_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
          end_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
          file: this.file
        });
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate (date) {
      if (!date) return '';
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

  },

  mounted() {
    //
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Create Banner Ad</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>

              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload Banner Image"
                  v-model="file"
                  accept="image/*"
                />
              </v-col>

              <v-col cols="12" md="6">
                <VueDatePicker v-model="dateRange" range :placeholder="`Select active date range from and to`" :clearable="true"/>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.title" 
                  label="Title"
                  required />
              </v-col>

              <!-- <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.link" 
                  label="Target Link" />
              </v-col> -->

              <v-col cols="6">
                <v-select
                  variant="outlined"
                  density="compact"
                  v-model="form.ad_type"
                  :items="['daily', 'weekly', 'monthly', 'permanent']"
                  label="Ad Type"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  variant="outlined"
                  density="compact"
                  v-model="form.description" label="Description" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
