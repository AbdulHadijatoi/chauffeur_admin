<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card elevation="0">
        <v-card-title class="d-flex justify-between">
          <span>
            Edit - {{ selectedRow.type }}
          </span>
          <v-spacer></v-spacer>
          <v-btn elevation="0" :disabled="loading" color="primary" @click="updateData">
            Save
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.title" label="Title" required />
              </v-col>

              <v-col cols="12">
                <quill-editor
                  v-model:content="form.description"
                  content-type="html"
                  theme="snow"
                  style="height: 300px;"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { base_url } from '@/utils/config';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { successMessage } from '@/utils/helpers/messages';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: { QuillEditor },

  props: {
    selectedRow: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      form: {
        id: null,
        title: '',
        description: '',
      },
      file: null,
    };
  },

  mounted() {
    this.form.id = this.selectedRow.id || null;
    this.form.title = this.selectedRow.title || '';
    this.form.description = this.selectedRow.description || '';
  },

  methods: {
    async updateData() {
      this.loading = true;
      try {
        const payload = {
          id: this.form.id,
          title: this.form.title,
          description: this.form.description, // this will be HTML
        };

        console.log('Sending to backend:', payload); // Optional: for debug

        const responseData = await fetchWrapper.post(
          `${base_url}/admin/guidelines/update/${this.form.id}`,
          payload
        );

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
};
</script>
