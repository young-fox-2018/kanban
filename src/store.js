import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/firebase/firebase';
// import { stat } from 'fs';

Vue.use(Vuex);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
});

export default new Vuex.Store({
  state: {
    kanban: [],
    showAddModal: false,
    showDetailModal: false,
    title: '',
    description: '',
    point: 0,
    assigned: '',
    status: 'backlog',
    details: {},
    aaa: '',
  },
  mutations: {
    asignData(state, payload) {
      const myState = state;
      myState.kanban = payload;
      // myState.kanban = [];
      // console.log(state.kanban);
    },
    modalAdd(state, payload) {
      const myState = state;
      myState.showAddModal = payload;
    },
    modalDetail(state, payload) {
      const myState = state;
      myState.showDetailModal = payload;
    },
    addTitle(state, payload) {
      const myState = state;
      myState.title = payload;
    },
    addDescription(state, payload) {
      const myState = state;
      myState.description = payload;
    },
    addPoint(state, payload) {
      const myState = state;
      myState.point = payload;
    },
    addAssigned(state, payload) {
      const myState = state;
      myState.assigned = payload;
    },
    detailTask(state, payload) {
      const myState = state;
      myState.details = payload;
      // console.log(payload, 'dari mutation');
    },
  },
  actions: {
    readData({ commit }) {
      // console.log('read data dari store');
      db.collection('kanban').get().then((querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data(), doc.id);
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          // console.log(data);
          // temp.push(doc.data());
          temp.push(data);
        });
        // console.log('temp', temp);
        commit('asignData', temp);
      });
    },
    modalAdd({ commit }) {
      commit('modalAdd', true);
      // console.log('commit add')
    },
    clearInput({ state }) {
      const myState = state;
      myState.title = '';
      myState.description = '';
      myState.point = '';
      myState.assigned = '';
    },
    addKanban({ state, dispatch }) {
      const myState = state;
      const input = {
        title: state.title,
        description: state.description,
        point: state.point,
        assigned: state.assigned,
        status: state.status,
      };
      db.collection('kanban').doc().set(input);
      myState.showAddModal = false;
      dispatch('readData');
    },
    deleteTask({ state, dispatch }, payload) {
      const myState = state;
      // console.log(payload, 'apakah ini benar payload');
      db.collection('kanban').doc(payload).delete();
      myState.showDetailModal = false;
      dispatch('readData');
    },
    updateTask({ state, dispatch }, payload) {
      const myState = state;
      db.collection('kanban').doc(payload.id).update({
        status: payload.status,
      })
        .then(() => {
          console.log('Task successfully updated');
          myState.showDetailModal = false;
          dispatch('readData');
        });
    },
    // updateBacklog({ state, dispatch }, payload) {
    //   const myState = state;
    //   db.collection('kanban').doc(payload).update({
    //     status: 'backlog',
    //   })
    //     .then(() => console.log('Task successfully updated'));
    //   myState.showDetailModal = false;
    //   dispatch('readData');
    // },
  },
});
