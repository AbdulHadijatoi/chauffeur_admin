<script>

import axios from 'axios';
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';
import ViewLocation from './ViewLocation.vue';
import EditLocation from './EditLocation.vue';
import CreateLocation from './CreateLocation.vue';
import { successMessage } from '@/utils/helpers/messages';

export default {
    components: { ViewLocation, EditLocation, CreateLocation },

    data() {
        return {
            loading: false,
            totalItems: 0,
            headers: [
                { title: 'Name', key: 'name', filterable: true,},
                { title: 'Description', key: 'description', filterable: true,},
                { title: 'Latitude', key: 'latitude', filterable: true,},
                { title: 'Longitude', key: 'longitude', filterable: true,},
                { title: 'Status', key: 'status', filterable: true,},
                { title: 'Map Url', key: 'map_url', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            perPage: 10,
            page: 1,
            search: null,
            dateRange: null,
            selectedRow: null,
            createDialog: false,
            viewDialog: false,
            editDialog: false,
            deleteDialog: false,
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/locations`, { });
            if (responseData && responseData.data) {
              this.data = responseData.data;
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
            const responseData = await fetchWrapper.post(`${base_url}/admin/locations/delete/${this.selectedRow.id}`, { });
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
            <v-card-title>Locations</v-card-title>
            <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New Location</v-btn>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="search"
                label="Search"
                variant="outlined"
                density="compact"
              >
                <template v-slot:append-inner>
                  <SearchIcon size="20" class="mr-2" />
                </template>
              </v-text-field>
            </v-col>
            
          </v-row>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">
            
            <template v-slot:item.name="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.name }}
              </v-chip>
            </template>

            <template v-slot:item.map_url="{ item }">
                <a style="text-decoration:none; color: darkblue; font-style:italic" :href="item.map_url" target="_blank" rel="noopener noreferrer">View on Map</a>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status == 'active' ? 'primary' : 'error'" rounded="pill" class="mr-2">
                {{ item.status }}
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
      <view-location :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-location @getData="getData()" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-location @getData="getData()" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this location?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
