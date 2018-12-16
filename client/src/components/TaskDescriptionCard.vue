<template>
  <div>
    <div v-for="(task, index) in tasks" :key="index"> 
      <b-card :header="task.title"
              header-text-variant="black"
              class="font-weight-bold mb-2" hide-footer>
        <p class="card-text">Point: {{task.point}}</p>
        <p class="card-text">Assigned to: {{task.assigned}}</p>
        <b-button v-b-modal="board + index" class="float-left" variant="primary" size="sm">show details</b-button>
      </b-card>
      <DetailsModal :board="board" :single-task="task" :my-modal="board + index" 
                    @error-moving-task="errorMovingTask" @success-move-todo="successMoveTodo" />
  </div>
    </div>
</template>
<script>
import DetailsModal from '@/components/DetailsModal.vue'
export default {
  props:['tasks', 'board'],
  name: 'taskDescription',
  components: {
    DetailsModal
  },
  methods: {
    errorMovingTask (payload) {
      this.$emit('error-moving-task', payload)
    },
    successMoveTodo (payload) {
      console.log('sini ga')
      this.$emit('success-move-todo', payload)
    }
  },
  data () {
    return {
      modal: 'detailsModal'
    }
  },
}
</script>
