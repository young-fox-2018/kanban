import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDQIRjh7BO8SlTC9IrGOAJy4LfHsjXWMcM',
  authDomain: 'kanban-project-68a21.firebaseapp.com',
  databaseURL: 'https://kanban-project-68a21.firebaseio.com',
  projectId: 'kanban-project-68a21',
  storageBucket: 'kanban-project-68a21.appspot.com',
  messagingSenderId: '216167652613'
}
firebase.initializeApp(config)
const database = firebase.database()

export default database
