<template>
  <div class="mb-3">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Create Task
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Task Create</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label >Title</label>
                <input type="text" class="form-control" v-model="task.title" placeholder="enter title here">
              </div>
              <div class="form-group">
                <label >Description</label>
                <input type="text" class="form-control" v-model="task.description" placeholder="enter description here">
              </div>
              <div class="form-group">
                <label >Assigned to: </label>
                <input type="text" class="form-control" v-model="task.assignedTo" placeholder="enter assigned people here">
              </div>
              <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="createTask">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
   
</template>

<script>
export default {
  name: 'TaskForm',
  data () {
    return {
      task : {}
    }
  }, 
  methods: {
    createTask() {
      this.task.timeStamp = new Date();
      this.task.status = 'BackLog';
      this.$emit('taskAdded', this.task);
      this.task = {}
    }
  }
}
</script>
