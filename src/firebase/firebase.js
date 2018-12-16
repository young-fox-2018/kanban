import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

export default
firebase.initializeApp({
  apiKey: 'AIzaSyCvnq39Ud_ADopjYhXsBmiwjzlIS0vthV8',
  authDomain: 'hacktivkanban.firebaseapp.com',
  databaseURL: 'https://hacktivkanban.firebaseio.com',
  projectId: 'hacktivkanban',
  storageBucket: 'hacktivkanban.appspot.com',
  messagingSenderId: '274304773274',
});
