<template>
  <div class="home">
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-3">
<task-form @taskAdded="addingTask" />
        </div>
        <div class="col-md-6">
          <h1 class="mb-1 pb-1">Amazing Kanban</h1>
      
        </div>
      </div>
      
      <div class="row">
        <task-container @deleteTask="deleteTask" @moveTask="movingTask" v-for="(category, index) in taskCategory" :taskList="taskList" v-bind:key="index" v-bind:category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TaskContainer from '@/components/TaskContainer.vue'
import TaskForm from '@/components/TaskForm.vue'
import database from '../assets/config.js'

export default {
  name: 'home',
  data () {
    return {
      taskCategory : ['BackLog', 'To-Do', 'Working', 'Done'],
      taskList: [{
        category : "BackLog",
        data : []
      },{
        category : "To-Do",
        data : []
      },{
        category : "Working",
        data : []
      },{
        category : "Done",
        data : []
      }
      ]
    }
  },
  components: {
    HelloWorld,
    TaskContainer,
    TaskForm
  },
  mounted() {
    this.fetchtask()
  },
  methods: {
    addingTask(val) {
      let minutes = val.timeStamp.getMinutes() 
      if (minutes < 10) {
        minutes = `0${minutes}` 
      }
      const time = val.timeStamp.getDate() + '/' + val.timeStamp.getMonth() + '/' + val.timeStamp.getFullYear() + ' ' + val.timeStamp.getHours() + ':' + minutes
      val.timeStamp = time;
      database.ref('taskList').push(val)
    },
    fetchtask() {
        let self = this
        const taskRef = database.ref('taskList')
        taskRef.on('value', snapshot => {
          self.taskList[0].data = []
          self.taskList[1].data = []
          self.taskList[2].data = []
          self.taskList[3].data = []
          snapshot.forEach(function (data){
            if(data.val().status == 'BackLog') {
              const currentTask = data.val()
              currentTask.id = data.key
              self.taskList[0].data.push(currentTask)
            } else if (data.val().status == 'To-Do') {
              const currentTask = data.val()
              currentTask.id = data.key
              self.taskList[1].data.push(currentTask)
            } else if (data.val().status == 'Working') {
              const currentTask = data.val()
              currentTask.id = data.key
              self.taskList[2].data.push(currentTask)
            } else if (data.val().status == 'Done') {
              const currentTask = data.val()
              currentTask.id = data.key
              self.taskList[3].data.push(currentTask)
            }
          })
        })
    },
    movingTask(task) {
      console.log('di home')
      const taskRef = database.ref('taskList/' + task.id).set({
        title: task.title,
        description: task.description,
        status: task.status,
        timeStamp: task.timeStamp,
        assignedTo: task.assignedTo
      }).then(() => {
        this.fetchtask()
      })
    },
    deleteTask(task) {
      console.log('sampeai home')
      database.ref(`taskList/${task.id}`).remove().then(() => {
        this.fetchtask()
      }) 
      
    }
  }
}
</script>
