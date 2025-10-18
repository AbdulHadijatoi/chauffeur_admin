<script>

import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import ViewPayment from './ViewPayment.vue';

export default {
    components: { ViewPayment},

    data() {
        return {
            loading: false,
            headers: [
                { title: '#', key: 'index', filterable: true,},
                { title: 'ID', key: 'id', filterable: true,},
                { title: 'Payment Method', key: 'payment_method', filterable: true,},
                { title: 'Valuation Request ID', key: 'valuation_request_id', filterable: true,},
                { title: 'Amount', key: 'amount', filterable: true,},
                { title: 'Status', key: 'status', filterable: true,},
                { title: 'Payment Reference', key: 'payment_reference', filterable: true,},
                { title: 'User', key: 'user', filterable: true,},
                { title: 'Thawani Payment ID', key: 'thawani_payment_id', filterable: true,},
                { title: 'Thawani Session ID', key: 'thawani_session_id', filterable: true,},
                { title: 'Created Date Time', key: 'created_at', filterable: true,},
                { title: 'Action', key: 'actions', filterable: false, },
            ],
            data: [],
            selectedRow: null,
            createDialog: false,
            viewDialog: false,
        }
    },

    methods: {
        async getData() {
          this.loading = true;
          try {
            const responseData = await fetchWrapper.post(`${base_url}/admin/payments`, { });
            
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
            <v-card-title>Payments History</v-card-title>
            <div>
            </div>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-data-table density="compact" :loading="loading" :headers="headers" :items="data" class="elevation-0">

            <template v-slot:item.key="{ item }">
              <v-chip color="primary" variant="outlined" rounded="pill" class="mr-2">
                {{ item.key }}
              </v-chip>
            </template>

            <template v-slot:item.value="{ item }">
              <a v-if="item.is_file" style="text-decoration:none; color: darkblue; font-style:italic" :href="item.value" target="_blank" rel="noopener noreferrer">
                <v-avatar size="40" class="mr-2">
                  <img :src="item.value" :alt="item.key">
                </v-avatar>
              </a>
              <span v-else>{{item.value}}</span>
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
      <view-payment :selectedRow="selectedRow" @close="viewDialog = false"  />
      <v-card-actions>
        <v-btn color="primary" @click="viewDialog = false">Dismiss</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
</template>
