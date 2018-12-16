<template>
  <b-card-group>
    <b-card header="Doing" header-bg-variant="primary">
      <b-card class="card" v-for="data in doing" :key="data.id" :header="data.title">
        <div>
          <b-btn v-b-modal="data.id" variant="primary" size="sm">Details</b-btn>
          <b-modal :id="data.id" :title="data.title" hide-footer>
            <p class="card-text">Task description: {{data.description}}</p>
            <p class="card-text">Status: {{data.status}}</p>
            <hr>
            <b-button class="btn" variant="warning" @click="todo(data)">Todo</b-button>
            <b-button class="btn" variant="danger" @click="deleteTask(data.id)">Delete</b-button>
            <b-button class="btn" variant="success" @click="done(data)">Done</b-button>
          </b-modal>
        </div>
      </b-card>
    </b-card>
  </b-card-group>
</template>

<script>
import database from "../assets/key.js";
export default {
  name: "doing",
  props: ['doing'],
  data() {
    return {};
  },
  methods: {
    deleteTask(id){
      console.log(id)
      database.ref(`kanban/${id}`).remove()
    },
    todo(task){
      console.log(task)
      database.ref(`kanban/${task.id}`).set({
        title: task.title,
        description: task.description,
        status: "todo"
      })
    },
    done(task){
      console.log(task)
      database.ref(`kanban/${task.id}`).set({
        title: task.title,
        description: task.description,
        status: "done"
      })
    }
  }
};
</script>
