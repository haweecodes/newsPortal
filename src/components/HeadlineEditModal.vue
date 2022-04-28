<template>
  <v-dialog v-model="show" width="500">
    <v-card>
      <v-card-title>Edit headline</v-card-title>
      <v-card-text class="mt-2">
        <v-text-field
          v-model="newHeadlineTitle"
          label="New headline"
          :rules="[
            () => newHeadlineTitle.length > 0 || 'This field is required',
            () => newHeadlineTitle.length < 256 || 'Headline must be less than 255 characters',
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
  name: 'HeadlineEditModal',
  model: {
    prop: 'showModal',
    event: 'change',
  },
  props: ['showModal', 'onHeadlineChange', 'onModalClose'],
  data: () => ({
    newHeadlineTitle: '',
  }),
  computed: {
    checkHeadlineLength() {
      return this.newHeadlineTitle.length > 255 || this.newHeadlineTitle.length < 1;
    },
    show: {
      get() {
        return this.showModal;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
  methods: {
    editHeadlineTitle() {
      if (this.newHeadlineTitle.length < 1) return;
      this.$emit('onHeadlineChange', this.newHeadlineTitle);
    },
    closeModal() {
      this.$emit('onModalClose');
    },
  },
};
</script>
