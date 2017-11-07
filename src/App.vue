<template>
  <div id="app" >
    <navbar></navbar>
    <img src="./assets/logo.png">
    <!--  <todo-list v-bind:todos="todos"></todo-list> -->
    <router-view v-bind:todos="todos"></router-view>
  </div>
</template>

<script>
import navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  },
  data() {
    return {
      todos: [{title: 'Todo A', project: 'Project A', done: false},
           {title: 'Todo B', project: 'Project B', done: true}]
    }
  },
  methods: {
  },
  watch: {
    '$route': function(value) {
      //alert(value);
    },
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
