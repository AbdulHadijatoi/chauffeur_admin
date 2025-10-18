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

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Mileage</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.mileage}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Transmission</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.transmission}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Steering</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.steering}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Fuel Type</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.fuel_type}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Engine</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.engine}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Power</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.power}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Torque</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.torque}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Acceleration</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.acceleration}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Top Speed</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.top_speed}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Fuel Capacity</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.fuel_capacity}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Weight</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.weight}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Length</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.length}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Width</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.width}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Height</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.height}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Wheelbase</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.wheelbase}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Ground Clearance</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.ground_clearance}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Turning Radius</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.turning_radius}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Boot Space</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.boot_space}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Air Conditioning</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.air_conditioning}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Infotainment</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.infotainment}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Safety Features</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.safety_features}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Comfort Features</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{vehicle.comfort_features}}</span>
                </v-col>
              </v-row>
            </v-col>



          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

