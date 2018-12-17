<template>
  <div id="app">
  <div class="home">
    <nav-bar 
      @invalid-input="loginInputInvalid"
      @invalid-login="loginError"
      @resetError="resetError1"
      @invalid-createkanban="invalidCreateKanban"
    />
    <alert
      v-if="loginInputError.showErr" 
      :errorInput="loginInputError"
      
    />
    <div class="container">
      <div class="container-card">
        <KanbanCard 
          v-for="(data,index) in taskLists" :key="index" 
          :data="data"
          @showCannotDelete="showCannotDelete1">
        </KanbanCard>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container-card {
  margin-top: 30px;
  padding-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 90%;
  grid-gap: 20px;
}
.container {
  background-color: #f6f7f9;
  width: 100%;
  min-height: 675px;
}
@media only screen and (max-width: 800px) {
  .container-card {
    display: block;
  }
}
</style>

<script>
import NavBar from '@/components/NavBar.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import database from '@/connection/fireb.js'
import alert from '@/components/alert.vue'

const taskData = [
  {
    name: 'Pre-Log',
    tasks: []
  },
  {
    name: 'To-Do',
    tasks: []
  },
  {
    name: 'On-Going',
    tasks: []
  },
  {
    name: 'Finished',
    tasks: []
  }
]

var leadsRef = database.ref('/')
leadsRef.on('value', function (snapshot) {
  taskData[0].tasks = []
  taskData[1].tasks = []
  taskData[2].tasks = []
  taskData[3].tasks = []
  snapshot.forEach(function (childSnapshot) {
    if (childSnapshot.val().status === 'Pre-Log') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[0].tasks.push(obj)
    } else if (childSnapshot.val().status === 'To-Do') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[1].tasks.push(obj)
    } else if (childSnapshot.val().status === 'On-Going') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[2].tasks.push(obj)
    } else {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[3].tasks.push(obj)
    }
  })
})

export default {

  name: 'home',

  components: {
    KanbanCard,
    NavBar,
    alert,

  },

  data: function () {
    return {
      taskLists: taskData,
      loginInputError: {
        showErr: false,
        ErrMsg: ''
      }
    }
  },

  methods: {
    invalidCreateKanban: function(){
      this.loginInputError.showErr = true,
      this.loginInputError.ErrMsg = 'Please input valid text to create kanban'   
    },

    setError: function(){
      this.loginInputError.showErr = false,
      this.loginInputError.ErrMsg = ''
    },

    loginInputInvalid: function(){
      this.loginInputError.showErr = true,
      this.loginInputError.ErrMsg = 'Please input valid email or password'
    },

    loginError: function(msg){
      this.loginInputError.showErr = true,
      this.loginInputError.ErrMsg = msg
    },

    resetError1: function(){
      this.setError()
    },

    showCannotDelete1: function(){
      this.loginInputError.showErr = true,
      this.loginInputError.ErrMsg = 'Cannot delete, please login to authorize!'
    }
  },

  created () { },

  mounted () { }
  
}


</script>
