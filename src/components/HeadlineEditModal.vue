<template>
  <v-dialog v-model="open" width="500">
    <v-card>
      <v-card-title>Edit headline title</v-card-title>
      <v-card-text class="mt-2">
        <v-text-field
          v-model="newHeadlineTitle"
          label="New headline title"
          :rules="[
            () => !!newHeadlineTitle || 'This field is required',
            () =>
              (!!newHeadlineTitle && newHeadlineTitle.length < 256) ||
              'Headline must be less than 255 characters',
          ]"
          counter="255"
          outlined
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click="closeModal"> Cancel </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="editHeadlineTitle"
          :disabled="checkHeadlineLength"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "HeadlineEditModal",
  props: ["open", "onHeadlineChange", "onModalClose"],
  data: () => ({
    newHeadlineTitle: "",
  }),
  computed: {
    checkHeadlineLength() {
      return this.newHeadlineTitle.length > 255;
    },
  },
  methods: {
    editHeadlineTitle() {
      this.$emit("onHeadlineChange", this.newHeadlineTitle);
    },
    closeModal() {
      this.$emit("onModalClose");
    },
  },
};
</script>

<style></style>
