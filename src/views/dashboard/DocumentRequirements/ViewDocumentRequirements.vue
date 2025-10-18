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
            <v-card-title>Document Requirement #{{selectedRow.id}} {{ selectedRow.is_file?'(requires FILE value)':'(requires TEXT value)' }}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">
            
            <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Document Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.document_name}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Service Type</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.service_type_name}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Property Type</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.property_type_name}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created Date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_date}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created Time</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_time}}</span>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

