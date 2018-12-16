<template>
  <div class="modal-backdrop">
    <div class="modalNT">
      <header class="modalNT-header">
        <slot name="header" class="row">
            <div class="col-6">New Task</div>
            <div class="col-6" style="justify-content: flex-end">
                <button type="button" class="btn-close" @click="close">
                    x
                </button>
            </div>
        </slot>
      </header>
      <section class="modalNT-body">
        <slot name="body">
            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="newTask_title" type="text" class="form-control" id="title" placeholder="Title" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea v-model="newTask_description" type="text" class="form-control" id="description" placeholder="Enter Description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="point">Point</label>
                    <input v-model="newTask_point" type="number" min="0" class="form-control" id="point" value="0" required>
                </div>
                <div class="form-group">
                    <label for="assignedto">Assigned To</label>
                    <input v-model="newTask_assignedto" type="text" class="form-control" id="assignedto" placeholder="Person's name" required>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="addTask()">Submit</button>
            </form>
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
  data() {
    return {
      newTask_title: "",
      newTask_description: "",
      newTask_point: 0,
      newTask_assignedto: ""
    };
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    addTask: function() {
      let title = this.newTask_title;
      let description = this.newTask_description;
      let point = this.newTask_point;
      let assignedto = this.newTask_assignedto;

      if (title && description && point>=0 && assignedto) {
        db.ref("Back-Log")
          .push({
            title: title,
            description: description,
            point: point,
            assignedto: assignedto
          })
          .then(snapshot => {
              this.newTask_title = "",
              this.newTask_description = "",
              this.newTask_point = 0,
              this.newTask_assignedto = ""
              this.$emit("close")
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
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
  width: 50%;
  height: 80%;
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
</style>