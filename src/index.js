import Vue from 'vue';
import App from './App.vue';
import { formulaStore } from '@modules/formula_store';
import { generateRandomData } from './js/utils/generate_random_data';


new Vue({
  el: '#app',
  render: h => h(App),
  async beforeCreate() {
    if (formulaStore.getAll().length === 0) {
      alert('Creating random data for the formula store...');
      await generateRandomData(18);
    }
  },
});
