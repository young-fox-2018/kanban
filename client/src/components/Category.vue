<template>
    <div class="container">
        <div v-if="title === 'Back-Log'" class="alert alert-danger" role="alert">
            <strong> {{title}} </strong>
        </div>
        <div v-if="title === 'To-Do'" class="alert alert-dark" role="alert">
            <strong> {{title}} </strong>
        </div>
        <div v-if="title === 'Doing'" class="alert alert-primary" role="alert">
            <strong> {{title}} </strong>
        </div>
        <div v-if="title === 'Done'" class="alert alert-success" role="alert">
            <strong> {{title}} </strong>
        </div>


        <div class="CategoryComp" style="overflow: scroll; height: 500px; width: 100%;">
            <div v-for="(task, index) in tasks" :key="index" class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ task.title }}</h5>
                    <p class="card-text" style="text-align: left;">
                        <strong>Description: </strong><br>
                        {{ task.description }}<br><br>
                        <strong>Assigned To:</strong><br>
                        {{ task.assigned }}<hr>
                    <button v-if="preTitle" @click.prevent="backTask(task)" class="btn btn-secondary">Move Back</button>
                    <button v-if="nextTitle" @click.prevent="sendTask(task)" class="btn btn-success">Continue</button>
                    <button @click.prevent="delTask(task.title)" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Firebase from '@/config/keyfile.js'
let database = Firebase.database()

export default {
    props: ['title', 'nextTitle', 'preTitle'],
    name: 'Component',
    data: function(){
        return {
            tasks: [],
            key: 0
        }
    },
    created() {
        this.allTasks()
    },
    methods: {
        allTasks(){
            database.ref(`tasks/${this.title}/`).on('value', (snapshot) => {
                this.tasks = []
                let titles = Object.keys ( snapshot.val() )
                titles.forEach(task => {
                    database.ref(`tasks/${this.title}/${task}`).on('value', (snapshot) => {
                        this.tasks.push(snapshot.val())
                    })
                })
            })
        },
        delTask(taskInput){
            database.ref(`tasks/${this.title}/${taskInput}`).remove()
        },
        sendTask(task){
            database.ref(`tasks/${this.nextTitle}/${task.title}`).set({
                title: task.title,
                description: task.description,
                assigned: task.assigned,
                category: this.nextTitle
            })
            this.delTask(task.title)
        },
        backTask(task){
            database.ref(`tasks/${this.preTitle}/${task.title}`).set({
                title: task.title,
                description: task.description,
                assigned: task.assigned,
                category: this.preTitle
            })
            this.delTask(task.title)
        }
    }
}
</script>

<style>
.alert{
    margin: 0 auto;
}
</style>
