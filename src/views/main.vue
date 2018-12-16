<template>
    <v-container fluid>
        <v-layout row wrap >
            <v-flex md3>
                <the-body :titleCard="'Back-Log'" :listData ="backLogData" :styleColor="'background: #F44336; margin: 2px 2px; text-align:center'"/>
            </v-flex>
            <v-flex md3>
                <the-body :titleCard="'To-Do'" :listData ="toDoData" :styleColor="'background: #FF9800; margin: 2px 2px; text-align:center'"/>
            </v-flex>
            <v-flex md3>
                <the-body :titleCard="'Doing'" :listData ="doingData" :styleColor="'background: #2196F3; margin: 2px 2px; text-align:center'"/>
            </v-flex>
            <v-flex md3>
               <the-body :titleCard="'Done'" :listData ="doneData" :styleColor="'background:#4CAF50; margin: 2px 2px; text-align:center'"/> 
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import theBody from "../components/body.vue";
import db from "../assets/config.js";
import { functions } from "firebase";
export default {
  components: {
    theBody
  },
  name: "mainPage",
  data() {
    return {
      backLogData: [],
      toDoData: [],
      doingData: [],
      doneData: []
    };
  },
  mounted() {
    db.ref("task").on("value", snapshot => {
      if (snapshot.val()) {
        if (snapshot.val()["back-log"]) {
          let filtered = Object.entries(snapshot.val()["back-log"]);
          this.backLogData = filtered;
        } else {
          this.backLogData = [];
        }
      } else {
          this.backLogData = [];
      }
      // console.log(snapshot.val())
    });
    db.ref("task").on("value", snapshot => {
      if (snapshot.val()) {
        if (snapshot.val()["to-do"]) {
          let filtered = Object.entries(snapshot.val()["to-do"]);
          this.toDoData = filtered;
        } else {
          this.toDoData = [];
        }
      } else {
          this.toDoData = [];
      }
    });
    db.ref("task").on("value", snapshot => {
      if (snapshot.val()) {
        if (snapshot.val()["doing"]) {
          let filtered = Object.entries(snapshot.val()["doing"]);
          this.doingData = filtered;
        } else {
          this.doingData = [];
        }
      } else {
          this.doingData = [];
      }
    });
    db.ref("task").on("value", snapshot => {
      if (snapshot.val()) {
        if (snapshot.val()["done"]) {
          let filtered = Object.entries(snapshot.val()["done"]);
          this.doneData = filtered;
        } else {
          this.doneData = [];
        }
      } else {
          this.doneData = [];
      }
    });
  }
};
</script>

<style>
</style>
