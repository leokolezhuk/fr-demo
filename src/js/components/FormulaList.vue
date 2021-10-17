<template>
  <div class="table-responsive formula-list-table-wrapper">
    <table class="formula-list-table table table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Make</th>
        <th scope="col">Model</th>
        <th scope="col">Year</th>
        <th scope="col">Fuel</th>
        <th scope="col">Risk</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="formula in formulas" :key="`formula${formula.id}`">
        <td :title="formula.makeName"> {{ formula.makeName }}</td>
        <td :title="formula.modelName"> {{ formula.modelName }}</td>
        <td> {{ formula.yearComparisonType }} {{ formula.year }}</td>
        <td> {{ formula.fuelType }}</td>
        <td> {{ formula.risk }}</td>
        <td>
          <button class="btn btn-sm btn-default" @click="remove(formula)">
            <i class="fa fa-fw fa-trash"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { formulaStore } from '@modules/formula_store';
  /**
   * Table of formulas.
   */
  export default {
    name: "FormulaList",
    data() {
      return {
        formulas: [],
      }
    },
    methods: {
      /**
       * Pull the formulas data from storage.
       */
      pull() {
        this.formulas = formulaStore.getAll();
      },
      /**
       * Remove a formula with a given id.
       * @param {Object} formula Formula to be removed.
       */
      remove(formula) {
        formulaStore.delete(formula.id);
        this.pull();
      },
    },
    created() {
      this.pull();
    }
  }
</script>

<style scoped>
  .formula-list-table-wrapper {
    max-height: 60em;
    overflow: auto;
    display: inline-block;
    width: 100%;
  }

  .formula-list-table {
    margin-bottom: 0;
  }

  .formula-list-table > th, td {
    max-width: 9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .formula-list-table > tbody > tr:nth-child(2n+1) > td, .table-striped > tbody > tr:nth-child(2n+1) > th {
    background-color: #e8f1ff;
  }


</style>