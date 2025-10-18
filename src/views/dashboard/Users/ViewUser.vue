<script>

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
            <v-card-title>User - {{selectedRow.first_name}} {{selectedRow.last_name}}</v-card-title>
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
                  <span class="bold-text">First Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.first_name}}</span>
                </v-col>
              </v-row>
            </v-col>
            
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Last Name</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.last_name}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Email</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.email}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row variant="flat"  class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="4">
                  <span class="bold-text">Phone</span> 
                </v-col>
                <v-col cols="8">
                  <span class="mx-2">{{selectedRow.phone}}</span>
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
            <v-col cols="6" style="background-color: rgba(0,0,0,0.1);">
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

