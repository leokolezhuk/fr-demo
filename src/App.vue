<template>
  <div id="app">
    <h1>Friss demo</h1>
    <CreateFormula @formula-created="updateFormulaList"></CreateFormula>
    <FormulaList :formulas="formulas"></FormulaList>
  </div>
</template>
<script>
  import CreateFormula from '@components/CreateFormula.vue';
  import FormulaList from '@components/FormulaList.vue';
  import { FormulaStore } from '@modules/formula_store';

  const formulaStore = new FormulaStore();
  export default {
    name: "MainApp",
    components: { FormulaList, CreateFormula },
    data() {
      return {
        formulas: [],
      }
    },
    methods: {
      updateFormulaList() {
        console.log('Updating list');
        this.formulas = formulaStore.getAll();
        console.log(`Found ${this.formulas.length} formulas.`);
      }
    },
    created() {
      this.updateFormulaList();
    }
  }
</script>
<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-left: 5%;
    margin-right: 5%;
  }
</style>
