<template>
  <section class="h-100">
    <v-container fluid class="h-100">
      <SearchAndFilter />

      <HeadlineEditModal
        v-if="showModal"
        v-model="showModal"
        @onHeadlineChange="onHeadlineChange"
        @onModalClose="toogleFunction('showModal')"
      />

      <LoaderWrapper :loading="getLoadingState">
        <template v-slot:content>
          <v-row v-if="getHeadlineList.length > 0" row wrap>
            <v-col
              lg="3"
              md="6"
              sm="6"
              xs="12"
              v-for="(headline, index) in getHeadlineList"
              :key="headline.url"
            >
              <HeadlineBox>
                <template v-slot:HeadlineTitle>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="editHeadline(headline, index)"
                        v-bind="attrs"
                        v-on="on"
                        color="primary"
                        fab
                        small
                        absolute
                        top
                        right
                        ><v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit headline</span>
                  </v-tooltip>

                  <!-- <v-btn text @click="redirectToDetailPage(headline)"> -->
                  <p @click="redirectToDetailPage(headline)" class="link">
                    {{ headline.title }}
                  </p>
                  <!-- </v-btn> -->
                </template>
                <template v-slot:HeadlineContent>
                  {{ headline.description }}
                  <span
                    @click="redirectToOriginalPage(headline)"
                    class="link read-more"
                    >Read more...</span
                  >
                </template>
              </HeadlineBox>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p class="text-center">No data found</p>
            </v-col>
          </v-row>
        </template>
      </LoaderWrapper>

      <HistoryDrawer v-if="drawer" v-model="drawer" />

      <v-speed-dial
        fixed
        bottom
        right
        open-on-hover
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn color="blue darken-2" dark fab>
            <v-icon> mdi-apps </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="indigo" @click.stop="toogleFunction('drawer')">
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-btn fab dark small color="red" @click="showError"> 404 </v-btn>
      </v-speed-dial>

      <v-snackbar
        v-model="showAlert"
        :timeout="-1"
        :value="true"
        absolute
        centered
        right
        top
        tile
        color="red accent-2"
      >
        {{ errorMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="showAlert = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </section>
</template>

<script>

import { setHistoryToLocalStorage } from '@/utils/helper';

export default {
  name: 'Home',
  components: {
    HeadlineBox: () => import(/* webpackPrefetch: true */'@/components/HeadlineBox.vue'),
    SearchAndFilter: () => import(/* webpackPrefetch: true */'@/components/SearchAndFilter.vue'),
    HeadlineEditModal: () => import(/* webpackPrefetch: true */ '@/components/HeadlineEditModal.vue'),
    LoaderWrapper: () => import(/* webpackPrefetch: true */'@/components/LoaderWrapper.vue'),
    HistoryDrawer: () => import(/* webpackPrefetch: true */'@/components/HistoryDrawer.vue'),
  },
  data: () => ({
    loading: true,
    showModal: false,
    currentHeadline: '',
    editedHeadline: '',
    editableHeadlineIndex: null,
    errorMessage: '',
    showAlert: '',
    drawer: false,
    historyList: [],
  }),
  computed: {
    getLoadingState() {
      return this.$store.state.loading;
    },
    getHeadlineList() {
      const { sourceFilter } = this.$store.state;
      return this.$store.state.newsHeadlineList.filter((headline) => {
        if (sourceFilter) return headline.source.id === sourceFilter;

        return headline;
      });
    },
  },
  beforeMount() {
    if (this.$store.state.newsHeadlineList.length < 1) {
      this.$store.commit('setLoadingState', true);
      this.$store.dispatch('fetchHeadlineList');
    }
  },
  methods: {
    redirectToDetailPage(headline) {
      this.$store.commit('setViewHeadlineDetail', headline);
      this.$router.push('/detail');
      setHistoryToLocalStorage(headline);
    },
    redirectToOriginalPage(headline) {
      setHistoryToLocalStorage(headline);
      window.open(headline.url, '_blank');
    },
    editHeadline(headline, index) {
      this.editableHeadlineIndex = index;
      this.currentHeadline = headline.title;
      this.toogleFunction('showModal');
    },
    async onHeadlineChange(title) {
      this.$store.commit('editViewHeadline', {
        title,
        index: this.editableHeadlineIndex,
      });
      this.toogleFunction('showModal');
    },

    toogleFunction(toggle) {
      this[toggle] = !this[toggle];
    },
    async showError() {
      const response = await this.$store.dispatch('wrongApiCall');
      this.alertModalConfig(response);
    },
    alertModalConfig(message) {
      this.showAlert = true;
      this.errorMessage = message;
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}
.read-more {
  color: blue;
}
</style>
