<script>

import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import CreatePropertyServiceType from './CreatePropertyServicesCategories.vue';
import { successMessage } from '@/utils/helpers/messages';

export default {
    components: { CreatePropertyServiceType },

    data() {
        return {
            loading: false,
            headers: [
                { title: '#', key: 'id', filterable: true,},
                { title: 'Property Type', key: 'property_type_name', filterable: true,},
                { title: 'Service Type', key: 'service_type_name', filterable: true,},
                { title: 'Created Date', key: 'created_at_date', filterable: true,},
                { title: 'Created Time', key: 'created_at_time', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            property_types: [],
            service_types: [],
            selectedRow: null,
            createDialog: false,
            deleteDialog: false,
            filter: {
              property_type_id: null
            }
        }
    },

    methods: {
        async getConstants() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/constants`, { });
            if (responseData && responseData.data) {

              const data = responseData.data;
              this.service_types = data.service_types;
              this.property_types = data.property_types;

            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-services-categories`, { });
            
            if (responseData && responseData.data) {
              this.data = responseData.data;
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
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
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-services-categories/delete/${this.selectedRow.id}`, { });
            successMessage(responseData.message);
            this.getData();
            this.deleteDialog = false;
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
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
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Property Type's Services Categories</v-card-title>
            <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New (Property Type's) Service Type</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.property_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="property_types"
                label="Filter by Property Type"
                item-title="name"
                item-value="id"
              />
            </v-col>

            <!-- <v-col cols="12" md="4">
              <v-text-field
                v-model="search"
                label="Search"
                variant="outlined"
                density="compact"
                @keydown.enter="getData"
              >
                <template v-slot:append-inner>
                  <SearchIcon size="20" class="mr-2" />
                </template>
              </v-text-field>
            </v-col> -->
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">
            <template v-slot:item.property_type_name="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.property_type_name }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex align-center">
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
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-property-service-type @getData="getData()" :property_types="property_types" :service_types="service_types" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this service type?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
