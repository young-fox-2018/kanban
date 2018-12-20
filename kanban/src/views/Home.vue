<template>
  <div>
    <mainHeader/>
    <b-container style="min-height: 100vh;">
      <b-row class="mt-5">
          <kanbanCard v-for="(data, index) in taskList" :key="index" :data="data"/>
       </b-row>
    </b-container>
    <footer>
      <div style="height: 80px; background-color: gray;">
      <b-container>
        <b-row class="text-center">
          <b-col></b-col>
          <b-col style="margin-top: 2.5%;">
            <p style="color: white;">© 2018 KANBAN all rights reserved.</p>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
      </div>
    </footer>
  </div>
</template>

<script>
import mainHeader from '@/components/mainHeader.vue'
import kanbanCard from '@/components/kanbanCard.vue'

import database from '@/assets/config.js'

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
    mainHeader,
    kanbanCard
  },
  data() {
    return {
      taskList: taskData
    }
  }
}
</script>
