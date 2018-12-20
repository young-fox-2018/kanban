<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-btn slot="activator" color="primary" dark>Add Todo</v-btn>
      <v-card dark>
        <v-card-title>
          <span class="headline">What do you want to do?</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="*Input Here!!" required v-model="whatTodo"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialog = false">Close</v-btn>
          <v-btn color="grey" @click="addTodo">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import fire from '../assets/config.js'
export default {
    name: 'AddTodo',
    data () {
        return {
            whatTodo: '',
            dialog: false
        }
    },
    mounted () {
        this.modal()
    },
    methods: {
        addTodo () {
            fire.database().ref('/').push({
                title: this.whatTodo,
                position: 'Back-Log'
            })
            this.whatTodo = ''
        },
        modal () {
            if(!this.dialog) {
                this.dialog = true
            } else {
                this.dialog = false
            }
            return this.dialog
        }
    }
}
</script>

<style>

</style>


