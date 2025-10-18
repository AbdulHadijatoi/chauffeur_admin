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
            <v-card-title>{{selectedRow.name}} #{{selectedRow.id}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Service Title</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.name}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Services Category Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.services_category_name}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Vehicle Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.vehicle_name}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Hour Duration</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.hour_duration}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Price per {{ selectedRow.hour_duration }} hour</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.price}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Additional hour Price</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.additional_price}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Service Description</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{selectedRow.description}}</span>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

