<template>
  <b-card-group>
    <b-card header="Todo" header-bg-variant="warning">
      <b-card class="card" v-for="data in todo" :key="data.id"  :header="data.title">
        <div>
          <b-btn v-b-modal="data.id" variant="primary" size="sm">Details</b-btn>
          <b-modal :id="data.id" :title="data.title" hide-footer>
            <p class="card-text">Task description: {{data.description}}</p>
            <p class="card-text">Status: {{data.status}}</p>
            <hr>
            <b-button class="btn" variant="danger" @click="backlog(data)">Backlog</b-button>
            <b-button class="btn" variant="danger" @click="deleteTask(data.id)">Delete</b-button>
            <b-button class="btn" variant="primary" @click="doing(data)">Doing</b-button>
          </b-modal>
        </div>
      </b-card>
    </b-card>
  </b-card-group>
</template>

<script>
import database from "../assets/key.js";
export default {
  name: "todo",
  props: ['todo'],
  data() {
    return {};
  },
  methods: {
    deleteTask(id){
      console.log(id)
      database.ref(`kanban/${id}`).remove()
    },
    backlog(task){
      console.log(task)
      database.ref(`kanban/${task.id}`).set({
        title: task.title,
        description: task.description,
        status: "backlog"
      })
    },
    doing(task){
      console.log(task)
      database.ref(`kanban/${task.id}`).set({
        title: task.title,
        description: task.description,
        status: "doing"
      })
    }
  }
};
</script>
