<template>
  <b-modal :id="myModal" ref="addTaskRef" title="Add Task" @hide="clear" hide-footer>
    <b-form @submit.prevent="createTask">
      <b-form-group label="Title">
        <b-form-input type="text"
                      v-model="title"
                      required
                      placeholder="task title">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea type="text"
                      v-model="description"
                      required
                      placeholder="description">
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Point">
        <b-form-input type="number"
                      required
                      v-model="point">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Assigned to" >
        <b-form-input type="text"
                      required
                      v-model="assigned"
                      placeholder="assigned to">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Create task</b-button>
    </b-form>
  </b-modal>
</template>
<script>
import firebase from 'firebase'
export default {
  props:['myModal'],
  data () {
    return {
      assigned: '',
      point: 0,
      title: '',
      description: ''
    }
  },
  methods: {
    clear () {
      this.assigned = ''
      this.point = 0,
      this.title = ''
      this.description = ''
    },
    createTask () {
      firebase.database().ref('backlogs').push({
        title: this.title,
        description: this.description,
        point : this.point,
        assigned: this.assigned,
        status: 'backlogs'
      })
      .then(() => {
        this.$refs.addTaskRef.hide()
        this.$emit('success-add-task', true)
      })
      .catch((err) => {
      })
    }
  }
}
</script>