<template>
  <form class="container create-formula-form">
    <h3>Create Formula</h3>
    <div v-show="errors">
      <ul class="form-errors">
        <li  v-for="error in errors">
          {{ error }}
        </li>
      </ul>

    </div>
    <div class="mb-3 row">
      <div class="form-group">
        <input class="form-control"
               type="text"
               placeholder="Makes"
               list="vehicleMakes"
               v-model="selectedMake">
        <datalist id="vehicleMakes">
        </datalist>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="form-group">
        <div v-show="!isModelsLoading">
          <input class="form-control"
                 type="text"
                 placeholder="Models"
                 list="vehicleModels"
                 v-model="selectedModel">
          <datalist id="vehicleModels">
          </datalist>
        </div>
        <Loader v-show="isModelsLoading"></Loader>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="col-5 btn-group">
        <RadioButtonSelector
          id="yearComparisonTypeSelector"
          :options="yearComparisonTypeOptions"
          :initial-selected-option-id="selectedYearComparisonType"
          @change="selectedYearComparisonType = $event.newValue"
        ></RadioButtonSelector>
      </div>
      <div class="col-7 form-check">
        <input type="text"
               class="form-control"
               id="yearSelector"
               v-model="selectedYear"
               placeholder="Model year">
      </div>
    </div>
    <div class="mb-3 row">
      <RadioButtonSelector
        id="fuelTypeSelector"
        :options="fuelTypeOptions"
        :initial-selected-option-id="selectedFuelType"
        @change="selectedFuelType = $event.newValue"
      ></RadioButtonSelector>
    </div>
    <div class="mb-3 row">
      <RadioButtonSelector
        id="riskTypeSelector"
        :options="riskTypeOptions"
        :initial-selected-option-id="selectedRisk"
        @change="selectedRisk = $event.newValue"
      ></RadioButtonSelector>
    </div>
    <div class="d-grid gap-2">
      <button type="submit"
              class="btn btn-primary"
              @click="create">Submit
      </button>
    </div>

    <div>
      {{ selectedMake }}<br>
      {{ selectedModel }} <br>
      {{ selectedYear }} <br>
      {{ selectedYearComparisonType }} <br>
      {{ selectedFuelType }} <br>
      {{ selectedRisk }} <br>
    </div>
  </form>
</template>

<script>
  import { formulaStore } from '@modules/formula_store';
  import NHTSAStore from '@modules/nhtsa_store';
  import Loader from '@components/Loader.vue';
  import RadioButtonSelector from '@components/RadioButtonSelector.vue';

  const nhtsaStore = new NHTSAStore();
  export default {
    name: 'CreateFormula',
    components: { Loader, RadioButtonSelector },
    data() {
      return {
        isModelsLoading: false,
        selectedMake: null,
        selectedModel: null,
        selectedYear: null,
        selectedYearComparisonType: null,
        selectedFuelType: null,
        selectedRisk: null,
        fuelTypeOptions: [
          { id: 'diesel', content: 'Diesel' },
          { id: 'petrol', content: 'Petrol' },
          { id: 'electric', content: 'Electric' },
        ],
        yearComparisonTypeOptions: [
          {
            id: 'earlier',
            content: '<span class="fa fa-chevron-left"></span>',
            title: 'Earlier than'
          },
          {
            id: 'equal',
            content: '<span class="fa fa-equals"></span>',
            title: 'Equal to'
          },
          {
            id: 'later',
            content: '<span class="fa fa-chevron-right"></span>',
            title: 'Later than'
          },
        ],
        riskTypeOptions: [
          {
            id: 'low',
            content: 'Low',
            title: 'Low risk'
          },
          {
            id: 'medium',
            content: 'Medium',
            title: 'Medium risk'
          },
          {
            id: 'high',
            content: 'High',
            title: 'High risk'
          },
        ],
        errors: [],
      }
    },
    watch: {
      selectedMake() {
        if (this.selectedMake) {
          this.isModelsLoading = true;
          const selectedMake = this.availableMakes[this.selectedMake];
          if (selectedMake === undefined) {
            this.isModelsLoading = false;
            return [];
          }
          nhtsaStore.getModelsForMakeId(selectedMake.Make_ID).then((models) => {
            const availableModels = {};
            models?.forEach((model) => {
              availableModels[model.Model_Name] = model;
            });
            this.availableModels = availableModels;
            this.updateDataList('vehicleModels',
              Object.values(availableModels),
              (item) => item.Model_Name
            );
            this.isModelsLoading = false;
          });
        }
        return [];
      }
    },
    methods: {
      /**Saves datalist selection in a given vue data property.
       * @param e {Event} Input change event.
       * @param targetProperty {String} Name of the vue data property that will store the new
       * selected value.
       */
      saveDatalistSelection(e, targetProperty) {
        let val = e.target.value;
        this[targetProperty] = val;
      },
      validate() {
        this.errors = [];
        if (!(this.selectedMake ||
          this.selectedModel ||
          (this.selectedYear && this.selectedYearComparisonType)
          || this.selectedFuelType)
        ) {
          this.errors.push(`At least one of the following must be specified:
          make, model, year, fuel`);
        }
        if (this.selectedMake && this.availableMakes[this.selectedMake] === undefined) {
          this.errors.push('Vehicle make should be one of the available options.');
        }
        if (this.selectedModel && this.availableModels[this.selectedModel] === undefined) {
          this.errors.push('Vehicle model should be one of the available options.')
        }
        if (!this.selectedRisk){
          this.errors.push('The risk has to be specified.')
        }
        return (this.errors.length === 0);
      },
      create(e) {
        if (this.validate()) {
          const createdFormula = formulaStore.post(this.selectedMake,
            this.selectedModel,
            this.selectedYearComparisonType,
            this.selectedYear,
            this.selectedFuelType,
            this.selectedRisk
          );
          this.resetForm();
          this.notifyFormulaCreated(createdFormula);
        }
        e.preventDefault();
      },
      notifyFormulaCreated(createdFormula) {
        /**
         * Change event that is emitted whenever the selection is changed.
         * @event change
         * @property {Object[]} new set option.
         */
        this.$emit('formulaCreated', { formula: createdFormula });
      },
      resetForm() {
        this.selectedMake = null;
        this.selectedModel = null;
        this.selectedYear = null;
        this.selectedYearComparisonType = null;
        this.selectedRisk = null;
        this.selectedFuelType = null;
      },
      /**
       * Updated a datalist HTML element with a given with the given content.
       * Do to low performance when using Vue bindings for a datalist with a lot of options,
       * this workaround is needed.
       * @param datalistId{String} ID of the HTML datalist to update.
       * @param list{Array} Array of items to be used as the new content.
       * @param valueExtractor{CallableFunction} Function that defines how to extract the value
       * of each element in the provided list. This value is used as the option value.
       * */
      updateDataList(datalistId, list, valueExtractor) {
        var datalistElement = document.getElementById(datalistId);
        var datalistString = '';
        for (let i = 0; i < list.length; i++) {
          const value = valueExtractor(list[i]);
          datalistString += `<option value="${value}">${value}</option>`;
        }
        datalistElement.innerHTML = datalistString;
      }
    },
    created() {
      nhtsaStore.getAllMakes().then((makes) => {
        const availableMakes = {};
        makes.forEach((make) => {
          availableMakes[make.Make_Name] = make;
        });
        this.availableMakes = availableMakes;
        const availableMakeValues = Object.values(availableMakes);
        this.updateDataList('vehicleMakes',
          availableMakeValues,
          (item) => item.Make_Name
        );
      });
    }
  }
</script>

<style>
  .form-errors{
    color: red;
  }
</style>