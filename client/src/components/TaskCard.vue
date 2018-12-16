<template>
  <div class="card" v-if="taskList.data.length > 0">
  <div class="card-body" v-for="task in taskList.data">
    <h5 class="card-title">{{task.title}}</h5>
    <p class="card-text">description : {{task.description}}</p>
    <p>assigned to : {{task.assignedTo}}</p>
    <p>created at : {{task.timeStamp}}</p>
      <div class="row">
        <div class="col-3 mx-auto">
          <button class="btn btn-danger btn-sm" @click="deleteTask(task)">delete</button>
        </div>  
        <div class="col-3">
            <button v-if="taskList.category == 'To-Do'"  class="btn btn-sm btn-outline-danger ml-2 pl-1 pr-1" @click="moveTo(task, 'BackLog')">BackLog</button>
            <button v-if="taskList.category == 'Working'"  class="btn btn-sm btn-outline-success pl-2 pr-2 ml-3" @click="moveTo(task, 'To-Do')">To-Do</button>

        </div>
        <div class="col-6">
            <button v-if="taskList.category == 'BackLog'"  class="btn btn-sm btn-outline-success" @click="moveTo(task, 'To-Do')">To-Do</button>
            <button v-if="taskList.category == 'To-Do'"  class="btn btn-sm btn-outline-warning ml-4 " @click="moveTo(task, 'Working')">Working</button>
            <button v-if="taskList.category == 'Working'"  class="btn  btn-sm btn-outline-info ml-4" @click="moveTo(task, 'Done')">Done</button>
            <button v-if="taskList.category == 'Done'"  class="btn  btn-sm btn-outline-warning" @click="moveTo(task, 'Working')">Working</button>
        </div>
      </div> 
  </div>
</div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: ['category' , 'taskList'],
  methods: {
    moveTo(task, status) {
      task.status = status
      this.$emit('moveTask', task)
    },
    deleteTask(task) {
      this.$emit('deleteTask', task)
    }
  }

}
</script>
