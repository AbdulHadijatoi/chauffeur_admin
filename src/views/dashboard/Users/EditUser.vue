<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

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
      form: [],
    }
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/users/update/${this.form.id}`, { 
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password??null,
          password_confirmation: this.form.password??null
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

  },

  mounted() {
    this.form = { ...this.selectedRow };
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title>Edit User - {{ selectedRow.first_name }} {{ selectedRow.last_name }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row class="mt-4">

              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.first_name" 
                  label="First Name"
                  required />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.last_name" 
                  label="Last Name" />
              </v-col>
              
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.email" 
                  label="Email" />
              </v-col>
              
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.phone" 
                  label="Phone" />
              </v-col>
              
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  density="compact"
                  v-model="form.password"
                  type="password" 
                  label="Password" />
              </v-col>

              

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading" color="primary" type="submit">
                  Update
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
