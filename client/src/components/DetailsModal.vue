<template>
  <div>
  <b-modal :id="myModal" ref="detailsRef" :title="title" fade hide-footer>
    <p>Task description: {{singleTask.description}}</p>
    <p>Point: {{singleTask.point}}</p>
    <p>Status: {{singleTask.status}}</p>
    <div v-if="backlogs">
      <b-button class="float-left" variant="danger" size="sm" @click="deleteBacklogsTask">Delete</b-button>
      <b-button class="float-right" size="sm" @click="moveTaskToDo">To Do</b-button>
    </div>
    <div v-else-if="toDo" class="d-flex justify-content-between">
      <b-button class="float-left" variant="primary" size="sm" @click="moveBackToBackLogs">BackLogs</b-button>
      <b-button class="text-center" variant="danger" size="sm" @click="deleteToDoTask">Delete</b-button>
      <b-button class="float-right" size="sm" @click="moveTaskToDoing">Doing</b-button>
    </div>
     <div v-else-if="doing" class="d-flex justify-content-between">
      <b-button class="float-left" variant="primary" size="sm" @click="moveBackToToDo">ToDo</b-button>
      <b-button class="text-center" variant="danger" size="sm" @click="deleteDoingTask">Delete</b-button>
      <b-button class="float-right" size="sm" @click="moveTaskToDone">Done</b-button>
    </div>
     <div v-else-if="done" class="d-flex justify-content-between">
      <b-button class="float-left" variant="primary" size="sm" @click="moveBackToDoing">Doing</b-button>
      <b-button class="text-center" variant="danger" size="sm" @click="deleteDoneTask">Delete</b-button>
    </div>
  </b-modal>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  props:['board', 'myModal', 'singleTask'],
  name: 'detailsModal',
  data () {
    return {
      backlogs: false,
      toDo: false,
      doing: false,
      done: false,
      modalName: `detailsModal${this.myModal}`,
      title: `${this.singleTask.title} for ${this.singleTask.assigned}`
    }
  },
  mounted () {
    if (this.board === 'backlogs') {
      this.backlogs = true
    } else if (this.board === 'toDo') {
      this.toDo = true
    } else if (this.board === 'doing') {
      this.doing = true
    } else {
      this.done = true
    }
  },
  methods: {
    moveBackToDoing () {
      firebase.database().ref(`/done/${this.singleTask.id}`).remove()
        .then (() => {
          return firebase.database().ref(`doing`).push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'doing',
            title: this.singleTask.title
          })
        })
        .then (() => {
           this.$refs.detailsRef.hide()
        })
        .catch((err) => {
          this.$emit('errror-moving-task', true)
        })
    },
    deleteDoneTask () {
      firebase.database().ref(`/done/${this.singleTask.id}`).remove()
        .then (() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    moveTaskToDone () {
      firebase.database().ref(`/doing/${this.singleTask.id}`).remove()
        .then (() => {
          return firebase.database().ref(`done`).push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'done',
            title: this.singleTask.title
          })
        })
        .then (() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    deleteDoingTask () {
      firebase.database().ref(`/doing/${this.singleTask.id}`).remove()
        .then (() => {
            this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    moveBackToToDo () {
      firebase.database().ref(`/doing/${this.singleTask.id}`).remove()
        .then(() => {
          return firebase.database().ref(`toDo`).push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'toDo',
            title: this.singleTask.title
          })
        })
        .then(() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    moveTaskToDoing () {
      firebase.database().ref(`toDo/${this.singleTask.id}`).remove()
        .then(() => {
          return firebase.database().ref(`doing`).push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'doing',
            title: this.singleTask.title
          })
        })
        .then(() => {
          this.$refs.detailsRef.hide()
          this.$emit('success-move-todo', true)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteToDoTask () {
      firebase.database().ref(`toDo/${this.singleTask.id}`).remove()
        .then(() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    moveBackToBackLogs () {
      firebase.database().ref(`toDo/${this.singleTask.id}`).remove()
        .then(() => {
          return firebase.database().ref('backlogs').push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'backlogs',
            title: this.singleTask.title
          })
        })
        .then (() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteBacklogsTask () {
      firebase.database().ref(`backlogs/${this.singleTask.id}`).remove()
        .then(() => {
          this.$refs.detailsRef.hide()
        })
        .catch((err) => {

        })
    },
    moveTaskToDo () {
       firebase.database().ref(`backlogs/${this.singleTask.id}`).remove()
        .then(() => {
          return firebase.database().ref(`toDo`).push({
            assigned: this.singleTask.assigned,
            description: this.singleTask.description,
            point: this.singleTask.point,
            status: 'toDo',
            title: this.singleTask.title
          })
        })
        .then(() => {
          this.$refs.detailsRef.hide()
          this.$emit('success-move-todo', true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
  .delete-props {
    margin: 0 auto;
  }
</style>
