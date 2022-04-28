<template>
  <article v-once>
    <v-btn @click="returnToHome" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <h1 class="text-center ma-5">{{ getHeadlineDetail.title }}</h1>
    <p class="text-center ma-5">
      <strong>Written By:{{ getHeadlineDetail.author }}</strong>
    </p>
    <p class="text-center ma-5">
      <strong>Published At: {{ getHeadlineDetail.publishedAt | transformDate }}</strong>
    </p>

    <v-img
      :alt="getHeadlineDetail.title"
      aspect-ratio="3"
      contain
      :src="getHeadlineDetail.urlToImage"
    ></v-img>

    <p class="ma-5">{{ getHeadlineDetail.content }}</p>
  </article>
</template>

<script>
export default {
  name: 'Detail',
  computed: {
    getHeadlineDetail() {
      return this.$store.state.headlineDetail;
    },
  },
  methods: {
    returnToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>
