<script>

import axios from 'axios';
import { base_url,domain } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';
import ViewPropertyType from './ViewPropertyType.vue';
import EditPropertyType from './EditPropertyType.vue';
import CreatePropertyType from './CreatePropertyType.vue';
import { successMessage } from '@/utils/helpers/messages';

export default {
    components: { VueDatePicker, ViewPropertyType, EditPropertyType, CreatePropertyType },

    data() {
        return {
            loading: false,
            totalItems: 0,
            headers: [
                { title: '#', key: 'id', filterable: true,},
                { title: 'Property Type', key: 'name', filterable: true,},
                { title: 'Created Date', key: 'created_at_date', filterable: true,},
                { title: 'Created Time', key: 'created_at_time', filterable: true,},
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
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-types`, { 
              perPage: this.perPage,
              page: this.page,
              from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
              to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
              search_keyword: this.search,
            });
            
            if (responseData && responseData.data) {
              this.data = responseData.data;
              this.totalItems = responseData.total;
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        download() {
          const { token } = useAuthStore();
            this.loading = true;
            axios.post(`${base_url}/admin/property-types/export`, {
              from_date: this.dateRange ? this.formatDate(this.dateRange[0]) : null,
              to_date: this.dateRange ? this.formatDate(this.dateRange[1]) : null,
              search_keyword: this.search,
            }, {
                responseType: 'blob',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `property-types_${new Date().getTime()}.xlsx`);

                document.body.appendChild(link);
                link.click();
                this.loading = false;
            })
            .catch(error => {
                console.log(error);
                this.loading = false;
            });
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
            const responseData = await fetchWrapper.post(`${base_url}/admin/property-types/delete/${this.selectedRow.id}`, { });
            successMessage(responseData.message);
            this.getData();
            this.deleteDialog = false;
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            
            this.loading = false;
          }
        },
        formatDate (date) {
          if (!date) return '';
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const seconds = date.getSeconds().toString().padStart(2, '0');
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Property Types</v-card-title>
            <div>
              <v-btn color="secondary" @click="download()" :disabled="loading || !data || data.length == 0" class="mr-2"><DownloadIcon size="20" class="mr-2"/>Download Excel</v-btn>
              <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New Property Type</v-btn>
            </div>
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
                @keydown.enter="getData"
              >
                <template v-slot:append-inner>
                  <SearchIcon size="20" class="mr-2" />
                </template>
              </v-text-field>
            </v-col>
            
            <v-col cols="12" md="4">
              <VueDatePicker v-model="dateRange" @closed="getData" range placeholder="Filter by Create Date" :clearable="true" :enable-time-picker="true"/>
            </v-col>
          </v-row>

          <v-data-table-server @update:options="getData" density="compact" v-model:page="page" :items-length="totalItems" v-model:items-per-page="perPage" :loading="loading" :headers="headers" :items="data" class="elevation-0">

            <template v-slot:item.name="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.name }}
              </v-chip>
            </template>

            <template v-slot:item.file="{ item }">
              <v-avatar size="40" class="mr-2">
                <img :src="item.file" alt="Vehicle Logo">
              </v-avatar>
            </template>

            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status == 'active' ? 'primary' : 'error'" rounded="pill" class="mr-2 py-5">
                {{ item.status }}
              </v-chip>
            </template>
            
            <template v-slot:item.description="{ item }">
              {{ item.description.length > 150 ? item.description.slice(0, 20) + '...' : item.description }}
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
          </v-data-table-server>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Add dialog to view data -->
  <v-dialog v-model="viewDialog" max-width="800px">
    <v-card>
      <view-property-type :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-property-type @getData="getData()" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-property-type @getData="getData()" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this property type?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
