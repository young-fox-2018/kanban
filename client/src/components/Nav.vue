<template>
  <div>
    <h1>Kanbang</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
      <button type="button" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#exampleModal">New Task</button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add new task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body form-group justify-content-start">
              <label for="">Title</label>
              <input type="text" class="form-control" id="" v-model="title" placeholder="Task title"><br>
              <label for="">Description</label>
              <input type="text" class="form-control" id="" v-model="description" placeholder="Add short description"><br>
              <label for="">Point</label>
              <input type="number" class="form-control" id="" v-model="point" placeholder="0"><br>
              <label for="">Assign to</label>
              <input type="text" class="form-control" id="" v-model="assign" placeholder="Assign to"><br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="addKanban">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from '../config.js'

export default {
  data() {
    return {
      title: '',
      description: '',
      point: 0,
      assign: '',
      status: ''
    }
  },
  methods: {
    addKanban() {
      console.log('masuk methods')
      this.$emit('getData', this.title)
      var id = firebase.ref().child('kanban').push().key;
      var data = {
        id: id,
        title: this.title,
        description: this.description,
        point: this.point,
        assign: this.assign,
        status: 'backlog'
      }
      var updates = {};
      updates['/kanban/' + id] = data;
      firebase.ref().update(updates);
      this.title = ''
      this.description = ''
      this.point = 0
      this.assign = '',
      this.status = ''
      
    }
  }
}
</script>

