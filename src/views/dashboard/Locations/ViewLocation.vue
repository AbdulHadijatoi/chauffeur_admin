<script>

export default {
    props: {
        selectedRow: {
            type: Object,
            required: true,
        }
    },

    data() {
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
            <v-card-title>Location - #{{selectedRow.id}}</v-card-title>
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
                  <span class="bold-text">Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.name}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Description</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.description}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Latitude</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.latitude}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Longitude</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.longitude}}</span>
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

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created at date</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_date}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Created at time</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.created_at_time}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="2">
                  <span class="bold-text">Map URL</span> 
                </v-col>
                <v-col cols="10">
                  <span class="mx-2">{{selectedRow.map_url}}</span>
                </v-col>
              </v-row>
            </v-col>

          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

