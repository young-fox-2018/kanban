<template>
  <div class="card">
    <div class="card-header">{{item.title}}</div>
    <div class="card-body">
      <p>
        Description:
        <span>{{item.description}}</span>
      </p>
      <p>
        Assigned to :
        <span>{{item.assigned}}</span>
      </p>
      <a @click="removeItem" class="btn btn-outline-danger">delete</a>
      <a @click="actionOne" class="btn btn-outline-success">{{buttonOne}}</a>
      <a @click="actionTwo" v-if="buttonTwo" class="btn btn-outline-warning">{{buttonTwo}}</a>
    </div>
  </div>
</template>

<script>
import database from "../assets/config.js";

export default {
  name: "ContentCard",
  data: function() {
    return {
      buttonOne: "",
      buttonTwo: ""
    };
  },
  props: ["item", "name"],
  methods: {
    actionOne() {
      database.ref(`/${this.item.id}`).remove();
      database.ref("/").push({
        title: this.item.title,
        description: this.item.description,
        assigned: this.item.assigned,
        status: this.buttonOne
      });
    },
    actionTwo() {
      database.ref(`/${this.item.id}`).remove();
      database.ref("/").push({
        title: this.item.title,
        description: this.item.description,
        assigned: this.item.assigned,
        status: this.buttonTwo
      });
    },
    removeItem() {
      database.ref(`/${this.item.id}`).remove();
    }
  },
  created() {
    if (this.name === "Back-Log") {
      this.buttonOne = "To-Do";
      this.buttonTwo = null;
    } else if (this.name === "To-Do") {
      this.buttonOne = "Back-Log";
      this.buttonTwo = "Doing";
    } else if (this.name === "Doing") {
      this.buttonOne = "Done";
      this.buttonTwo = "To-Do";
    } else if (this.name === "Done") {
      this.buttonOne = "Doing";
      this.buttonTwo = null;
    }
  }
};
</script>

<style scoped>
.btn {
  padding-top: 2px;
  padding-bottom: 2px;
  margin: 5px;
}
</style>
