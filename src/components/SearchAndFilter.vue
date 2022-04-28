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
      <v-menu offset-y max-height="400">
        <template v-slot:activator="{ on, attrs }">
          <v-btn width="auto" color="primary" dark v-bind="attrs" v-on="on">
            Filter
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="source in getSourceList"
            :key="source.id"
            @click.stop="setFilterSource(source.id)"
          >
            <v-list-item-title>{{ source.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn width="auto" class="ml-2" @click.stop="setFilterSource(null)">Reset</v-btn>
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
      this.$store.commit('setFilterSource', value);
    },
  },
};
</script>
