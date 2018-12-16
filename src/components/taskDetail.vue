<template>
  <div class="modal" :class="active">
    <div @click="deactivate" class="modal-background"></div>
    <div class="card" style="min-width: 35vw; border-radius: 5px;">
      <header class="card-header">
        <p class="card-header-title">Detail for task: {{ task.title }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <p class="has-text-weight-semibold">Task Description:</p>
          <p>{{ task.description }}</p>
          <p class="has-text-weight-semibold">Point:</p>
          <p>{{ task.point }}</p>
          <p class="has-text-weight-semibold">Status:</p>
          <p>{{ statusText(task.status) }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <div class="is-flex" style="justify-content: space-evenly; width: 100%; margin: 0.7rem">
          <div
            @click="changeStatus(task.status - 1)"
            v-if="task.status - 1 >= 0"
            class="button is-warning"
          >{{ statusText(task.status - 1)}}</div>
          <div @click="deleteTask" class="button is-danger">Delete</div>
          <div
            @click="changeStatus(task.status + 1)"
            v-if="task.status + 1 <= 3"
            class="button is-success"
          >{{ statusText(task.status + 1)}}</div>
        </div>
      </footer>
    </div>
    <button @click="deactivate" class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
import EventBus from "@/EventBus";

export default {
  data() {
    return {
      active: "",
      task: {
        id: null,
        title: "",
        description: "",
        point: 0,
        status: undefined
      }
    };
  },

  methods: {
    deactivate() {
      this.active = "";
    },

    statusText(status) {
      let text = ["Back-Log", "To-Do", "Doing", "Done"];
      return text[status] || "";
    },

    changeStatus(newStatus) {
      this.deactivate();
      this.$store.dispatch("changeStatus", { taskId: this.task.id, newStatus});
    },

    deleteTask() {
      this.deactivate();
      this.$store.dispatch("deleteTask", this.task.id);
    }
  },

  created() {
    EventBus.$on("show-task-detail", task => {
      this.task = task;
      this.active = "is-active";
    });
  }
};
</script>
