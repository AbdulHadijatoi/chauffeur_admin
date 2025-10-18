<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
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
      form: {},
      file: null,
    };
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const formData = new FormData();

        // Append all form fields
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

     

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/services/update/${this.form.id}`,
          formData
        );

        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error('Error during update:', error);
      } finally {
        this.loading = false;
      }
    },

    handleFileUpload(e) {
      this.file = e.target.files[0];
    },
  },

  mounted() {
    // Pre-fill form with selected row data
    this.form = { ...this.selectedRow };
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title class="mb-4">Edit Services</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  v-model="form.name"
                  label="Name"
                  required
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  v-model="form.hour_duration"
                  label="Hour Duration"
                  required
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  v-model="form.price"
                  label="Price"
                  required
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  v-model="form.additional_price"
                  label="Additional Price"
                  required
                />
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
                  label="Select Category"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  density="compact"
                  variant="outlined"
                  v-model="form.description"
                  label="Description"
                  required
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" :disabled="loading" color="primary" type="submit">
                  Update
                </v-btn>
                <v-btn elevation="0" class="ml-2" @click="$emit('close')">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
