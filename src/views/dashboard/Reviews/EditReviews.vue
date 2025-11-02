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
      form: {
        service_id: null,
        user_id: null,
        user_name: '',
        rating: null,
        comment: '',
        file_id: null,
      },
      services: [],
    };
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        // Validate required fields
        if (!this.form.service_id || !this.form.user_name || !this.form.rating || !this.form.comment) {
          throw new Error('Please fill in all required fields');
        }

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/reviews/update/${this.form.id}`,
          this.form
        );

        successMessage(responseData.message || 'Review updated successfully');
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error('Error during fetch:', error);
      } finally {
        this.loading = false;
      }
    },
    async getServices() {
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/services`, { 
          perPage: 100,
        });
        
        if (responseData && responseData.data) {
          this.services = responseData.data.services || [];
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
  },

  mounted() {
    // Load existing data
    this.form = { ...this.selectedRow };
    this.getServices();
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-title>Edit Review</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.service_id"
                  label="Service *"
                  variant="outlined"
                  density="compact"
                  :items="services"
                  item-title="name"
                  item-value="id"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.user_name"
                  label="User Name *"
                  variant="outlined"
                  density="compact"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.rating"
                  label="Rating *"
                  variant="outlined"
                  density="compact"
                  :items="[1, 2, 3, 4, 5]"
                  required
                >
                  <template v-slot:item="{ item, props }">
                    <v-list-item v-bind="props">
                      <template v-slot:prepend>
                        <span v-for="i in 5" :key="i" :class="i <= item.value ? 'text-yellow-400' : 'text-grey'">★</span>
                      </template>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <span v-for="i in 5" :key="i" :class="i <= item.value ? 'text-yellow-400' : 'text-grey'">★</span>
                    <span class="ml-2">{{ item.value }}</span>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.comment"
                  label="Comment *"
                  variant="outlined"
                  density="compact"
                  rows="4"
                  required
                ></v-textarea>
              </v-col>

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

