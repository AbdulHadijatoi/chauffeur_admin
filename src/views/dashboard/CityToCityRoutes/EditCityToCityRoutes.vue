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
    cities: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: [],
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/city-to-city-routes/update/${this.form.id}`, { 
          ...this.form,
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
    this.form = { ...this.selectedRow };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit City Routes - #{{ selectedRow.id }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>

              <v-col cols="12" md="6">
                <v-autocomplete 
                  v-model="form.from_city_id" 
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
                  v-model="form.to_city_id" 
                  chips hide-no-data
                  variant="outlined"
                  density="compact"
                  :items="cities"
                  :label="'To City: ' + selectedRow.to_city.name"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
            
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.duration"
                  label="Duration"
                  type="number"
                  min="0"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.distance"
                  label="Distance"
                  type="number"
                  min="0"
                  variant="outlined"
                  density="compact"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
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
