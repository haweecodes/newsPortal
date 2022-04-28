<template>
  <v-row class="ma-2" wrap>
    <v-col md="4" sm="8" xs="12" offset-md="6" offset-sm="0">
      <v-text-field
        placeholder="Press enter to search..."
        outlined
        hide-details
        clearable
        @click:clear="clearHeadlineSearch"
        v-model="searchText"
        @keyup="headlineSearch"
      ></v-text-field
    ></v-col>
    <v-col md="2" sm="4" xs="12" class="d-flex justify-end align-center">
      <v-select
        return-object
        outlined
        hide-details
        clearable
        :items="getSourceList"
        item-text="name"
        placeholder="Search by source"
        @change="setFilterSource"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { throttleFunction } from '../utils/helper';

export default {
  name: 'SearchAndFilter',
  data: () => ({
    searchText: '',
  }),
  computed: {
    getSourceList() {
      return this.$store.state.sourceList;
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchSourceList');
  },

  methods: {
    headlineSearch() {
      if (this.searchText !== '' && this.searchText !== null) {
        throttleFunction(this.callSearchApi, 600);
      }
    },
    callSearchApi() {
      this.$store.dispatch('fetchSearchedHeadline', this.searchText);
    },
    clearHeadlineSearch() {
      this.$store.dispatch('fetchHeadlineList');
    },
    setFilterSource(value) {
      this.$store.commit('setFilterSource', (value && value.id) || null);
    },
  },
};
</script>
