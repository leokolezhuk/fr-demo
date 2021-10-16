<template>
  <div id="app">
    <h1>Friss demo</h1>
    <CreateFormula></CreateFormula>
  </div>
</template>
<script>

  import CreateFormula from './js/components/CreateFormula.vue';
  export default {
    name: "MainApp",
    components: { CreateFormula },

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
