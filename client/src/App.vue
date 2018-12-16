<template>
  <div id="app">
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">KanbanHokAndre</a>
          <b-btn @click="open = true" class="btn btn-outline-success">Add</b-btn>
        </div>
      </nav>
       <modaladdtodo :open="open" @hide="open = false"/>
    <router-view/>
  </div>
</template>
<script>
import modaladdtodo from '@/components/modal_add_todo.vue'
import { mapActions } from 'vuex';
export default {
  components : {
    modaladdtodo
  },
  data(){
    return {
      open : false
    }
  },
  methods : {
    ...mapActions(['readData'])
  },
  created(){
    this.readData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
