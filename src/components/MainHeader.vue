<template>
    <div id="header">
        <h2>KannBan</h2>
        <form action="" @submit.prevent="submitTask">
        <input type="text" class="form-control my-3" v-model="newTask" placeholder="Your new task here ....">
        </form>
    </div>
</template>

<script>
import database from '../assets/config.js'

export default {
    name: 'MainHeader',
    data(){
        return {
            newTask: ''
        }
    }, 
    methods: {
        submitTask(){
            database.ref('/').push({
                name: this.newTask,
                status: 'Pre-Log'
            })
            this.newTask = ''
        }
    }
}
</script>
