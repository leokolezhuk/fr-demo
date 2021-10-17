<template>
  <div id="app">
    <h1>Friss demo</h1>
    <div class="row">
      <div class="col-6">
        <FormulaList ref="formulaList"></FormulaList>
      </div>
      <div class="col-6">
        <CreateFormula @formulaCreated="updateFormulaList"></CreateFormula>
      </div>
    </div>
  </div>
</template>
<script>
  import CreateFormula from '@components/CreateFormula.vue';
  import FormulaList from '@components/FormulaList.vue';

  export default {
    name: "MainApp",
    components: { FormulaList, CreateFormula },
    data() {
      return {

      }
    },
    methods: {
      updateFormulaList() {
        console.log('Updating list');
        this.$refs.formulaList.pull();
        // this.formulas = formulaStore.getAll();
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
