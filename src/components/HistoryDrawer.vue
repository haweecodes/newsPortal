<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>History</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="history in historyList" :key="`${history.time}`">
        <v-list-item-content>
          <v-list-item-subtitle>{{
            history.time | transformDate
          }}</v-list-item-subtitle>
          <v-list-item-title>{{ history.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { getHistoryFromLocalStorage } from '../utils/helper';

export default {
  name: 'HistoryDrawer',
  props: ['drawer'],
  data: () => ({
    historyList: [],
  }),
  beforeMount() {
    this.historyList = getHistoryFromLocalStorage();
  },
};
</script>

<style></style>
