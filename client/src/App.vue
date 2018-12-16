<template>
  <div id="app">
    <h1 strong> Arnold's Kanban Board </h1> <hr>
    <new-task />
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>

  import newTask from '@/components/newTask.vue'
  export default {
    components: {
      newTask
    }
  }
</script>
