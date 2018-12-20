<template>
  <div class="columns">
    <div class="column">
      <h3 class="has-background-danger">Back-Log</h3>
      <category v-bind:tasklist="taskBackLog" v-bind:nextstatus="'todo'" />
    </div>
    <div class="column">
      <h3 class="has-background-warning">To-Do</h3>
      <category v-bind:tasklist="taskToDo" v-bind:prevstatus="'back-log'" v-bind:nextstatus="'doing'" />
    </div>
    <div class="column">
      <h3 class="has-background-info">Doing</h3>
      <category v-bind:tasklist="taskDoing" v-bind:prevstatus="'todo'" v-bind:nextstatus="'done'" />
    </div>
    <div class="column">
      <h3 class="has-background-success">Done</h3>
      <category v-bind:tasklist="taskDone" v-bind:prevstatus="'doing'"/>
    </div>
  </div>
</template>

<script>
import NewTask from '@/components/NewTask.vue';
import Category from '@/components/Category.vue';

export default {
  name: 'home',
  components: {
    NewTask,
    Category,
  },
  computed: {
    taskBackLog() {
      return this.$store.state.taskBackLog;
    },
    taskToDo() {
      return this.$store.state.taskToDo;
    },
    taskDoing() {
      return this.$store.state.taskDoing;
    },
    taskDone() {
      return this.$store.state.taskDone;
    },
  },
};
</script>

<style scoped>
h3 {
  border-top-right-radius: .5rem;
  border-top-left-radius: .5rem;
  border-bottom: 1px solid black;
  color: white;
  padding: .6rem;
  font-weight: bold;
  /* background-color: lightcoral; */
}
.container {
  width: 90vw;
  /* margin: 1rem; */
}

.columns {
  width: 100%;
  margin-top: .5rem;
  margin-bottom: 2rem;
}
.column {
  padding: 0;
  margin: .5rem;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
  border-radius: .5rem;
}
</style>
