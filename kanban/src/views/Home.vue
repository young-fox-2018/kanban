<template>
  <div class="home">
      
      <v-container grid-list-md text-xs-center align-content-space-between true>
        <addNewTodo></addNewTodo>
        <v-layout row wrap>
        <v-flex v-for="(task, i) in tasks" :key="i" xs3 align-content-space-between true>
        <kanbanLayout  :todo="task"></kanbanLayout>
        <v-card dark color="secondary">
        <v-card-text class="px-0"></v-card-text>
        </v-card>
      </v-flex>
        </v-layout>
      </v-container>

  </div>
</template>

<script>
// @ is an alias to /src
import kanbanLayout from '@/components/KanbanLayout.vue'
import fire from '../assets/config.js'
import addNewTodo from '@/components/AddTodo.vue'

const todoTask = [
  {
    name: 'Back-Log',
    tasks: []
  },
  {
    name: 'To-Do',
    tasks: []
  },
  {
    name: 'Doing',
    tasks: []
  },
  {
    name: 'Done',
    tasks: []
  }
]

var onRef = fire.database().ref('/')
onRef.on('value', function(snapshot) {
  
    todoTask[0].tasks = []
    todoTask[1].tasks = []
    todoTask[2].tasks = []
    todoTask[3].tasks = []
    snapshot.forEach(function (innerSnapshot) {
    if (innerSnapshot.val().position === 'Back-Log') {
      const obj = innerSnapshot.val()
      obj.id = innerSnapshot.key
      todoTask[0].tasks.push(obj)
    } else if (innerSnapshot.val().position === 'To-Do') {
      const obj = innerSnapshot.val()
      obj.id = innerSnapshot.key
      todoTask[1].tasks.push(obj)
    } else if (innerSnapshot.val().position === 'Doing') {
      const obj = innerSnapshot.val()
      obj.id = innerSnapshot.key
      todoTask[2].tasks.push(obj)
    } else {
      const obj = innerSnapshot.val()
      obj.id = innerSnapshot.key
      todoTask[3].tasks.push(obj)
    }
  })
})

export default {
  name: 'home',
  components: {
    kanbanLayout,
    addNewTodo
  },
  data () {
    return {
      tasks: todoTask
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style>



</style>

