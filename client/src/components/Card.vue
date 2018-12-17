<template>
    <div class="row">
      <div class="col-md-3">
        <div class="card-my-4">
          <h2 class="card-header">Back-log</h2>
          <div class="card-body">
            <div class="card-my-4 mt-2" v-for="bl in backlog" :key="bl.id">
              <div class="card-header"> {{ bl.title }} </div>
              <div class="card-body"> {{ bl.description }} </div>
              <div>
                <button class="btn btn-danger" @click="deleteKanban({id: bl.id})"> delete </button>
                <button class="btn btn-outline-info" @click="updateStatus({
                  title: bl.title,
                  description: bl.description,
                  point: bl.point,
                  assign: bl.assign,
                  status: 'todo',
                  id: bl.id
                })"> To-Do </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-my-4">
          <h2 class="card-header">To-Do</h2>
          <div class="card-body">
            <div class="card-my-4 mt-2" v-for="td in todo" :key="td.id">
              <div class="card-header"> {{ td.title }} </div>
              <div class="card-body"> {{ td.description }} </div>
              <div>
                <button class="btn btn-danger" @click="deleteKanban({id: td.id})"> delete </button>
                <button class="btn btn-outline-warning" @click="updateStatus({
                  title: td.title,
                  description: td.description,
                  point: td.point,
                  assign: td.assign,
                  status: 'backlog',
                  id: td.id
                })"> Back log </button>
                <button class="btn btn-outline-info" @click="updateStatus({
                  title: td.title,
                  description: td.description,
                  point: td.point,
                  assign: td.assign,
                  status: 'doing',
                  id: td.id
                })"> Doing </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-my-4">
          <h2 class="card-header">Doing</h2>
          <div class="card-body">
            <div class="card-my-4 mt-2" v-for="dg in doing" :key="dg.id">
              <div class="card-header"> {{ dg.title }} </div>
              <div class="card-body"> {{ dg.description }} </div>
              <div>
                <button class="btn btn-danger" @click="deleteKanban({id: dg.id})"> delete </button>
                <button class="btn btn-outline-warning" @click="updateStatus({
                  title: dg.title,
                  description: dg.description,
                  point: dg.point,
                  assign: dg.assign,
                  status: 'todo',
                  id: dg.id
                })"> To-Do </button>
                <button class="btn btn-outline-info" @click="updateStatus({
                  title: dg.title,
                  description: dg.description,
                  point: dg.point,
                  assign: dg.assign,
                  status: 'done',
                  id: dg.id
                })"> Done </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-my-4">
          <h2 class="card-header">Done</h2>
          <div class="card-body">
            <div class="card-my-4 mt-2" v-for="dn in done" :key="dn.id">
              <div class="card-header"> {{ dn.title }} </div>
              <div class="card-body"> {{ dn.description }} </div>
              <div>
                <button class="btn btn-outline-warning" @click="updateStatus({
                  title: dn.title,
                  description: dn.description,
                  point: dn.point,
                  assign: dn.assign,
                  status: 'doing',
                  id: dn.id
                })"> Doing </button>
                <button class="btn btn-danger" @click="deleteKanban({id: dn.id})"> delete </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import firebase from '../config.js'

export default {
  props: ['callData'],
  data() {
    return {
      category: [],
      backlog: [],
      todo: [],
      doing: [],
      done: []
    }
  },
  methods: {
    getKanban() {
      firebase.ref('kanban').on('value', (snapshot) => {
        let db = snapshot.val()
        let dataTmp = []
        Object.keys(db).forEach(data => {
          dataTmp.push(db[data])
        })
        this.category = dataTmp
      })
      this.assignKanban()
    },
    updateStatus(p) {
      var updates = {};
      updates['/kanban/' + p['id']] = p;
      firebase.ref().update(updates);
      this.getKanban()
    },
    deleteKanban(p) {
      firebase.ref().child('/kanban/' + p['id']).remove();
      this.getKanban()
    },
    assignKanban() {
      console.log(this.category)
      this.backlog = this.category.filter(e => 
        e['status'] == "backlog"
      )
      
      this.todo = this.category.filter(e => 
        e['status'] == "todo"
      )
  
      this.doing = this.category.filter(e => 
        e['status'] == "doing"
      )
  
      this.done = this.category.filter(e => 
        e['status'] == "done"
      )
    }
  },
  created() {
    this.getKanban()
  },
  watch: {
    callData(v) {
      this.getKanban()
    }
  }
}
</script>

