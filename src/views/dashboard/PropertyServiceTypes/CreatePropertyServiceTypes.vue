<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    property_types: {
      type: Object,
      required: true,
    },
    service_types: {
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
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/property-services-categories/create`, { 
          ...this.form
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
        <v-card-title>Create Service Type for Property Type</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              

              <v-col cols="12" md="6">
                <v-autocomplete 
                  v-model="form.property_type_id" 
                  chips hide-no-data
                  density="compact"
                  :items="property_types"
                  label="Select Property Type"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete 
                  v-model="form.service_type_id" 
                  chips hide-no-data
                  density="compact"
                  :items="service_types"
                  label="Select Service Type"
                  item-title="name"
                  item-value="id"
                />
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
