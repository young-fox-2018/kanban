<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">teamKanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <form class="form-inline my-2 my-lg-0">
            task :
            <input class="form-control mr-sm-2" type="text" placeholder="task.." v-model="taskName" maxlength="10">
            description :
            <input class="form-control mr-sm-2" type="text" placeholder="description.." v-model="description" maxlength="30">
            assign to :
            <input class="form-control mr-sm-2" type="text" placeholder="assign to.." v-model="assignedName" maxlength="15">
            <button class="btn btn-outline-success btn-sm my-2 mr-2 my-sm-0" type="submit" v-on:click.prevent="sendItem()">Create</button>
        </form>
        <button type="button" class="btn btn-outline-danger btn-sm" v-on:click="doLogout()" v-if="isLogin">Logout</button>
        <div class="btn-group"  v-if="!isLogin">
          <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-on:click="$emit('resetError')">
            Login to Control
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <!-- <div class="container"> -->
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                   <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                  Password
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" v-on:click="login()">Login</button>
            <!-- </div> -->
          </div>
        </div>
    </nav>
</template>

<style>
body { padding-top: 90px; }
</style>


<script>
import database from '@/connection/fireb.js'

export default {

  name: 'navBar',

  mounted () { 
    this.checkLogin()
  },

  data () {
    return {
      taskName: '',
      assignedName: '',
      description: '',
      email: '',
      password: '',
      isLogin: false
    }
  },

  methods: {
    checkLogin: function () {
      if (localStorage.getItem('jtoken')){
        this.isLogin = true
      }
    },

    doLogout: function () {
      localStorage.clear()
      this.isLogin = false
    },

    sendItem: function () {
      if (this.taskName && this.assignedName && this.description){
        database.ref('/').push({
          title: this.taskName,
          assignTo: this.assignedName,
          description: this.description,
          status: 'Pre-Log'
        })
        this.taskName = '',
        this.assignTo = '',
        this.assignedName = '',
        this.description = ''
      }
      else {
        this.$emit('invalid-createkanban')
      }
    },

    login: function(){
    
      if (this.email && this.password){
        axios({
          method:'post',
          url:'http://35.240.201.171/users/login',
          data:{
            email: this.email,
            password: this.password
            },
          })
          .then((response)=> {
            localStorage.setItem('jtoken', response.data)
            this.checkLogin()
          })
          .catch((error)=> {
            console.log(error)
            this.$emit('invalid-login', error.response.data)
          })
        } 
      else {
        this.$emit('invalid-input')
      }
    }
  }
}
</script>


<style scoped>
html,
body {
  font-family: 'Lato';
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
h1,
h2,
h3 {
  padding: 0;
  margin: 0;
}
.main-header h1 {
  color: #4684f6;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  border-top: #4684f6 3px solid;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: #4684f6;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 50px;
  cursor: pointer;
}
.main-header input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
input {
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
</style>
