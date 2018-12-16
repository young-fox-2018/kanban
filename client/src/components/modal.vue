<template>
    <b-modal ref="modalUpdate" centered title="Todo Updated" @hide="$emit('hide')">
          <p class="alert alert-danger" v-if="error">Harap isi Data Semuanya</p>
          <form @submit.stop.prevent="submitData" class="card card-form p-4 text-left">
            <div class="form-group">
              <label class="font-weight-bold">Title  :</label>
              <input type="text" class="form-control" v-model="title">
            </div>
            <div class="form-group">
               <label class="font-weight-bold">Description  :</label>
              <input type="text" class="form-control" placeholder="description" v-model="description">
            </div>
            <div class="form-group">
               <label class="font-weight-bold">Point  :</label>
              <input type="number" class="form-control" placeholder="point" v-model="point">
            </div>
            <div class="form-group">
               <label class="font-weight-bold">Assigned To  :</label>
              <input type="text" class="form-control" placeholder="assigned" v-model="assigned">
            </div>
          </form>
          <div slot="modal-footer">
            <div class="d-flex justify-content-between">
                <button class="btn btn-warning" @click="down" v-if="status !== 'back-log'">Back</button>
                <button class="btn btn-danger" @click="deletetodo"> Delete </button>
                <button class="btn btn-success" @click="up" v-if="status !== 'done'">Next</button>
            </div>
          </div>
      </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props : ['open', 'todo'],
  data(){
    return {
      error : false,
      id : this.todo.id,
      title :this.todo.title,
      description :this.todo.description,
      point : this.todo.point,
      assigned :this.todo.assigned,
      status : this.todo.status

    }
  },
  methods : {
    ...mapActions(['updateTodo','deleteTodo']),
    handleOk(){
        this.submitData()
    },
    up(){
        let data = {
            id : this.todo.id
        }
        if(this.status === 'todo'){
            data.status = 'doing'
        }else if(this.status === 'doing'){
            data.status = 'done'
        }else if(this.status === 'back-log'){
             data.status = 'todo'   
        }
      this.updateTodo(data)
      .then( succes =>{
        this.$emit('hide')
      })
    },
    down(){
        let data = {
             id : this.todo.id
        }
        if(this.status === 'todo'){
            data.status = 'back-log'
        }else if(this.status === 'doing'){
            data.status = 'todo'
        }else if( this.status === 'done'){
            data.status = 'doing'
        }
        console.log('status :', this.status)
      this.updateTodo(data)
      .then( succes =>{
        this.$emit('hide')
      })
    },
    deletetodo(){
        this.deleteTodo({
            id : this.todo.id
        })
        .then(reponse => {
            this.$emit('hide')
            console.log('Success Deleted')
        })
    }
  },
  watch : {
    open(){
      if(this.open){
        this.$refs.modalUpdate.show()
      }else{
        this.$refs.modalUpdate.hide()
      }
    },
    todo(){
        this.title = this.todo.title
        this.description = this.todo.description
        this.point = this.todo.point
        this.assigned = this.todo.assigned
        this.status = this.todo.status
    }
  }
}
</script>
