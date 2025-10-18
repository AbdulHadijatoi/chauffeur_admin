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
      file: null,
    }
  },

  methods: {
    async updateData() {
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

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/services-categories/update/${this.form.id}`,
          formData
        );

        successMessage(responseData.message);
        this.$emit('close');
        this.$emit('getData');
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        this.loading = false;
      }
    }

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
        <v-card-title>Edit Service Type - {{ selectedRow.name }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateData">
            <v-row>

              <v-col cols="12">
                <v-text-field v-model="form.name" label="Name" required />
              </v-col>
              
              <v-col cols="12">
                <v-text-field v-model="form.description" label="Description" required />
              </v-col>

              <v-col cols="12">
                <v-file-input
                  variant="outlined"
                  density="compact"
                  label="Upload File"
                  v-model="file"
                  accept="image/*"
                />
                <div class="mt-2">
                  <a :href="form.image_url" target="_blank" v-if="form.image_url">
                    <img
                      :src="form.image_url"
                      alt="Setting File"
                      class="rounded"
                      style="max-width: 100px; max-height: 100px;"
                    />
                  </a>
                </div>
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
