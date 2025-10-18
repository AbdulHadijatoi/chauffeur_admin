<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  data() {
    return {
      loading: false,
      form: {},
      files: [], // <-- store multiple images
      vehicle_attributes: [
        'name',
        'passengers',
        'luggage',
        'mileage',
        'transmission',
        'steering',
        'fuel_type',
        'engine',
        'power',
        'torque',
        'acceleration',
        'top_speed',
        'fuel_capacity',
        'weight',
        'length',
        'width',
        'height',
        'wheelbase',
        'ground_clearance',
        'turning_radius',
        'boot_space',
        'air_conditioning',
        'infotainment',
        'safety_features',
        'comfort_features',
      ],
    };
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

        // Append multiple files
        if (this.files && this.files.length > 0) {
          this.files.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
          });
        }

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/vehicles/create`,
          formData,
          true // optional: pass `true` if your fetchWrapper needs to skip JSON headers
        );

        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Create Vehicle</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              <!-- Vehicle Image Upload -->
              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload Vehicle Images"
                  v-model="files"
                  accept="image/*"
                  multiple
                  show-size
                />
              </v-col>

              <v-col
                v-for="(attribute, index) in vehicle_attributes"
                :key="index"
                cols="6"
              >
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form[attribute]"
                  :label="attribute.replaceAll('_', ' ')"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  variant="outlined"
                  density="compact"
                  v-model="form.description"
                  label="Description"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  elevation="0"
                  size="x-large"
                  :disabled="loading"
                  color="primary"
                  type="submit"
                >
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
