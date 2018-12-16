<template>
<div class="container">
    <!-- Button trigger modal -->
    <div class="text-center">
        <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#modalContactForm">Create Task</a>
    </div>

  <div class="modal fade" id="modalContactForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">Creating New Task</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
        </div>
        <div class="modal-body mx-3">
          <div class="md-form mb-3">
            <label data-error="wrong" data-success="right" for="form34">Title:</label>
            <input v-model="title" type="text" id="form34" class="form-control validate">
          </div>

          <div class="md-form-3">
            <label data-error="wrong" data-success="right" for="form8">Description: </label>
            <textarea v-model="description" type="text" id="form8" class="md-textarea form-control" rows="4"></textarea>
          </div>

          <div class="md-form mb-6">
            <label data-error="wrong" data-success="right" for="form32">Assigned To:</label>
            <input v-model="assigned" type="text" id="form32" class="form-control validate">
          </div>

        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button @click="newTask" data-dismiss="modal" class="btn btn-unique">Create Task<i class="fa fa-paper-plane-o ml-1"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>   
</template>
<script>
import Firebase from '@/config/keyfile.js'
let database = Firebase.database()

export default {
    name: 'newTask',
    data: function(){
      return {
        title: "",
        description: "",
        assigned: "",
      }
    },
    methods:{
      newTask(){
        database.ref('tasks/Back-Log/' + this.title).set({
          title: this.title,
          description: this.description,
          assigned: this.assigned,
        })
        this.title = ""
        this.description = ""
        this.assigned = ""
      }
    }
}
</script>
