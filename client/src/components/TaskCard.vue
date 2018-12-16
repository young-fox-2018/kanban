<template>
    <b-card :border-variant="type"
            :header="header"
            header-class="text-center"
            :header-bg-variant="type"
            header-text-variant="white" >     
      <TaskDescriptionCard @error-moving-task="errorMovingTask" :tasks="tasks" :board="board" @success-move-todo="successMoveTodo"/>
    </b-card>
</template>
<script>
import TaskDescriptionCard from '@/components/TaskDescriptionCard.vue'
export default {
  props:['header', 'type', 'tasks', 'board'],
  name: 'taskCard',
  components: {
    TaskDescriptionCard
  },
  methods: {
    errorMovingTask (payload) {
      this.$emit('error-moving-task', true)
    },
    successMoveToDo (payload) {
      this.$emit('success-move-todo', true)
    }
  }
}
</script>
<style>
 .card-header {
   text-align: center;
 }
</style>

