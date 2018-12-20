import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
firebase.initializeApp({
    apiKey: "AIzaSyBYs2OiTZnXCBT_hCdFDDWy-coDcauT4SE",
    authDomain: "kanban-5b4cc.firebaseapp.com",
    databaseURL: "https://kanban-5b4cc.firebaseio.com",
    projectId: "kanban-5b4cc",
    storageBucket: "kanban-5b4cc.appspot.com",
    messagingSenderId: "796052251650"
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data : [],
    db : firebase.database()
  },
  mutations: {
    readData(state, payload){
      state.data = payload
    }
  },
  actions: {
    readData({commit, state}, payload){
      state.db.ref('/').on('value', function(snapshot){
        let data = Object.keys(snapshot.val()).reduce((accumulator, id) => {
            if(accumulator[snapshot.val()[id].status]){
              accumulator[snapshot.val()[id].status].push({
                id : id,
                point : snapshot.val()[id].point,
                assigned : snapshot.val()[id].assigned,
                title : snapshot.val()[id].title,
                description : snapshot.val()[id].description,
                status : snapshot.val()[id].status
              })
            }else{
              accumulator[snapshot.val()[id].status] = [{
                id : id,
                point : snapshot.val()[id].point,
                assigned : snapshot.val()[id].assigned,
                title : snapshot.val()[id].title,
                description : snapshot.val()[id].description,
                status : snapshot.val()[id].status
              }]
            }
            return accumulator
        }, {})

        commit('readData', data)
      })
    },
    addNewTodo({commit, state}, payload){
      state.db.ref('/').push(payload)
    },
    updateTodo({commit, state}, payload){
      console.log('payload :', payload)
      let id = payload.id
      console.log('id :', id)
      state.db.ref(`/${id}`).update({
        status : payload.status
      })
    },
    deleteTodo({commit,state}, payload){
      state.db.ref(`/${payload.id}`).remove()
    }
  }
})
