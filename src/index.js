import Vue from 'vue'
import App from './App.vue'
// import '@node_modules/regenerator-runtime/runtime';
import NHTSAStore from '@modules/nhtsa_store';

window.x = new NHTSAStore();


new Vue({
  el: '#app',
  render: h => h(App)
});
