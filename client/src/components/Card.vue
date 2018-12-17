<template>
    <div>
        <div class="card" style="height: 15rem;">
            <div class="card-body">
                <h5 class="card-title">{{ task.title }}</h5>
                <p class="card-text">{{ task.description }}</p>
                <p class="card-text">point: {{ task.point }}</p>
                <p class="card-text">assigned to: {{ task.assignedTo }}</p>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'to-do'" @click="changetoBacklog"> Back-Log </button>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'doing'" @click="changetoTodo"> To-Do </button>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'done'" @click="changetoDoing"> Doing </button>
                <button class="btn btn-danger btn-sm ml-1" @click="deleteTask"> Delete </button>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'back-log'" @click="changetoTodo"> To-Do </button>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'to-do'" @click="changetoDoing"> Doing </button>
                <button class="btn btn-warning btn-sm ml-1" v-if="task.status == 'doing'" @click="changetoDone"> Done </button>
            </div>
        </div>

    </div>
</template>

<script>
import database from '@/assets/config.js'

export default {
    props: [ 'task' ],
    methods: {
        deleteTask: function() {
            database.ref(`db/tasks/${this.task.id}`).remove()
        },

        changetoTodo: function() {
            database.ref(`db/tasks/${this.task.id}`).remove()
            database.ref(`db/tasks`).push({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assignedTo: this.task.assignedTo,
                status: "to-do"
            })
        },

        changetoBacklog: function() {
            database.ref(`db/tasks/${this.task.id}`).remove()
            database.ref(`db/tasks`).push({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assignedTo: this.task.assignedTo,
                status: "back-log"
            })
        },

        changetoDoing: function() {
            database.ref(`db/tasks/${this.task.id}`).remove()
            database.ref(`db/tasks`).push({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assignedTo: this.task.assignedTo,
                status: "doing"
            })
        },

        changetoDone: function() {
            database.ref(`db/tasks/${this.task.id}`).remove()
            database.ref(`db/tasks`).push({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assignedTo: this.task.assignedTo,
                status: "done"
            })
        }
    }
}
</script>
