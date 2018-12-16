import Vue from 'vue'
import Vuex from 'vuex'
import database from '@/database.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks
    },

    addTask(state, newTask) {
      // let maxId = state.tasks[0] ? Math.max(...state.tasks.map(task => task.id)) : 0
      // state.tasks.push({
      //   id: maxId + 1,
      //   status: 0,
      //   createdAt: Date.now(),
      //   ...newTask
      // })

      database.ref('/tasks').push({
        status: 0,
        createdAt: Date.now(),
        ...newTask
      })
    },

    changeStatus(state, { taskId, newStatus }) {
      // let taskIndex = state.tasks.findIndex(task => task.id === taskId)
      // state.tasks[taskIndex].status = newStatus

      database.ref('/tasks/' + taskId).update({ status: newStatus })
    },

    deleteTask(state, taskId) {
      // let taskIndex = state.tasks.findIndex(task => task.id === taskId)
      // state.tasks.splice(taskIndex, 1)

      database.ref('/tasks/' + taskId).remove()
    }
  },

  actions: {
    updateTasks({ commit }, tasks) {
      commit('updateTasks', tasks)
    },

    addTask({ commit }, newTask) {
      commit('addTask', newTask)
    },

    changeStatus({ commit }, { taskId, newStatus }) {
      commit('changeStatus', { taskId, newStatus })
    },

    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId)
    }
  }
})
