<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Make</th>
        <th scope="col">Model</th>
        <th scope="col">Year</th>
        <th scope="col">Fuel</th>
        <th scope="col">Risk</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="formula in formulas" :key="`formula${formula.id}`">
        <th scope="row">{{ formula.id }}</th>
        <td> {{ formula.makeName }}</td>
        <td> {{ formula.modelName }}</td>
        <td> {{ formula.yearComparisonType }} {{ formula.year }}</td>
        <td> {{ formula.fuelType }}</td>
        <td> {{ formula.risk }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { FormulaStore } from '@modules/formula_store';

  export default {
    name: "FormulaList",
    data() {
      return {
        formulas: [],
      }
    },
    methods: {
      pull() {
        const formulaStore = new FormulaStore();
        this.formulas = formulaStore.getAll();
      }
    },
    created() {
      this.pull();
    }
  }
</script>

<style scoped>

</style>