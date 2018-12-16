<template>
  <div class="col-md-3 ">
    <div class="card text-center">
      <div class="card-header text-white" v-bind:class="{ 'bg-danger': isBacklog, 'bg-success' : isToDo, 'bg-warning' :isWorking, 'bg-info' : isDone }" >
       {{category}}
      </div>
        <task-card @moveTask="moveTask" :taskList="taskList[indexTask]" @deleteTask="deleteTask" />
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'

export default {
  name: "TaskContainer",
  props: ['category', 'taskList'],
  data () {
    return {
      isBacklog: false,
      isToDo: false,
      isWorking: false,
      isDone:false,
      indexTask: ''
    }
  },
  components: {
    TaskCard
  },
  methods: {
    checkClass () {
      if (this.category == 'BackLog') {
        this.isBacklog = true;
        this.indexTask = 0;
      } else if (this.category == 'To-Do') {
        this.isToDo = true;
        this.indexTask = 1;
      } else if (this.category == 'Working') {
        this.isWorking = true;
        this.indexTask = 2;
      } else if (this.category == 'Done') {
        this.isDone = true;
        this.indexTask = 3;
      }
    },
    moveTask(val) {
      this.$emit('moveTask', val)
    },
    deleteTask(task) {
      this.$emit('deleteTask', task)
    }
  },
  created () {
    this.checkClass()
  }
  
};
</script>

