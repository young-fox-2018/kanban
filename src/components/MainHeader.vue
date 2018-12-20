<template>
  <div class="main-header">
    <div class="container">
      <h2 style="float:left;margin-top:20px;font-weight:bold">
        <hr>kanban
        <span style="color:#00b33c;">Board</span>
        <hr>
      </h2>

      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        style="float:right; margin-top:30px"
      >New Task</button>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="exampleInputEmail1" style="float:left">Title</label>
              <input type="text" class="form-control" v-model="taskName">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" style="float:left">Description :</label>
              <input type="text" class="form-control" v-model="description">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1" style="float:left">Assigned To:</label>
              <input type="text" class="form-control" v-model="assigned">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click="sendItem">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "../assets/config.js";

export default {
  name: "MainHeader",
  data() {
    return {
      taskName: "",
      description: "",
      assigned: ""
    };
  },
  methods: {
    sendItem() {
      database.ref("/").push({
        title: this.taskName,
        description: this.description,
        assigned: this.assigned,
        status: "Back-Log"
      });
      this.taskName = "";
      this.description = "";
      this.assigned = "";
    }
  }
};
</script>

<style scoped>
</style>
