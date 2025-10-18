<script>

import '@vuepic/vue-datepicker/dist/main.css';

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
            <v-card-title>Banner Ad - #{{selectedRow.id}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Title</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.title}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Ad Type</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.ad_type}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Start Date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.start_date}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">End Date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.end_date}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created at Date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_date}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created at Time</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_time}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Image URL</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{selectedRow.image_url}}</span>
                </v-col>
              </v-row>
            </v-col>

            <!-- <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Target Link</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{selectedRow.link}}</span>
                </v-col>
              </v-row>
            </v-col> -->

            <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Description</span> 
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

