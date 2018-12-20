<template>
  <div class="container">
    <ul>
      <li v-for="(task, index) in tasklist" :key="task.id">
        <div class="container">
          <h4>{{task.title}}</h4>
          <p>Point: {{task.point}}</p>
          <p>Assigned To: {{task.assigned}}</p>
          <button class="button is-success is-small" @click="showModal = true; taskDetail = task; taskId = index" >Details</button>
        </div>
      </li>
    </ul>
    <div class="modal is-active" v-if="showModal">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Detail Task: {{taskDetail.title}}</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>

        <section class="modal-card-body">
          <div class="field">
            <label class="label">Task Description:</label>
            <p>{{taskDetail.description}}</p>
          </div>
          <div class="field">
            <label class="label">Point: {{taskDetail.point}}</label>
          </div>
          <div class="field">
            <label class="label">Assigned To: {{taskDetail.assigned}}</label>
          </div>
          <div class="field">
            <label class="label">Status: {{taskDetail.status}}</label>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button @click="changeToPrev" v-if="prevstatus" class="button is-warning">{{prevstatus.charAt(0).toUpperCase() + prevstatus.slice(1)}}</button>
          <button @click="deleteTask" class="button is-danger">Delete</button>
          <button @click="changeToNext" v-if="nextstatus" class="button is-success">{{nextstatus.charAt(0).toUpperCase() + nextstatus.slice(1)}}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['tasklist', 'nextstatus', 'prevstatus'],
  data() {
    return {
      taskId: '',
      taskDetail: {},
      showModal: false,
    };
  },
  methods: {
    changeToPrev() {
      let details = {...this.taskDetail};
      details.id = this.taskId;
      details.status = this.prevstatus;
      this.$store.dispatch('updateTask', details);
      this.showModal = false;
    },
    changeToNext() {
      let details = {...this.taskDetail};
      details.id = this.taskId;
      details.status = this.nextstatus;
      this.$store.dispatch('updateTask', details);
      this.showModal = false;
    },
    deleteTask() {
      if(confirm('Are you sure you want to delete?')) {
        this.$store.dispatch('deleteTask', this.taskId);
        this.showModal = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: inline;
  text-align: left;
}
li {
  margin: 1rem;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: .5rem;
}
h4 {
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
p {
  padding: .5rem;
}
button {
  margin: .5rem;
}
footer {
  display: flex;
  justify-content: space-between;
}

</style>
