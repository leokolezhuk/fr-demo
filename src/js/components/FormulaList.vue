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
      <tr v-for="formula in formulas">
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
  export default {
    name: "FormulaList",
    props: {
      formulas: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>