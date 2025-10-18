<script>

import axios from 'axios';
import { base_url,domain } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';

export default {
    props: {
        selectedRow: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            loading: false,
            data: [],
        }
    },

    methods: {
      //
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
      //
    },
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Payment Reference: {{selectedRow.payment_reference}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">ID#</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.id}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Payment Method</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.payment_method}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Valuation Request ID</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.valuation_request_id}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Amount</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.amount}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Status</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.status}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Payment Reference</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.payment_reference}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">User</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.user}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Thawani Payment ID</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.thawani_payment_id}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Thawani Session ID</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.thawani_session_id}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created Date Time</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at}}</span>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

