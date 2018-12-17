<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
        New Task
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          New Task
        </v-card-title>

        <v-card-text>
              <v-alert
                :value="redAlert"
                type="error"
              >
                {{ this.errorMessage }}
              </v-alert>
          <v-form @submit.prevent="createTask">
            <v-text-field
              v-model="title"
              label="Title"
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="description"
              required
            ></v-textarea>
            <v-text-field
              v-model="point"
              label="Points"
              required
            ></v-text-field>
            <v-text-field
              v-model="assigned"
              label="Assigned To"
              required
            ></v-text-field>
            <v-btn 
              type="submit"
              flat
            >Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'toolbar',
  data () {
    return {
      dialog: false,
      title: '',
      description: '',
      point: 0,
      assigned: '',
      redAlert: false,
      errorMessage: ''
    }
  },
  methods: {
    createTask () {
      if(this.title === '' || this.description === '' || this.assigned === '') {
        this.errorMessage = 'field cannot be empty'
        this.redAlert = true
      } else {
        this.redAlert = false
        firebase.firestore().collection('Back-Log').add({
          title: this.title,
          description: this.description,
          point: this.point,
          assigned: this.assigned
        })
        .then(ref => {
          this.title = '',
          this.description = '',
          this.point = 0,
          this.assigned = ''
          this.dialog = false
        })
      }
    }
  }
}
</script>

<style>

</style>
