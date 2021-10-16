<template>
  <form class="container col-5 create-formula-form">
    <div class="mb-3 row">
      <div class="form-group">
        <select class="form-select"
                v-model="selectedMake">
          <option v-for="make in availableMakes"
                  v-bind:value="make.Make_ID">
            {{ make.Make_Name }}
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="form-group">
        <select class="form-select"
                v-if="!isModelsLoading"
                v-model="selectedModel">
          <option v-for="model in availableModels"
                  :key="`modelOption_${model.Model_ID}`"
                  v-bind:value="model.Model_ID">
            {{ model.Model_Name }}
          </option>
        </select>
        <Loader v-else></Loader>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="btn-group">
        <RadioButtonSelector
          id="yearComparisonTypeSelector"
          :options="yearComparisonTypeOptions"
          @change="selectedYearComparisonType = $event.newValue"
        ></RadioButtonSelector>
      </div>
    </div>
    <div class="mb-3 row">
      <div class="form-check">
        <!--        <label for="yearSelector" class="form-label">-->
        <!--          Year-->
        <!--        </label>-->
        <input type="email"
               class="form-control"
               id="yearSelector"
               placeholder="Model year">
      </div>
    </div>
    <div class="mb-3 row">
      <RadioButtonSelector
        id="fuelTypeSelector"
        :options="fuelTypeOptions"
        @change="selectedFuelType = $event.newValue"
      ></RadioButtonSelector>
    </div>
    <div class="mb-3 row">
      <RadioButtonSelector
        id="riskTypeSelector"
        :options="riskTypeOptions"
        @change="selectedRisk = $event.newValue"
      ></RadioButtonSelector>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
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
  import NHTSAStore from '@modules/nhtsa_store';
  import Loader from '@components/Loader.vue';
  import RadioButtonSelector from '@components/RadioButtonSelector.vue';

  const nhtsaStore = new NHTSAStore();
  export default {
    name: 'CreateFormula',
    components: { Loader, RadioButtonSelector },
    data() {
      return {
        availableMakes: [],
        availableModels: [],
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
      }
    },
    watch: {
      selectedMake() {
        if (this.selectedMake) {
          this.isModelsLoading = true;
          nhtsaStore.getModelsForMakeId(this.selectedMake).then((models) => {
            this.availableModels = models;
            this.isModelsLoading = false;
          });
        }
        return [];
      }
    },
    methods: {},
    created() {
      nhtsaStore.getAllMakes().then((makes) => {
        this.availableMakes = makes;
      });
    }
  }
</script>

<style>
  .create-formula-form {

  }

</style>