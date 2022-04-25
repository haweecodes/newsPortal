<template>
  <section>
    <v-container fluid>
      <SearchAndFilter />

      <HeadlineEditModal
        v-if="showModal"
        :open="showModal"
        @onHeadlineChange="onHeadlineChange"
        @onModalClose="toogleModal"
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

      <HistoryDrawer v-if="drawer" :drawer="drawer" />

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
        <v-btn fab dark small color="indigo" @click.stop="toggleDrawer">
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
import HeadlineBox from '@/components/HeadlineBox.vue';
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import HeadlineEditModal from '@/components/HeadlineEditModal.vue';
import LoaderWrapper from '@/components/LoaderWrapper.vue';
import HistoryDrawer from '@/components/HistoryDrawer.vue';
import { setHistoryToLocalStorage } from '@/utils/helper';

export default {
  name: 'Home',
  components: {
    HeadlineBox,
    SearchAndFilter,
    HeadlineEditModal,
    LoaderWrapper,
    HistoryDrawer,
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
      this.toogleModal();
    },
    async onHeadlineChange(title) {
      this.$store.commit('editViewHeadline', {
        title,
        index: this.editableHeadlineIndex,
      });
      this.toogleModal();
    },
    toogleModal() {
      this.showModal = !this.showModal;
    },

    async showError() {
      const response = await this.$store.dispatch('wrongApiCall');
      this.alertModalConfig(response);
    },

    alertModalConfig(message) {
      this.showAlert = true;
      this.errorMessage = message;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
