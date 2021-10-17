import Vue from 'vue';
import FormulaApp from './FormulaApp.vue';
import { formulaStore } from '@modules/formula_store';
import { generateRandomData } from './js/utils/generate_random_data';

window.onload = function () {
  window.formulaApp = new Vue({
    el: '#app',
    render: h => h(FormulaApp),
    async beforeCreate() {
      if (formulaStore.getAll().length === 0) {
        alert('Creating random data for the formula store...');
        await generateRandomData(15);
      }
    },
  });
};
