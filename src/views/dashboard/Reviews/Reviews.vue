<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { EditIcon, PlusIcon, TrashIcon, EyeIcon, SearchIcon } from 'vue-tabler-icons';
import ViewReview from './ViewReviews.vue';
import EditReview from './EditReviews.vue';
import CreateReview from './CreateReviews.vue';
import { successMessage } from '@/utils/helpers/messages';

export default {
    components: { VueDatePicker, ViewReview, EditReview, CreateReview },

    data() {
        return {
            loading: false,
            totalItems: 0,
            headers: [
                { title: 'User Name', key: 'user_name', filterable: true,},
                { title: 'Service', key: 'service', filterable: true,},
                { title: 'Rating', key: 'rating', filterable: true,},
                { title: 'Comment', key: 'comment', filterable: true,},
                { title: 'Created At', key: 'created_at', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            perPage: 15,
            page: 1,
            search: null,
            selectedRow: null,
            createDialog: false,
            viewDialog: false,
            editDialog: false,
            deleteDialog: false,
            services: [], // For service filter dropdown
            ratingFilter: null,
            serviceFilter: null,
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/reviews`, { 
              per_page: this.perPage,
              page: this.page,
              search: this.search,
              rating: this.ratingFilter,
              service_id: this.serviceFilter,
            });
            
            if (responseData && responseData.data) {
              // Handle paginated response
              if (Array.isArray(responseData.data)) {
                this.data = responseData.data;
                this.totalItems = responseData.meta?.total || responseData.data.length;
              } else if (responseData.data.data) {
                // If data is nested
                this.data = responseData.data.data;
                this.totalItems = responseData.data.meta?.total || responseData.data.data.length;
              }
            }
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            this.loading = false;
          }
        },
        async getServices() {
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/services`, { 
              perPage: 100,
            });
            
            if (responseData && responseData.data) {
              this.services = responseData.data.services || [];
            }
          } catch (error) {
            console.error("Error fetching services:", error);
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
            const responseData = await fetchWrapper.post(`${base_url}/admin/reviews/delete/${this.selectedRow.id}`, { });
            successMessage(responseData.message);
            this.deleteDialog = false;
            this.getData();
          } catch (error) {
            console.error("Error during fetch:", error);
          } finally {
            this.loading = false;
          }
        },
    },
    mounted() {
      this.getServices();
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Reviews</v-card-title>
            <div>
              <v-btn color="accent" @click="create()"><PlusIcon size="20" class="mr-2"/>Add New Review</v-btn>
            </div>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row>
            <v-col cols="12" md="3">
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
            
            <v-col cols="12" md="3">
              <v-select
                v-model="ratingFilter"
                label="Filter by Rating"
                variant="outlined"
                density="compact"
                :items="[1, 2, 3, 4, 5]"
                clearable
                @update:model-value="getData"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-model="serviceFilter"
                label="Filter by Service"
                variant="outlined"
                density="compact"
                :items="services"
                item-title="name"
                item-value="id"
                clearable
                @update:model-value="getData"
              ></v-select>
            </v-col>
          </v-row>

          <v-data-table-server @update:options="getData" density="compact" v-model:page="page" :items-length="totalItems" v-model:items-per-page="perPage" :loading="loading" :headers="headers" :items="data" class="elevation-0">

            <template v-slot:item.service="{ item }">
              <span v-if="item.service">{{ item.service.name }}</span>
              <span v-else class="text-grey">N/A</span>
            </template>

            <template v-slot:item.rating="{ item }">
              <div class="d-flex align-center">
                <span v-for="i in 5" :key="i" :class="i <= item.rating ? 'text-yellow-400' : 'text-grey'">★</span>
                <span class="ml-2">{{ item.rating }}</span>
              </div>
            </template>

            <template v-slot:item.comment="{ item }">
              <span class="text-truncate" style="max-width: 200px; display: inline-block;">{{ item.comment }}</span>
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ new Date(item.created_at).toLocaleDateString() }}
            </template>
            
            <template v-slot:item.actions="{ item }">
              <div class="d-flex align-center">
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="primary" rounded="pill" class="mr-2 py-5" v-bind="props" @click="view(item)">
                      <EyeIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>View</span>
                </v-tooltip>
                
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="info" rounded="pill" class="mr-2 py-5" v-bind="props" @click="edit(item)">
                      <EditIcon size="20"/>
                    </v-chip>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                
                <v-tooltip location="start">
                  <template #activator="{ props }">
                    <v-chip color="accent" rounded="pill" class="mr-2 py-5" v-bind="props" @click="deleteRow(item)">
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
      <view-review :review="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to update data -->
  <v-dialog v-model="editDialog" max-width="800px">
    <v-card>
      <edit-review @getData="getData()" :selectedRow="selectedRow" @close="editDialog = false"/>
    </v-card>
  </v-dialog>
  
  <!-- Add dialog to create data -->
  <v-dialog v-model="createDialog" max-width="800px">
    <v-card>
      <create-review @getData="getData()" @close="createDialog = false"/>
    </v-card>
  </v-dialog>

  <!-- add delete confirmation dialog -->
  <v-dialog v-model="deleteDialog" max-width="600px">
    <v-card>
      <v-card-title class="headline">Are you sure you want to delete this review?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="deleteData()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

