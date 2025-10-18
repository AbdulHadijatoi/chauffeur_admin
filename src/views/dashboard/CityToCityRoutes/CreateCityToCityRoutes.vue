<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    cities: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      filter: {
        from_city_id: null,
        to_city_id: null,
        duration: null,
        distance: null,
      }
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/city-to-city-routes/create`, { 
          ...this.filter
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
        <v-card-title class="mb-4">Create City Routes</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              

              <v-col cols="12" md="6">
              <v-autocomplete 
                v-model="filter.from_city_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="cities"
                label="From City"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-autocomplete 
                v-model="filter.to_city_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="cities"
                label="To City"
                item-title="name"
                item-value="id"
              />
            </v-col>
          
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="filter.duration"
                label="Duration"
                type="number"
                min="0"
                variant="outlined"
                density="compact"
              />
            </v-col>
            
            <v-col cols="12" md="6">
              <v-text-field
                v-model="filter.distance"
                label="Distance"
                type="number"
                min="0"
                variant="outlined"
                density="compact"
              />
            </v-col>
           

              <v-col cols="12" class="text-right">
                <v-btn size="x-large" :disabled="loading || !(filter.from_city_id && filter.to_city_id && filter.duration && filter.distance) " color="primary" type="submit">
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
