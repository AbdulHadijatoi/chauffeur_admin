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
    constants: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: {},
      file: null,
      service_types: this.constants.service_types,
    }
  },

  methods: {
    calculateTotalAmount() {
      this.loading = true; // Start loading

      setTimeout(() => {
        let default_amount = 25;
        if (this.form.request_type_id && this.form.request_type_id == 2) {
          default_amount = 50;
        }

        const {
          service_type_id,
          property_type_id,
          vehicle_id,
          request_type_id,
          area
        } = this.form;

        if (
          service_type_id &&
          property_type_id &&
          vehicle_id &&
          request_type_id &&
          area
        ) {
          const match = this.constants.service_pricings.find(price =>
            price.service_type_id === service_type_id &&
            price.property_type_id === property_type_id &&
            price.vehicle_id === vehicle_id &&
            price.request_type_id === request_type_id &&
            area >= price.area_from &&
            area <= price.area_to
          );

          this.form.total_amount = match ? match.price : default_amount;
          this.form.service_pricing_id = match ? match.id : null; // Set service_pricing_id if a match is found
        } else {
          this.form.total_amount = default_amount;
        }

        this.loading = false; // Stop loading after 1 second
      }, 1000);
    },


    async getData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/valuation-requests/get/${this.form.id}`, {});
        this.form = { ...responseData.data };

        if(this.form.property_type_id) {
          this.filterServicesCategories();
        }
        this.calculateTotalAmount(); // Calculate total amount after fetching data
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },

    filterServicesCategories() {
      const propertyTypeId = this.form.property_type_id;
      if (propertyTypeId) {
        const matched = this.constants.property_service_types.find(
          service => service.property_type_id === propertyTypeId
        );
        this.service_types = matched ? matched.services : [];
        console.log( this.service_types);
      } else {
        this.service_types = [];
      }
    },

    async updateData() {
      this.loading = true;
      try {

        const responseData = await fetchWrapper.post(`${base_url}/admin/valuation-requests/update/${this.form.id}`, {
          vehicle_id: this.form.vehicle_id,
          status_id: this.form.status_id,
          property_type_id: this.form.property_type_id,
          service_type_id: this.form.service_type_id,
          request_type_id: this.form.request_type_id,
          location_id: this.form.location_id,
          service_pricing_id: this.form.service_pricing_id,
          area: this.form.area,
          // Assuming total_amount is calculated in the backend
          total_amount: this.form.total_amount
        });
        successMessage(responseData.message);
        this.$emit('getData');
        this.$emit('close');
      } catch (error) {
        console.error("Error during update:", error);
      } finally {
        this.loading = false;
      }
    },

  },

  mounted() {
    this.form = { ...this.selectedRow };
    this.getData();
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-title>Edit Valuation Request #{{ selectedRow.id }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row dense>
              <!-- Dropdowns for Foreign Keys -->
              
              <v-col cols="12">
                <v-autocomplete 
                  v-model="form.vehicle_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="constants.Vehicles"
                  label="Select Vehicle"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
              
              <v-col cols="6">
                <v-autocomplete 
                  v-model="form.property_type_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="constants.property_types"
                  label="Select Property Type"
                  item-title="name"
                  item-value="id"
                  @update:modelValue="filterServicesCategories()"
                />
              </v-col>
              
              <v-col cols="6">
                <v-autocomplete 
                  v-model="form.service_type_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="service_types"
                  label="Select Service Type"
                  item-title="service_type"
                  item-value="service_type_id"
                />
              </v-col>
              
              <v-col cols="6">
                <v-autocomplete 
                  v-model="form.request_type_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="constants.request_types"
                  label="Select Request Type"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
              
              <v-col cols="6">
                <v-autocomplete 
                  v-model="form.location_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="constants.locations"
                  label="Select Location"
                  item-title="name"
                  item-value="id"
                />
              </v-col>

              <v-col cols="6">
                <v-autocomplete 
                  v-model="form.status_id" 
                  chips hide-no-data clearable
                  
                  density="compact"
                  :items="constants.statuses"
                  label="Select Status"
                  item-title="name"
                  item-value="id"
                />
              </v-col>
              
              <!-- Normal Fields -->
              <v-col cols="6">
                <v-text-field
                  v-model="form.area"
                  label="Area (meter square)"
                  min="0"
                  
                  density="compact"
                  type="number"
                />
              </v-col>

              <v-col cols="6">
                <label>Based on the given Property Type, Service Type, Request Type, Vehicle and the area.</label><br><br>
                <label class="rounded-2" style="padding: 8px 20px; border: 1px solid black; font-weight: bold;">Total Amount is: {{ form.total_amount }}</label>
              </v-col>
              <v-col cols="6">
                <v-btn elevation="0" :loading="loading" color="accent" @click="calculateTotalAmount">
                  Calculate Total Amount
                </v-btn>
              </v-col>

              <!-- Submit button -->
              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="large" :disabled="loading" color="primary" type="submit">
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
