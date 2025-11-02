<script>
export default {
  props: {
    review: {
      type: Object,
      required: true,
    }
  },
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card variant="flat">
        <v-card-item>
          <div class="d-sm-flex align-center justify-space-between">
            <v-card-title>Review Details</v-card-title>
          </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="p-0 m" style="background-color: white;">
            <v-col cols="12">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">User Name</span> 
                </v-col>
                <v-col cols="9">
                  <span class="mx-2">{{ review.user_name }}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">Service</span> 
                </v-col>
                <v-col cols="9">
                  <span class="mx-2">{{ review.service ? review.service.name : 'N/A' }}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">Rating</span> 
                </v-col>
                <v-col cols="9">
                  <div class="mx-2 d-flex align-center">
                    <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : 'text-grey'">★</span>
                    <span class="ml-2">{{ review.rating }}/5</span>
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">Comment</span> 
                </v-col>
                <v-col cols="9">
                  <span class="mx-2">{{ review.comment }}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">Created At</span> 
                </v-col>
                <v-col cols="9">
                  <span class="mx-2">{{ new Date(review.created_at).toLocaleString() }}</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" style="background-color: rgba(0,0,0,0.1);" v-if="review.image_url">
              <v-row variant="flat" class="rounded-0 lighten-4 d-flex align-items-center">
                <v-col cols="3">
                  <span class="bold-text">Image</span> 
                </v-col>
                <v-col cols="9">
                  <img :src="review.image_url" alt="Review Image" style="max-width: 200px; max-height: 200px;" class="rounded">
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

