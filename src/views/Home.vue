<template>
  <div class="home">
    <div class="row">
      <div class="col-3">
        <div class="header" style="background-color:red">{{title[0]}} </div>
        <Kanban :data="backlog" :status="title[0]" :previous="null" :next="title[1]" ></Kanban>
      </div>
      <div class="col-3">
        <div class="header" style="background-color:orange">{{title[1]}} </div>
        <Kanban :data="todo" :status="title[1]" :previous="title[0]" :next="title[2]"></Kanban>
      </div>
      <div class="col-3">
        <div class="header" style="background-color:blue">{{title[2]}} </div>
        <Kanban :data="doing" :status="title[2]" :previous="title[1]" :next="title[3]"></Kanban>
      </div>
      <div class="col-3">
        <div class="header" style="background-color:green">{{title[3]}} </div>
        <Kanban :data="done" :status="title[3]" :previous="title[2]" :next="null"></Kanban>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Kanban from '@/components/Kanban.vue'
import db from "../assets/config.js";
import { functions } from "firebase";

export default {
  components: {
    Kanban
  },
  data() {
    return {
      title: ["Back-Log", "To-Do", "Doing", "Done"],
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    }
  },
    mounted: function(){
    db.ref(`${this.title[0]}`).on("value", snapshot => {
      let task = [];
      if(snapshot.val()) {
        let data = Object.entries(snapshot.val());
        data.forEach(element => {
          let obj = {
            taskId: element[0],
            title: element[1].title,
            description: element[1].description,
            point: element[1].point,
            assignedto: element[1].assignedto
          };
        task.push(obj);
        });
      }
      this.backlog = task;
     
    });
    db.ref(`${this.title[1]}`).on("value", snapshot => {
      let task = [];
      if(snapshot.val()) {
        let data = Object.entries(snapshot.val());
        data.forEach(element => {
          let obj = {
            taskId: element[0],
            title: element[1].title,
            description: element[1].description,
            point: element[1].point,
            assignedto: element[1].assignedto
          };
          task.push(obj);
        });
      }
      this.todo = task;
    });
      db.ref(`${this.title[2]}`).on("value", snapshot => {
      let task = [];
      if(snapshot.val()) {
      let data = Object.entries(snapshot.val());
        data.forEach(element => {
          let obj = {
            taskId: element[0],
            title: element[1].title,
            description: element[1].description,
            point: element[1].point,
            assignedto: element[1].assignedto
          };
          task.push(obj);
        });
      }
      this.doing = task;
    });
      db.ref(`${this.title[3]}`).on("value", snapshot => {
      let task = [];
      if(snapshot.val()) {
        let data = Object.entries(snapshot.val());
        data.forEach(element => {
          let obj = {
            taskId: element[0],
            title: element[1].title,
            description: element[1].description,
            point: element[1].point,
            assignedto: element[1].assignedto
          };
          task.push(obj);
        });
      }
      this.done = task;
    });
  }
}
</script>

<style>
.header {
  color: white;
  padding: 5px;
  font-weight: 700;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px
}
</style>