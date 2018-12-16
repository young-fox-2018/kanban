<template>
  <div class="modal-backdrop">
    <div class="modalNT">
      <header class="modalNT-header">
        <slot name="header" class="row">
            <div class="col-10">
              <h1>
              Detail Task: {{data.title}} for {{data.assignedto}}
              </h1>
              </div>
            <div class="col-2" style="justify-content: flex-end">
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </div>

        </slot>
      </header>
      <section class="modalNT-body">
        <slot name="body">
            <h3>Task Description:</h3>
            <p>{{data.description}}</p>
            <h3>Point(s):</h3>
            <p>{{data.point}}</p>
            <h3>Task Status:</h3>
            <p>{{data.status}}</p>
            <div class="row" style="display:flex; justify-content:space-around">
              <button v-if="data.previous" class="col-3 btn btn-warning" @click="previousStage(data)"> {{data.previous}} </button>
              <button class="col-3 btn btn-danger" @click="deleteTask(data.taskId)">Delete </button>
              <button v-if="data.next" class="col-3 btn btn-success" @click="nextStage(data)">{{data.next}} </button>
            </div>
        </slot>
       </section>
    </div>
  </div>
</template>

<script>
import db from "../assets/config.js";
import { functions } from "firebase";

export default {
  name: "modal",
  props: ["data"],
  data() {
    return {
     
    };
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    deleteTask: function(id) {
      this.$emit("close")
      db.ref(`${this.data.status}/${id}`)
          .remove((err) => {
            if(err) {
              console.log('err', err)
            } else {
              console.log('Delete Success')
            }
          })
    },
    nextStage: function(detail) {
      //create data on "next" category
      let title = detail.title;
      let description = detail.description;
      let point = detail.point;
      let assignedto = detail.assignedto;
      let previous = detail.status;
      let next = null;
      let status = detail.next;

      db.ref(`${this.data.next}`)
        .push({
          title: title,
          description: description,
          point: point,
          assignedto: assignedto,
          previous: previous,
          next: next,
          status: status
        })
        .then(snapshot => {
            //delete from current category
            this.deleteTask(detail.taskId)
            this.$emit("close")
        })
        .catch(err => {
          console.log(err);
        });
    },
    previousStage: function(detail) {
      console.log(detail)
      //create data on "previous" category
      let title = detail.title;
      let description = detail.description;
      let point = detail.point;
      let assignedto = detail.assignedto;
      let previous = null;
      let next = detail.status;
      let status = detail.previous;
      
      db.ref(`${detail.previous}`)
        .push({
          title: title,
          description: description,
          point: point,
          assignedto: assignedto,
          previous: previous,
          next: next,
          status: status
        })
        .then(snapshot => {
            //delete from current category
            this.deleteTask(detail.taskId)
            this.$emit("close")
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalNT {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 60%;
}

.modalNT-header {
  margin-top: 10px;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  display: flex;
}

.modalNT-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
h1 {
  font-size: 28px;
}
h3 {
  font-size: 20px;
  color: black;
}
p {
  font-size: 16px;
  margin-left: 20px

}
</style>