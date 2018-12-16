<template>
  <div class="column">
    <div class="message" :class="color">
      <div class="message-header">{{ statusText }}</div>
      <div class="message-body">
        <task v-for="task in tasks" :key="task.id" :task="task"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import task from "@/components/task";

export default {
  components: {
    task
  },

  props: {
    status: Number
  },

  computed: {
    statusText() {
      let text = ["Back-Log", "To-Do", "Doing", "Done"];
      return text[this.status];
    },

    color() {
      if (this.status === 0) return "is-danger";
      if (this.status === 1) return "is-warning";
      if (this.status === 2) return "is-info";
      if (this.status === 3) return "is-success";
      else return ""
    },

    tasks() {
      return store.state.tasks.filter(task => task.status === this.status).sort((a, b) => b.createdAt - a.createdAt)
    }
  }
};
</script>

