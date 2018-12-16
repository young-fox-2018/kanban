<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
        Show Detail
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
         {{detailTask[1].name}}
        </v-card-title>

        <v-card-text>
            <p>description: {{detailTask[1].descripton}}</p>
            <p>point: {{detailTask[1].point}}</p>
            <p>asign to: {{detailTask[1].assignedTo}}</p>
        </v-card-text>
           

    
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="currentState != 'back-log'"
            color="primary"
            flat
            @click="toPrev"
          >
            {{prevbtn}}
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="deleteTask"
          >
            Delete
          </v-btn>

          <v-btn
          v-if="currentState !== 'done'"
            color="primary"
            flat
            @click="toNext"
          >
            {{nextbtn}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import db from '../assets/config.js'
import {functions} from 'firebase'

  export default {
      name: 'showDeatail',
    data () {
      return {
        dialog: false,
        currentState: '',
        prevbtn: '',
        nextbtn: '',
        taskId: '',
        thetask: ''
      }
    },
    methods: {
        toNext(){
            let data = {
                name: this.thetask.name,
                description: this.thetask.description,
                point: this.thetask.point,
                assignedTo: this.thetask.assignedTo,
                current: this.nextbtn
            }
            let taskId = String(this.taskId)
            let selector = String(this.currentState)
            // console.log(selector)
            db.ref(`task/${data.current}`)
                .push(data)
            db.ref(`task/${selector}/${taskId}`).remove()
        },
        deleteTask (){
            let taskId = String(this.taskId)
            let selector = String(this.currentState)
            db.ref(`task/${selector}/${taskId}`).remove()
        },
        toPrev (){
              let data = {
                name: this.thetask.name,
                description: this.thetask.description,
                point: this.thetask.point,
                assignedTo: this.thetask.assignedTo,
                current: this.prevbtn
            }
            let taskId = String(this.taskId)
            let selector = String(this.currentState)
            // console.log(selector)
            db.ref(`task/${data.current}`)
                .push(data)
            db.ref(`task/${selector}/${taskId}`).remove() 
        }
    },
    props: ['detailTask'],
    created(){
        this.thetask = this.detailTask[1]
        this.currentState = this.detailTask[1].current
        this.taskId = this.detailTask[0]
           if (this.detailTask[1].current){
        if( this.detailTask[1].current == 'back-log'){
            this.prevbtn = ''
            this.nextbtn = 'to-do'
        } else if(this.detailTask[1].current == 'to-do'){
            this.prevbtn = 'back-log'
            this.nextbtn = 'doing'
        } else if (this.detailTask[1].current == 'doing'){
            this.prevbtn = 'to-do'
            this.nextbtn = 'done'
        } else {
            this.prevbtn = 'doing'
            this.nextbtn = ''
        }}
        
       
    },
    mounted (){
      
    }
  }
</script>