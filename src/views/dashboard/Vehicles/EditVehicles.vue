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
  },

  data() {
    return {
      loading: false,
      form: {},
      files: [], // multiple new files
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
    async updateData() {
      this.loading = true;
      try {
        const formData = new FormData();

        // Append all text fields
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

        // Append multiple image files if selected
        if (this.files && this.files.length > 0) {
          this.files.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
          });
        }

        // Send FormData via API
        const responseData = await fetchWrapper.post(
          `${base_url}/admin/vehicles/update/${this.form.id}`,
          formData
        );

        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    // Load existing data
    this.form = { ...this.selectedRow };
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-title>Edit Vehicle - {{ form.name }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>
              <!-- Vehicle Image Upload -->
              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload New Vehicle Images"
                  v-model="files"
                  accept="image/*"
                  multiple
                  show-size
                />
              </v-col>

              <!-- Existing Images Preview -->
              <v-col cols="12" v-if="form.images && form.images.length">
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="(img, index) in form.images"
                    :key="index"
                    class="inline-block"
                  >
                    <img
                      :src="img.image_url || img.url"
                      alt="Vehicle Image"
                      class="rounded"
                      style="max-width: 100px; max-height: 100px;"
                    />
                  </div>
                </div>
              </v-col>

              <!-- Vehicle Attributes -->
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

              <!-- Submit -->
              <v-col cols="12" class="text-right">
                <v-btn
                  elevation="0"
                  size="x-large"
                  :disabled="loading"
                  color="primary"
                  type="submit"
                >
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
