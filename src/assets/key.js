import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyA_ZxvR8H_pL3wVCZsoN2r2JZDDdC3p1O4",
  authDomain: "kanban-ad97b.firebaseapp.com",
  databaseURL: "https://kanban-ad97b.firebaseio.com",
  projectId: "kanban-ad97b",
  storageBucket: "kanban-ad97b.appspot.com",
  messagingSenderId: "397300641908"
};

const database = firebase.initializeApp(config).database();

export default database
