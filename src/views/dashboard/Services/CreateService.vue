<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    vehicles: {
      type: Array,
      required: true,
    },
    services_categories: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const formData = new FormData();

        // Append all form fields
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

        const responseData = await fetchWrapper.post(`${base_url}/admin/services/create`, formData);
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },

    handleFileUpload(e) {
      this.file = e.target.files[0];
    }
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
        <v-card-title class="mb-4">Create Service</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              

              <v-col cols="6">
                <v-text-field density="compact" variant="outlined" v-model="form.name" label="Name" required />
              </v-col>
              <v-col cols="6">
                <v-text-field density="compact" variant="outlined" v-model="form.hour_duration" label="Hour Duration" required />
              </v-col>
              <v-col cols="6">
                <v-text-field density="compact" variant="outlined" v-model="form.price" label="Price" required />
              </v-col>
              <v-col cols="6">
                <v-text-field density="compact" variant="outlined" v-model="form.additional_price" label="Additional Price" required />
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  density="compact"
                  variant="outlined"
                  :items="vehicles"
                  item-title="name"
                  item-value="id"
                  v-model="form.vehicle_id"
                  label="Select Vehicle"
                  required
                />
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  density="compact"
                  variant="outlined"
                  :items="services_categories"
                  item-title="name"
                  item-value="id"
                  v-model="form.services_category_id"
                  label="Select Vehicle"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea density="compact" variant="outlined" v-model="form.description" label="Description" required />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" :disabled="loading" color="primary" type="submit">
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
