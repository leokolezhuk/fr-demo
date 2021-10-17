import Vue from 'vue'
import App from './App.vue'
import NHTSAStore from '@modules/nhtsa_store';
import { formulaStore } from '@modules/formula_store';

window.x = new NHTSAStore();
window.f = formulaStore;

new Vue({
  el: '#app',
  render: h => h(App)
});
