import Vue from 'vue'
import App from './App.vue'
import NHTSAStore from '@modules/nhtsa_store';
import { FormulaStore } from '@modules/formula_store';

window.x = new NHTSAStore();
window.f = new FormulaStore();

new Vue({
  el: '#app',
  render: h => h(App)
});
