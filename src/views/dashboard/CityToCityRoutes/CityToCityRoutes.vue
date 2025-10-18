<script>

import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import ViewCityToCityRoutes from './ViewCityToCityRoutes.vue';
import EditCityToCityRoutes from './EditCityToCityRoutes.vue';
import CreateCityToCityRoutes from './CreateCityToCityRoutes.vue';
import { successMessage, errorMessage } from '@/utils/helpers/messages';

export default {
    components: { ViewCityToCityRoutes, EditCityToCityRoutes, CreateCityToCityRoutes },

    data() {
        return {
            loading: false,
            headers: [
                { title: '#', key: 'id', filterable: true,},
                { title: 'From City', key: 'from_city.name', filterable: true,},
                { title: 'To City', key: 'to_city.name', filterable: true,},
                { title: 'Distance', key: 'distance', filterable: true,},
                { title: 'Duration', key: 'duration', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            allData: [],
            selectedRow: null,
            createDialog: false,
            viewDialog: false,
            editDialog: false,
            deleteDialog: false,
            cities: [],
            filter: {
              from_city_id: null,
              to_city_id: null,
            }
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/city-to-city-routes`, { });
            if (responseData && responseData.data) {
              this.allData = responseData.data;
              this.data = [...this.allData]; // Initialize data with all data
            }

            this.filterData();
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        async getConstants() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/constants/cities`, { });
            if (responseData && responseData.data) {
              const data = responseData.data;
              this.cities = data;
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        view(item) {
          this.selectedRow = item;
          this.viewDialog = true;
        },
        edit(item) {
          this.selectedRow = item;
          this.editDialog = true;
        },
        create() {
          this.createDialog = true;
        },
        deleteRow(item) {
          this.selectedRow = item;
          this.deleteDialog = true;
          
        },

        async deleteData(){
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/city-to-city-routes/delete/${this.selectedRow.id}`, { });
            successMessage(responseData.message);
            this.getData();
            this.deleteDialog = false;
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },

        filterData() {
          // apply each filter one by one if selected
          this.data = [...this.allData];
          if (!this.allData || this.allData.length === 0) {
            errorMessage("No data available to filter.");
            return;
          }

          if (this.filter.property_type_id) {
            // Filter by property type
            this.data = this.data.filter(item => item.property_type_id == this.filter.property_type_id);
          }

          if (this.filter.service_type_id) {
            // Filter by service type
            this.data = this.data.filter(item => item.service_type_id == this.filter.service_type_id);
          }

          if (this.filter.vehicle_id) {
            // Filter by vehicle
            this.data = this.data.filter(item => item.vehicle_id == this.filter.vehicle_id);
          }

          if (this.filter.request_type_id) {
            // Filter by request type
            this.data = this.data.filter(item => item.request_type_id == this.filter.request_type_id);
          }

          if (this.filter.area) {
            // Filter by area
            this.data = this.data.filter(item => {
              if (item.area_from && item.area_to) {
                return item.area_from <= this.filter.area && item.area_to >= this.filter.area;
              }
              return false; // If area_from or area_to is not defined, exclude the item
            });
          }
        },
    },
    created(){
      //
    },
    computed: {
      //
    },
    watch: {
        //
    },
    mounted() {
      this.getConstants();
      this.getData();
      // this.filterData();
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>City Routess</v-card-title>
            
            <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New City Routes</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.from_city_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="cities"
                label="Filter by From City"
                item-title="name"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.to_city_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="cities"
                label="Filter by To City"
                item-title="name"
                item-value="id"
              />
            </v-col>

            <v-col cols="12" md="4">
              <v-btn :disabled="loading" variant="outlined" color="primary" @click="filterData()">Apply Filter (display result)</v-btn>
            </v-col>
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">

            <template v-slot:item.price="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.price }} OMR
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex align-center">
                
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="primary" rounded="pill"   class="mr-2 py-5" v-bind="props" @click="view(item)">
                      <EyeIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>View</span>
                </v-tooltip>
                
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="info" rounded="pill"   class="mr-2 py-5" v-bind="props" @click="edit(item)">
                      <EditIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="accent" rounded="pill"   class="mr-2 py-5" v-bind="props" @click="deleteRow(item)">
                      <TrashIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>Delete</span>
                </v-tooltip>

              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Add dialog to view data -->
  <v-dialog v-model="viewDialog" max-width="800px">
    <v-card>
      <view-city-to-city-routes :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-city-to-city-routes @getData="getData()" :cities="cities" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-city-to-city-routes :cities="cities" @getData="getData()" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this City Routes?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
