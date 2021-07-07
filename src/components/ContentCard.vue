<template>
    <div>
        <b-card bg-variant="info"
                text-variant="white"
                :header="task.name"
                class="text-center mb-2">
            <b-card-body>
                <div>
                    <b-btn variant="danger" class="btn-sm mr-1 mb-1" @click="removeTask"><i class="fas fa-trash"></i> delete</b-btn>
                </div>
                <div class="row"> 
                    <b-btn variant="warning" class="mr-1 btn-sm" v-if="title !== 'Pre-Log'" @click="leftAction"><i class="fas fa-arrow-left"></i> {{leftTask}}</b-btn>
                    <b-btn variant="primary" class="btn-sm" v-if="title != 'Finished'" @click="rightAction"><i class="fas fa-arrow-right"></i> {{rightTask}}</b-btn>
                </div>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import database from '../assets/config.js'

export default {
    props: {
        title: String,
        task: Object
    },
    data(){
        return {
            leftTask: '',
            rightTask: ''
        }
    },
    methods: {
        getTitle(){
            switch (this.title) {
                case 'Pre-Log':
                    // console.log('haloo')
                    this.leftTask = 'Delete'
                    this.rightTask = 'To-Do'
                    break;
                case 'To-Do':
                    this.leftTask = 'Pre-Log'
                    this.rightTask = 'On-Going'
                    break;
                case 'On-Going':
                    this.leftTask = 'To-Do',
                    this.rightTask = 'Finished'
                    break;
                case 'Finished':
                    this.leftTask = 'On-Going'
                    this.rightTask = 'Delete'
                    break;
                default:
                    break;
            }
        },
        leftAction(){
            database.ref(`/${this.task.id}`).remove()
            database.ref(`/`).push({
                name: this.task.name,
                status: this.leftTask
            })
        },
        rightAction(){
            database.ref(`${this.task.id}`).remove()
            database.ref('/').push({
                name: this.task.name,
                status: this.rightTask
            })
        },
        removeTask(){
            database.ref(`/${this.task.id}`).remove()
        }
    }, 
    mounted(){
        this.getTitle()
    }
}
</script>



