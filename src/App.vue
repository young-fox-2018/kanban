<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>KamVan Board</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <addnewtask/>
    </v-toolbar>

    <v-content>
      <main-page/>
      <!-- <HelloWorld/> -->
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import addnewtask from './components/addTask.vue'
import mainPage from './views/main.vue'
import db from './assets/config.js'
import {functions} from 'firebase'
export default {
  name: 'App',
  components: {
    HelloWorld,
    mainPage,
    addnewtask
  },
  data () {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>
