import Vue from 'vue';
import Vuex from 'vuex';
import database from '@/assets/config.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskBackLog: {},
    taskToDo: {},
    taskDoing: {},
    taskDone: {},
  },
  mutations: {
    saveTaskBackLogMutations(state, payload) {
      state.taskBackLog = payload;
    },
    saveTaskToDoMutations(state, payload) {
      state.taskToDo = payload;
    },
    saveTaskDoingMutations(state, payload) {
      state.taskDoing = payload;
    },
    saveTaskDoneMutations(state, payload) {
      state.taskDone = payload;
    },
  },
  actions: {
    addNewTask({ commit }, payload) {
      database.ref('/').push({
        title: payload.title,
        description: payload.description,
        point: payload.point,
        assigned: payload.assigned,
        status: payload.status,
      });
    },
    saveTaskBackLog({ commit }, payload) {
      commit('saveTaskBackLogMutations', payload);
    },
    saveTaskToDo({ commit }, payload) {
      commit('saveTaskToDoMutations', payload);
    },
    saveTaskDoing({ commit }, payload) {
      commit('saveTaskDoingMutations', payload);
    },
    saveTaskDone({ commit }, payload) {
      commit('saveTaskDoneMutations', payload);
    },
    updateTask({ commit }, payload) {
      database.ref('/'+ payload.id).update({
        status: payload.status,
      });
    },
    deleteTask({ commit }, payload) {
      database.ref('/' + payload).remove();
    }
  },
});
