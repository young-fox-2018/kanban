<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ task.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <table class="table is-fullwidth">
          <tbody>
            <tr>
              <th scope="row" class="has-text-weight-semibold">Point :</th>
              <td>{{ task.point }}</td>
            </tr>
            <tr>
              <th scope="row" class="has-text-weight-semibold">Assigned to :</th>
              <td>{{ task.assignedTo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer class="card-footer">
      <a @click="showTaskDetail" class="card-footer-item">Show Detail</a>
    </footer>
  </div>
</template>

<script>
import EventBus from '@/EventBus'

export default {
  props: ["task"],

  methods: {
    showTaskDetail() {
      EventBus.$emit('show-task-detail', this.task)
    }
  }
};
</script>

<style scoped>
  .card {
    margin-bottom: 1.5rem;
  }
</style>

