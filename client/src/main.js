import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyAV3cXGMxPigyr1miU4rhL3S8LnupPaaks",
    authDomain: "kanban-board-8add7.firebaseapp.com",
    databaseURL: "https://kanban-board-8add7.firebaseio.com",
    projectId: "kanban-board-8add7",
    storageBucket: "kanban-board-8add7.appspot.com",
    messagingSenderId: "625529167255"
}

firebase.initializeApp(config);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
