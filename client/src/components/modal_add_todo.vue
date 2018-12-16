<template>
    <b-modal ref="modalAdd" centered title="Bootstrap-Vue" @hide="$emit('hide')" @shown="clear" @ok="handleOk" no-close-on-esc  hide-header-close>
          <p class="alert alert-danger" v-if="error">Harap isi Data Semuanya</p>
          <form @submit.stop.prevent="submitData" class="card card-form p-4 text-left">
            <div class="form-group">
              <label class="font-weight-bold">Title  :</label>
              <input type="text" class="form-control" placeholder="title" v-model="title">
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
      </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props : ['open'],
  data(){
    return {
      error : false,
      title :'',
      description : '',
      point : 0,
      assigned : ''
    }
  },
  methods : {
    ...mapActions(['addNewTodo']),
    clear(){
      this.error = false
      this.title = ''
      this.description = ''
      this.point = 0
      this.assigned = ''
    },
    handleOk(){
        this.submitData()
    },
    submitData(){
      this.addNewTodo({
        title : this.title,
        description : this.description,
        point : this.point,
        assigned : this.assigned,
        status : 'back-log'
      })
      .then( succes =>{
        console.log('succes add data')
        this.$emit('hide')
      })
    }
  },
  watch : {
    open(){
      if(this.open){
        this.$refs.modalAdd.show()
      }else{
        this.$refs.modalAdd.hide()
      }
    }
  }
}
</script>
