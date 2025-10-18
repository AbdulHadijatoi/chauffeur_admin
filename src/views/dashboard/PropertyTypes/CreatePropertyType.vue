<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  
  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async saveData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/property-types/create`, { 
          ...this.form,
          file: this.file
        });
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },

    handleFileUpload(e) {
      this.file = e.target.files[0];
    }
  },

  mounted() {
    //
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Create Property Type</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveData">
            <v-row>
              

              <v-col cols="12">
                <v-text-field v-model="form.name" label="Name" required />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn :disabled="loading" color="primary" type="submit">
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
