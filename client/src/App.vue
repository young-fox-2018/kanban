<template>
  <div id="app">
    <div class="container">
      <new-task />
      <router-view />

    </div>
  </div>
</template>

<script>
import NewTask from '@/components/NewTask.vue';

export default {
  components: {
    NewTask,
  },
};
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
</style>
