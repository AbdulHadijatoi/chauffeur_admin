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
            <v-card-title>{{selectedRow.type}}</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>

          <v-row class="p-0 m" style="background-color: white;">
            
            <v-col cols="12">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="12">
                  <span class="mx-2">Title: {{selectedRow.title}}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="12">
                  <div class="mx-2" v-html="selectedRow.description"></div>
                </v-col>
              </v-row>
            </v-col>


          </v-row>
          
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  
</template>

