<template>
  <div id="app">
    <h1>Friss demo</h1>
    <div class="row justify-content-md-center">
      <div :class="{'col-8': !isCreateFormActive, 'col-5': isCreateFormActive}"
      class="">
        <div class="row">
          <div :class="{'col-11': !isCreateFormActive, 'col-12': isCreateFormActive}">
            <FormulaList ref="formulaList"></FormulaList>
          </div>
          <div class="col-1 px-4">
            <button id="addFormulaButton"
                    class="btn btn-outline-primary"
                    v-if="!isCreateFormActive"
                    @click="isCreateFormActive=true"
                    title="Create formula">
              <span class="fa fa-plus"></span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="isCreateFormActive"
           class="col-3">
        <CreateFormula @create="onFormulaCreated"
                       @cancel="onFormulaCancelled">
        </CreateFormula>
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
        isCreateFormActive: false,
      }
    },
    methods: {
      updateFormulaList() {
        this.$refs.formulaList.pull();
      },
      onFormulaCreated() {
        this.updateFormulaList();
        this.isCreateFormActive = false;
      },
      onFormulaCancelled() {
        this.isCreateFormActive = false;
      }
    },
    mounted() {
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

  #addFormulaButton {
    height: 100%;
    width: 100%;
  }
</style>
