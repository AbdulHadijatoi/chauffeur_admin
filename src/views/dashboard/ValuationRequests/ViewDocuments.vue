<script>
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper'
import { base_url } from '@/utils/config';

export default {
  props: {
    selectedRow: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      documents: []
    }
  },

  methods: {
    async fetchDocuments() {
      this.loading = true
      try {
        const responseData = await fetchWrapper.post(`${base_url}/admin/valuation-requests/view-documents`,{
          valuation_request_id: this.selectedRow.id
        });

        if (responseData?.status) {
          this.documents = responseData.data
        }
        console.log('Documents fetched:', responseData.data);
      } catch (err) {
        console.error('Error fetching documents', err)
        this.documents = [];
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    this.fetchDocuments()

  }
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat">
        <v-card-title>Documents for Valuation Request #{{ selectedRow.id }}</v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-alert v-if="loading" type="info" variant="outlined">
            Loading documents...
          </v-alert>

          <v-alert v-else-if="!documents.length" type="warning" variant="outlined">
            No documents found.
          </v-alert>

          <v-row v-else dense>
            <v-col cols="6" v-for="doc in documents" :key="doc.id">
              <v-btn v-if="doc.is_file" elevation="0" size="x-large" :href="doc.full_path" download>
                <DownloadIcon size="20"/> {{ doc.document_name }}
              </v-btn>
              <v-text-field v-else
                  v-model="doc.text_value"
                  :label="doc.document_name"
                  density="compact"
                  readonly
                />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-list-item {
  border: 1px solid #eee;
  border-radius: 8px;
  transition: background 0.2s;
}
.v-list-item:hover {
  background: #f9f9f9;
}
</style>
