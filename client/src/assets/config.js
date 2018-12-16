import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyAJ9FTy1PrCOcKpzfGOM7yLgnml5PbyXiU',
  authDomain: 'kanban-firebase-dad83.firebaseapp.com',
  databaseURL: 'https://kanban-firebase-dad83.firebaseio.com',
  projectId: 'kanban-firebase-dad83',
  storageBucket: 'kanban-firebase-dad83.appspot.com',
  messagingSenderId: '14126935637'
};

firebase.initializeApp(config)
const database = firebase.database()

export default database