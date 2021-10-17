<template>
  <div class="radio-button-selector-group btn-group">
    <template v-for="option in options">
      <input type="radio" class="btn-check"
             :name="`${id}Selection`"
             :id="getOptionId(option)"
             :value="option.id"
             v-model="selectedOptionId"
             autocomplete="off">
      <label class="btn btn-outline-primary"
             :for="getOptionId(option)"
             v-html="option.content"
             :title="option.title">
      </label>
    </template>
  </div>
</template>

<script>
  export default {
    name: "RadioButtonSelector",
    props: {
      id: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        selectedOptionId: null,
      }
    },
    watch: {
      selectedOptionId() {
        this.notifyOptionChanged();
      }
    },
    methods: {
      getOptionId(option) {
        return `${this.id}_${option.id}`;
      },
      notifyOptionChanged() {
        /**
         * Change event that is emitted whenever the selection is changed.
         * @event change
         * @property {Object[]} new set option.
         */
        this.$emit('change', { newValue: this.selectedOptionId });
      },
    }
  }
</script>

<style scoped>
  .radio-button-selector-group{
    width: 100%;
  }
</style>