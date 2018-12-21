<template>
  <div class="home">
    <div class="container">
      <div>
        <h3>Kanban Board</h3>
        <b-btn v-b-modal.modalnewtask variant="link" size="sm">Add New Task</b-btn>
        <b-modal id="modalnewtask" title="Add New Task" hide-footer>
          <b-form-group>
            <div>
              <b-form>
                <b-form-group label="Title" label-for="title" style="text-align:left;">
                  <b-form-input id="title" type="text" v-model="title" required placeholder="Enter title"></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description" style="text-align:left;">
                  <b-form-input type="text" v-model="description" placeholder="Enter description"></b-form-input>
                </b-form-group>
                <b-form-group label="Assigned" label-for="assigned" style="text-align:left;">
                  <b-form-input id="assigned" type="text" v-model="assignedTo" placeholder="Assigned to ..."></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click.prevent="add">Add New Task</b-button>
              </b-form>
            </div>
          </b-form-group>
        </b-modal>
        <hr>
      </div>
      <div class="row">
        <div class="col-3">
          <backlog :backlog="backlog"></backlog>
        </div>
        <div class="col-3">
          <todo :todo="todo"></todo>
        </div>
        <div class="col-3">
          <doing :doing="doing"></doing>
        </div>
        <div class="col-3">
          <done :done="done"></done>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import backlog from "@/components/Backlog.vue";
import todo from "@/components/Todo.vue";
import doing from "@/components/Doing.vue";
import done from "@/components/Done.vue";
import database from "../assets/key.js";

export default {
  name: "home",
  components: {
    backlog,
    todo,
    doing,
    done
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      title: "",
      description: "",
      assignedTo: ""
    };
  },
  created() {
    this.getAllData();
  },
  mounted() {
    let self = this;
    database.ref("kanban").on("value", snapshot => {
      let data = snapshot.val()
      self.initDataKanban()
      self.getDataFirebase(data)
    });
  },
  methods: {
    getAllData() {
      let self = this;
      database.ref("kanban").once("value", snapshot => {
        let data = snapshot.val()
        self.initDataKanban()
        self.getDataFirebase(data)
      });
    },

    add() {
      let newTask = {
        title: this.title,
        description: this.description,
        status: "Backlog",
        assignedTo: this.assignedTo
      };

      database.ref("kanban").push(newTask);
      this.title = ""
      this.description = ""
      this.assignedTo = ""
    },

    initDataKanban() {
      this.backlog = []
      this.todo = []
      this.doing = []
      this.done = []
    },

    getDataFirebase(data) {
      Object.keys(data).forEach(key => {
        let obj = {
          id: key,
          title: data[key].title,
          description: data[key].description,
          status: data[key].status,
          assignedTo: data[key].assignedTo
        }
        if (data[key].status == "Backlog") {
          this.backlog.push(obj);
        } else if (data[key].status == "Todo") {
          this.todo.push(obj);
        } else if (data[key].status == "Doing") {
          this.doing.push(obj);
        } else {
          this.done.push(obj);
        }
      });
    }
  }
};
</script>

<style>
.card-text{
  text-align: left;
}
</style>
