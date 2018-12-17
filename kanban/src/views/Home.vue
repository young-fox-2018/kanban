<template>
  <div class="home">
    <CreateTask></CreateTask>
    <div class="container">
      <div class="container-card">
        <Categories v-for="(data,index) in types" :key="index" :data="data"></Categories>
      </div>
    </div>
  </div>
</template>

<script>
import CreateTask from '@/components/CreateTask.vue'
import Categories from '@/components/Categories.vue'
import database from '../assets/config.js'

const categoriesList = [
  {
    name: 'Back-Log',
    tasks: []
  },
  {
    name: 'To-Do',
    tasks: []
  },
  {
    name: 'Doing',
    tasks: []
  },
  {
    name: 'Done',
    tasks: []
  }
]

database.ref('/')
  .on('value', function (snapshot) {
    categoriesList[0].tasks = []
    categoriesList[1].tasks = []
    categoriesList[2].tasks = []
    categoriesList[3].tasks = []
    snapshot.forEach(function (element) {
      if (element.val().status === 'Back-Log') {
        const obj = element.val()
        obj.id = element.key
        categoriesList[0].tasks.push(obj)
      } else if (element.val().status === 'To-Do') {
        const obj = element.val()
        obj.id = element.key
        categoriesList[1].tasks.push(obj)
      } else if (element.val().status === 'Doing') {
        const obj = element.val()
        obj.id = element.key
        categoriesList[2].tasks.push(obj)
      } else {
        const obj = element.val()
        obj.id = element.key
        categoriesList[3].tasks.push(obj)
      }
    })
  })

export default {
  name: 'home',
  components: {
    CreateTask,
    Categories
  },
  data: function () {
    return {
      types: categoriesList
    }
  }
}
</script>

<style>
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
