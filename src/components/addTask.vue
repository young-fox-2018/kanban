<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>add newtask</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="name" label="Title*" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="description" label="description*" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="point" label="point" type="number" ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="assignedTo" label="Assigned to" type="text" ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="submitTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "../assets/config.js";
import { functions } from "firebase";
export default {
  name: "addnewtask",
  data() {
    return {
      dialog: false,
      name:'',
      description: '',
      point: null,
      assignedTo: ''
    };
  },

  methods: {
    submitTask() {
      db.ref("task/back-log").push({
        name: this.name,
        description: this.description,
        point: this.point,
        assignedTo: this.assignedTo,
        current: 'back-log'
      });
      this.dialog = false;
    }
  }
};
</script>
