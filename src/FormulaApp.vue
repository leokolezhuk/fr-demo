<template>
  <div id="formulaApp">
    <div class="row justify-content-md-center">
      <div class="col-8">
        <div class="row app-header">
          <h1>Risk Formulas</h1>
        </div>
        <div class="row justify-content-md-center">
          <div :class="{'col-12': !isCreateFormActive, 'col-8': isCreateFormActive}">
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
               class="col-4">
            <CreateFormula @create="onFormulaCreateFinished"
                           @cancel="onFormulaCreateFinished">
            </CreateFormula>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CreateFormula from '@components/CreateFormula.vue';
  import FormulaList from '@components/FormulaList.vue';

  export default {
    name: "FormulaApp",
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
      onFormulaCreateFinished() {
        this.isCreateFormActive = false;
      },
    },
    mounted() {
      this.updateFormulaList();
    }
  }
</script>
<style>
  #formulaApp {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 3em;
  }

  #addFormulaButton {
    height: 100%;
    width: 100%;
  }

  .app-header{
    padding: 2em;
  }
</style>
