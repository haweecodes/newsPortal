<template>
  <section v-if="!loading">
    <slot name="content" />
  </section>
  <section v-else class="d-flex justify-center align-center" >
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <!-- <v-row>
      <v-col v-for="i in 10" :key="i" cols="3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->
  </section>
</template>

<script>
export default {
  name: 'LoaderWrapper',
  props: ['loading'],
};
</script>

<style></style>
