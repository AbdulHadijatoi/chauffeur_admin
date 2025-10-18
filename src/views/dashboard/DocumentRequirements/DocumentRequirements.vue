<script>

import axios from 'axios';
import { base_url,domain } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import ViewDocumentRequirements from './ViewDocumentRequirements.vue';
import EditDocumentRequirements from './EditDocumentRequirements.vue';
import CreateDocumentRequirements from './CreateDocumentRequirements.vue';
import { successMessage, errorMessage } from '@/utils/helpers/messages';

export default {
    components: { ViewDocumentRequirements, EditDocumentRequirements, CreateDocumentRequirements },

    data() {
        return {
            loading: false,
            headers: [
                { title: '#', key: 'id', filterable: true,},
                { title: 'Property Type', key: 'property_type_name', filterable: true,},
                { title: 'Service Type', key: 'service_type_name', filterable: true,},
                { title: 'Document Name', key: 'document_name', filterable: true,},
                { title: 'Type', key: 'type', filterable: true,},
                { title: 'Created Date', key: 'created_at_date', filterable: true,},
                { title: 'Created Time', key: 'created_at_time', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            allData: [],
            selectedRow: null,
            createDialog: false,
            viewDialog: false,
            editDialog: false,
            deleteDialog: false,
            property_types: [],
            service_types: [],
            filter: {
              property_type_id: null,
              service_type_id: null
            }
        }
    },

    methods: {
        filterData() {  
          // Reset data to all data before filtering
          this.data = [...this.allData];

          if (this.filter.property_type_id) {
            // Filter by property type
            this.data = this.allData.filter(item => item.property_type_id == this.filter.property_type_id);
          }

          if (this.filter.service_type_id) {
            // Filter by service type
            this.data = this.data.filter(item => item.service_type_id == this.filter.service_type_id);
          }
        },
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/document-requirements`, { });
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

        async deleteData(){
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/document-requirements/delete/${this.selectedRow.id}`, { });
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
            <v-card-title>Document Requirements</v-card-title>
            <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New Service Type</v-btn>
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
            <v-col cols="12" md="4">
              <v-autocomplete 
                v-model="filter.service_type_id" 
                chips hide-no-data
                variant="outlined"
                density="compact"
                :items="service_types"
                label="Filter by Service Type"
                item-title="name"
                item-value="id"
              />
            </v-col>
            
            <v-col cols="12" md="4">
              <v-btn variant="outlined" color="primary" @click="filterData()">Apply Filter (display result)</v-btn>
            </v-col>
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">
            
            <template v-slot:item.document_name="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.document_name }}
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
      <view-document-requirements :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-document-requirements @filterData="filterData()" @getData="getData()" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-document-requirements @filterData="filterData()" :property_types="property_types" :service_types="service_types" @getData="getData()" @close="createDialog = false"/>
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
