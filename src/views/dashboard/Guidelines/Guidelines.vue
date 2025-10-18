<script>

import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import ViewGuidelines from './ViewGuidelines.vue';
import EditGuidelines from './EditGuidelines.vue';

export default {
    components: { ViewGuidelines, EditGuidelines },

    data() {
        return {
            loading: false,
            headers: [
                { title: 'Id', key: 'id', filterable: true,},
                { title: 'Type', key: 'type', filterable: true,},
                { title: 'Title', key: 'title', filterable: true,},
                { title: 'Description', key: 'description', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            selectedRow: null,
            viewDialog: false,
            editDialog: false,
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/guidelines`, { 
            });
            
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
            <v-card-title>Guidelines</v-card-title>
            <div>
            </div>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">
            
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
      <view-guidelines :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-guidelines @getData="getData()" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
</template>
