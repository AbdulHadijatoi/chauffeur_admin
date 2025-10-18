<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';

export default {
  props: {
    is_file: {
      type: Boolean,
      required: true,
    }
  },

  data() {
    return {
      loading: false,
      form: [],
      file: null,
    }
  },

  methods: {
    async saveSetting() {
      this.loading = true;
      try {
        const formData = new FormData();

        // Append all form fields
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }
        
        const responseData = await fetchWrapper.post(`${base_url}/admin/settings/create`, formData);
        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    },
    async uploadFile() {
      this.loading = true;
      try {
        const formData = new FormData();

        // Append all form fields
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }

        // Append file only if selected
        if (this.file) {
          formData.append('image', this.file);
        }

        const responseData = await fetchWrapper.post(`${base_url}/admin/settings/upload-image`, formData);
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
        <v-card-title>Create Setting Option</v-card-title>
        <v-card-text class="mt-4">
          <v-form v-if="!is_file" @submit.prevent="saveSetting">
            <v-row>

              <v-col cols="6">
                <v-text-field v-model="form.key" label="Key" required />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="form.value" label="Value" required />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading || !form.key || !form.value" color="primary" type="submit">
                  Save Setting
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-form v-else @submit.prevent="uploadFile">
            <v-row>

               <v-col cols="12">
                <v-text-field v-model="form.key" label="Key" required />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload File"
                  v-model="file"
                  accept="image/*"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn elevation="0" size="x-large" :disabled="loading || !form.key || !file" color="primary" type="submit">
                  Upload File
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
