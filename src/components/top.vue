<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <h1 class="is-size-4 has-text-weight-semibold">KamVan Board</h1>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <button @click="showTaskInput" class="button is-link is-outlined">New Task</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  methods: {
    showTaskInput() {
      EventBus.$emit('show-task-input')
    }
  }
}
</script>

