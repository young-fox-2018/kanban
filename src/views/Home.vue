<template>
  <div class="home">
    <div class="container">
      <div class="row mb-3">
        <div class="col-md-6 offset-md-3">
         <main-header></main-header>
        </div>
      </div>
      <b-card-group deck>
        <div class="col-md-3" v-for="(list, index) in TaskList" :key="index">
          <kanban-card :header="list.title" :tasks="list.tasks"></kanban-card>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import KanbanCard from '../components/KanbanCard.vue';
import MainHeader from '@/components/MainHeader.vue'
import database from '../assets/config.js'


export default {
  name: 'home',
  components: {
    KanbanCard,
    MainHeader
  },
  data(){
    return {
      TaskList: [{
        title: 'Pre-Log', 
        tasks: [{name: 'kanban'}, {name: 'blog'}]
      }, {
        title: 'To-Do', 
        tasks: []
      }, {
        title: 'On-Going', 
        tasks: []
      }, {
        title: 'Finished', 
        tasks: []
      }],
      newTask: ''
    }
  },
  created(){
    this.getTasks()
  },
  methods: {
    getTasks(){
      var leadsRef = database.ref('/')
      leadsRef.on('value', (snapshot)=>{
        this.TaskList[0].tasks = []
        this.TaskList[1].tasks = []
        this.TaskList[2].tasks = []
        this.TaskList[3].tasks = []
        snapshot.forEach((childSnapshot)=> {
          if(childSnapshot.val().status === 'Pre-Log'){
            const obj = childSnapshot.val()
            // console.log(obj)
            obj.id = childSnapshot.key
            this.TaskList[0].tasks.push(obj)
          } else if(childSnapshot.val().status === 'To-Do'){
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            this.TaskList[1].tasks.push(obj)
          } else if(childSnapshot.val().status === 'On-Going'){
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            this.TaskList[2].tasks.push(obj)
          } else if(childSnapshot.val().status === 'Finished'){
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            this.TaskList[3].tasks.push(obj)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
@media (min-width: 1200px){
    .container {
        max-width: 1350px !important;
    }  
}
</style>

