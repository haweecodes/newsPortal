<template>
  <v-navigation-drawer v-model="show" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>History</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense v-if="historyList.length > 0">
      <v-list-item v-for="history in historyList" :key="`${history.time}`">
        <v-list-item-content>
          <v-list-item-subtitle>{{ history.time | transformDate }}</v-list-item-subtitle>
          <v-list-item-title>{{ history.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <p v-else>No history to show</p>
  </v-navigation-drawer>
</template>

<script>
import { getHistoryFromLocalStorage } from '../utils/helper';

export default {
  name: 'HistoryDrawer',
  model: {
    prop: 'drawer',
    event: 'change',
  },
  props: ['drawer'],
  data: () => ({
    historyList: [],
  }),
  computed: {
    show: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
  beforeMount() {
    this.historyList = getHistoryFromLocalStorage();
  },
};
</script>

<style></style>
