<template>
  <v-card width="100%" height="100%">
    <v-card-title>
      <slot name="HeadlineTitle"></slot>
    </v-card-title>
    <v-card-text>
      <slot name="HeadlineContent"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="HeadlineAction"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "HeadlineBox",
};
</script>

<style></style>
