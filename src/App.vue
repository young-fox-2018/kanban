<template>
  <div class="container is-fluid">
    <top/>
    <board/>
    <task-input/>
    <task-detail/>
  </div>
</template>

<script>
import top from "@/components/top";
import board from "@/components/board";
import taskInput from "@/components/taskInput";
import taskDetail from "@/components/taskDetail";
import database from "@/database";

export default {
  components: {
    top,
    board,
    taskInput,
    taskDetail
  },

  created() {
    database.ref('/tasks').on("value", snapshot => {
      let tasks = Object.entries(snapshot.val() || {}).map(e => Object.assign(e[1], { id: e[0] }))
      this.$store.dispatch('updateTasks', tasks);
    });
  }
};
</script>


<style>
</style>
