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
      /**
       * ID of the selector. Must be globally unique.
       */
      id: {
        type: String,
        required: true,
      },
      /**
       * List of available options.
       */
      options: {
        type: Array,
        required: true,
      },
      /**
       * Id of the option that should be selected initially.
       * Accepts external updates.
       */
      initialSelectedOptionId: {
        type: String,
        required: false,
        default: null,
      }
    },
    data() {
      return {
        selectedOptionId: this.initialSelectedOptionId,
      }
    },
    watch: {
      initialSelectedOptionId() {
        this.selectedOptionId = this.initialSelectedOptionId;
      },
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
         * @property {Object} new set option.
         */
        this.$emit('change', { newValue: this.selectedOptionId });
      },
    }
  }
</script>

<style scoped>
  .radio-button-selector-group {
    width: 100%;
  }
</style>