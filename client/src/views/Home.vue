<template>
  <div class="home mx-4">
    <Header></Header>
    <div class="row">
      <Board 
        v-for="(board, index) in boards" 
        :key="index" 
        class="col-3"
        :board="board"
      ></Board>
    </div>
    
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import database from '@/assets/config.js'

export default {
  name: 'home',
  components: { Header, Board },
  data() {
    return {
      boards: []
    }
  },
  methods: {
    getData: function() {
      database.ref('db/tasks').on('value', (snapshot) => {

        this.boards = [
          {name: 'Back-Log', tasks: []}, 
          {name: 'To-Do', tasks: []}, 
          {name: 'Doing', tasks: []}, 
          {name: 'Done', tasks: []}
        ]

        let allTasks = Object.entries(snapshot.val())
        allTasks.forEach(task => {
          let eachTask = task[1]
          eachTask['id'] = task[0]
          
          if (eachTask.status == "back-log") {
            this.boards[0].tasks.push(eachTask)
          }
          else if (eachTask.status == "to-do") {
            this.boards[1].tasks.push(eachTask)
          }
          else if (eachTask.status == "doing") {
            this.boards[2].tasks.push(eachTask)
          }
          else if (eachTask.status == "done") {
            this.boards[3].tasks.push(eachTask)
          }
        })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
