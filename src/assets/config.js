import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9jiE5K9SZtl6NvEHJamf5CVsOTb3e_bI",
    authDomain: "kanban-60a6d.firebaseapp.com",
    databaseURL: "https://kanban-60a6d.firebaseio.com",
    projectId: "kanban-60a6d",
    storageBucket: "kanban-60a6d.appspot.com",
    messagingSenderId: "837642810331"
};

const database = firebase.initializeApp(config).database();

export default database;