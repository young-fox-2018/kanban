# KANBAN DEPLOY URL
    https://kanban-ea105.firebaseapp.com/

# FIREBASE CONFIG (src/assets/config.js)
    import firebase from 'firebase'

    var config = {
        apiKey: "<API_KEY>",
        authDomain: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
        projectId: "<PROJECT_ID>",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderId: "<SENDER_ID>",
    }

    firebase.initializeApp(config)
    const database = firebase.database()
    export default database

# KENDALA
    Waktu sempit, fitur standard banget, nothing special