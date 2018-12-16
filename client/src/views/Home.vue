<template>
  <div class="home">
    <h4 class="title d-inline-block"> Rankan Board </h4>
    <b-button v-b-modal="'addTask'" class="btn-add" variant="success">New Task</b-button>
    <AddTask :my-modal="modalName" @success-add-task="showSuccessAlert"/>
    <Alert :message="alertMessage" :type="type" :dismissCountDown="countDownTime"/>
    <b-row>
      <b-col col lg="3">
        <TaskCard :header="firstCard" :type="firstType" :tasks="backlogs" :board="backlogsBoard" @success-move-todo="successMoveToDo"/>
      </b-col>
      <b-col col lg="3">
        <TaskCard :header="secondCard" :type="secondType" :tasks="toDo" :board="toDoBoard" />
      </b-col>   
      <b-col col lg="3">
        <TaskCard :header="thirdCard" :type="thirdType" :tasks="doing" :board="doingBoard" />
      </b-col>
      <b-col col lg="3">
        <TaskCard :header="fourthCard" :type="fourthType" :tasks="done" :board="doneBoard" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue'
import AddTask from '@/components/AddTask.vue'
import Alert from '@/components/Alert.vue'
import firebase from 'firebase'
export default {
  name: 'home',
  data () {
    return {
      firstCard: 'Backlog',
      firstType: 'primary',
      secondCard: 'To-Do',
      secondType: 'info',
      thirdCard: 'Doing',
      thirdType: 'warning',
      fourthCard: 'Done',
      fourthType: 'secondary',
      modalName: 'addTask',
      alertMessage: '',
      countDownTime: 0,
      type: '',
      backlogs: [],
      toDo: [],
      doing: [],
      done: [],
      backlogsBoard: 'backlogs',
      toDoBoard: 'toDo',
      doingBoard: 'doing',
      doneBoard: 'done',
    }
  },
  mounted () {
    let backlog = firebase.database().ref('backlogs')
    backlog.on('value', snapshot => {
      this.backlogs = []
      snapshot.forEach((childNode) => {
        let task = {
          ...childNode.val(),
          id: childNode.key
        }

        this.backlogs.push(task)
      })
    })

    let toDo = firebase.database().ref('toDo')
    toDo.on('value', snapshot => {
      this.toDo = []
      snapshot.forEach((childNode) => {
        let task = {
          ...childNode.val(),
          id: childNode.key
        }

        this.toDo.push(task)
      })
    })

    let doing = firebase.database().ref('doing')
    doing.on('value', snapshot => {
      this.doing = []
      snapshot.forEach((childNode) => {
        let task = {
          ...childNode.val(),
          id: childNode.key
        }

        this.doing.push(task)
      })
    })

    let done = firebase.database().ref('done')
    done.on('value', snapshot => {
      this.done = []
      snapshot.forEach((childNode) => {
        let task = {
          ...childNode.val(),
          id: childNode.key
        }

        this.done.push(task)
      })
    })
  },
  components: {
    TaskCard,
    AddTask,
    Alert
  },
  methods: {
    successMoveToDo (payload) {
      if (payload) {
        this.alertMessage = 'Successfull move task to ToDo'
        this.countDownTime = 3
        this.type = 'success'
      }
    },
    showSuccessAlert (payload) {
      if (payload) {
        this.alertMessage = 'Successfull add task'
        this.countDownTime = 3
        this.type = 'success'
      }
    }
  }
}
</script>
<style>
  .btn-add {
    float: right;
  }

  .title {
    color: #657180;
    margin-bottom: 20px;
  }
</style>
