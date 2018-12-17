<template>
 <div class="content">
     <v-layout row>
        <v-flex xs12>
          <v-card dark true>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-10">Task: </h3>
            <hr>
            <div>{{task.title}}</div>
          </div>
        </v-card-title>
      </v-card>
        </v-flex>
     </v-layout>
                <div>
                    <div>
                        <v-btn v-if="nextBtn==='Done'" @click="next" color="green" round small true>{{nextBtn}}</v-btn>
                        <v-btn v-else-if="nextBtn==='To-Do'" @click="next" color="yellow" round small true>{{nextBtn}}</v-btn>
                        <v-btn v-else-if="nextBtn==='Doing'" @click="next" color="blue" round small true>{{nextBtn}}</v-btn>
                    </div>
                    
                    <div>
                        <v-btn v-if="prevBtn==='Doing'" @click="prev" color="blue" round small true>{{prevBtn}}</v-btn>
                        <v-btn v-if="prevBtn==='To-Do'" @click="prev" color="yellow" round small true>{{prevBtn}}</v-btn>
                        <v-btn v-if="prevBtn==='Back-Log'" @click="prev" color="orange" round small true>{{prevBtn}}</v-btn>
                    </div>
                    <div>
                        <v-btn @click="deleteTask" color="red" round small true>Delete</v-btn>
                    </div>                 
            </div> 
     <v-card color="brown">
        <v-card-text class="px-0"></v-card-text>
        </v-card>
 </div>
</template>

<script>
import fire from '../assets/config.js'
export default {
    name: 'KanbanContent',
    data () {
        return {
            nextBtn: '',
            prevBtn: ''
        }
    },
    props: ['task', 'name'],
    created () {
        console.log(this.name)
        if(this.name === 'Back-Log') {
            this.nextBtn = 'To-Do',
            this.prevBtn = null
        } else if (this.name === 'To-Do') {
            this.nextBtn = 'Doing',
            this.prevBtn = 'Back-Log'
        } else if (this.name === 'Doing') {
            this.nextBtn = 'Done',
            this.prevBtn = 'To-Do'
        } else {
            this.nextBtn = null
            this.prevBtn = 'Doing'
        }
    },
    methods: {
        next () {
            fire.database().ref(`/${this.task.id}`).remove()
            fire.database().ref('/').push({
                title: this.task.title,
                position: this.nextBtn
            })
        },
        prev () {
            fire.database().ref(`/${this.task.id}`).remove()
            fire.database().ref('/').push({
                title: this.task.title,
                position: this.prevBtn
            })
        },
        deleteTask () {
            fire.database().ref(`/${this.task.id}`).remove()
        }
    }
}
</script>

<style scoped>


</style>


