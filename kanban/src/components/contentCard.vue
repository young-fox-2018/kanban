<template>
    <div>
        <b-card class="mb-3" bg-variant="light">
            <h4>{{ item.title }}</h4>
            <hr>
            <b-button variant="danger" block @click="removeItem">Delete</b-button>
            <b-button variant="secondary" block @click="actionOne">{{ buttonOne }}</b-button>    
            <b-button variant="secondary" block v-if="buttonTwo" @click="actionTwo">{{ buttonTwo }}</b-button>
        </b-card>
    </div>
</template>

<script>
import database from '@/assets/config.js'

export default {
    name: 'contentCard',
    data() {
        return {
            buttonOne: '',
            buttonTwo: ''
        }
    },
    props: ['item', 'name'],
    methods: {
        actionOne() {
            database.ref(`/${this.item.id}`).remove()
            database.ref('/').push({
                title: this.item.title,
                status: this.buttonOne
            })
        },
        actionTwo() {
            database.ref(`/${this.item.id}`).remove()
            database.ref('/').push({
                title: this.item.title,
                status: this.buttonTwo
            })
        },
        removeItem() {
            database.ref(`/${this.item.id}`).remove()
        }
    },
    created () {
        if (this.name === 'Pre-Log') {
            this.buttonOne = 'To-Do'
            this.buttonTwo = null
        } 
        else if (this.name === 'To-Do') {
            this.buttonOne = 'Pre-Log'
            this.buttonTwo = 'On-Going'
        } 
        else if (this.name === 'On-Going') {
            this.buttonOne = 'Finished'
            this.buttonTwo = 'To-Do'
        } 
        else if (this.name === 'Finished') {
            this.buttonOne = 'On-Going'
            this.buttonTwo = null
        }
    }
}
</script>

