<script>

import axios from 'axios';
import { base_url,domain } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useAuthStore } from '@/stores/auth';

export default {
    props: {
        vehicle: {
            type: Object,
            required: true,
        }
    },
    components: { VueDatePicker },

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
            <v-card-title>{{vehicle.name}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">
            <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Vehicle Name</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{vehicle.name}}</span>
                </v-col>
              </v-row>
            </v-col>

          
            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Description</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{vehicle.description}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" >
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Passengers</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.passengers}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Luggage</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.luggage}}</span>
                </v-col>
              </v-row>
            </v-col>

            



          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

