<template>
  <div class="columns">
    <div class="column is-5">
      <h1>Kamvan Board</h1>
    </div>
    <div class="column is-1">
      <a class="button is-info" @click="showModal = true">New Task</a>
      <div class="modal is-active" v-if="showModal">
        <div class="modal-background" @click="showModal = false"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">New Task</p>
            <button class="delete" aria-label="close" @click="showModal = false"></button>
          </header>

          <section class="modal-card-body">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input v-model="taskDetail.title" class="input" type="text" placeholder="Task Title">
              </div>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea v-model="taskDetail.description" class="textarea" placeholder="Task Short Description"></textarea>
              </div>
            </div>
            <div class="field">
              <label class="label">Point</label>
              <div class="control">
                <input v-model="taskDetail.point" class="input" type="number" value="0">
              </div>
            </div>
            <div class="field">
              <label class="label">Assigned To</label>
              <div class="control">
                <input v-model="taskDetail.assigned" class="input" type="text" placeholder="Assigned To">
              </div>
            </div>
          </section>

          <footer class="modal-card-foot">
            <button class="button is-success" @click="addNewTask">Add New Task</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '@/assets/config.js';
import store from "../store.js";

export default {
  name: 'NewTask',
  data() {
    return {
      showModal: false,
      taskDetail: {
        title: '',
        description: '',
        point: 0,
        assigned: '',
        status: 'back-log',
      }
    };
  },
  created() {
    this.getAllTask();
  },
  methods: {
    addNewTask() {
      this.$store.dispatch('addNewTask', this.taskDetail);
      this.taskDetail.title = '';
      this.taskDetail.description = '';
      this.taskDetail.point = 0;
      this.taskDetail.assigned = '';
      this.showModal = false;
    },
    getAllTask() {
      var allTask = [];
      database.ref('/').orderByChild('status').equalTo('back-log').on("value", (snapshot) => {
        allTask = snapshot.val();
        this.$store.dispatch('saveTaskBackLog', allTask);
      });
      database.ref('/').orderByChild('status').equalTo('todo').on("value", (snapshot) => {
        allTask = snapshot.val();
        this.$store.dispatch('saveTaskToDo', allTask);
      });
      database.ref('/').orderByChild('status').equalTo('doing').on("value", (snapshot) => {
        allTask = snapshot.val();
        this.$store.dispatch('saveTaskDoing', allTask);
      });
      database.ref('/').orderByChild('status').equalTo('done').on("value", (snapshot) => {
        allTask = snapshot.val();
        this.$store.dispatch('saveTaskDone', allTask);
      });
    },
  },
};
</script>

<style scoped>
.columns {
  /* display: flex; */
  justify-content: space-between;
  margin-top: 1rem;
  width: 86vw;
}
h1 {
  font-size: 2rem;
  text-align: left;
}
.field {
  text-align: left;
}
</style>
