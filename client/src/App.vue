<template>
  <div id="app">
    <iframe style="display: inline;" align="right" src="https://free.timeanddate.com/clock/i6jr3fnv/n108/tlid/fn7/fs20/fc00f/ahr/tt0/tw0/tm1/td2/th1/ta1/tb4" frameborder="0" width="140" height="50"></iframe>

    <h1 style="display: inline; margin: 0 auto;" strong> Arnold's Kanban Board </h1> <hr>
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
