<template>
  <div class="modal" :class="active">
    <div @click="deactivate" class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5">New Task</p>
        <button @click="deactivate" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input v-model="task.title" class="input" type="text" placeholder="Task title">
          </div>
        </div>

        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea v-model="task.description" class="textarea" placeholder="Task description"></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Point</label>
          <div class="control">
            <input v-model="task.point" class="input" type="number" value="0">
          </div>
        </div>

        <div class="field">
          <label class="label">Assigned to</label>
          <div class="control">
            <input v-model="task.assignedTo" class="input" type="text" placeholder="Assigned to">
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="addTask" class="button is-success">Save</button>
        <button @click="deactivate" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import EventBus from "@/EventBus";

export default {
  data() {
    return {
      active: "",
      task: {
        title: "",
        description: "",
        point: 0,
        assignedTo: ""
      }
    };
  },

  methods: {
    addTask() {
      if (this.task.title && this.task.description) {
        this.$store.dispatch("addTask", this.task);
        this.task = {
          title: "",
          description: "",
          point: 0,
          assignedTo: ""
        };
        this.deactivate()
      }
    },

    deactivate() {
      this.active = "";
    }
  },

  created() {
    EventBus.$on("show-task-input", () => {
      this.active = "is-active";
    });
  }
};
</script>

