<template>
    <div>
        <b-row class="mt-5">
            <b-col cols="4"></b-col>
            <b-col cols="4" style="text-align: center;">
                <b-img class="mb-4" src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/115/1510258115_4909a7ea-1a8c-40fb-ba9c-6bae5e917252.png?cb=1544980667"></b-img>
                <b-form>
                    <b-form-input v-model="taskName" placeholder="Task name"></b-form-input>
                    <b-button @click.prevent="createTask" class="mt-2" type="submit" variant="secondary" block>Submit</b-button>
                </b-form>
            </b-col>
            <b-col cols="4"></b-col>
        </b-row>
    </div>
</template>

<script>
import database from '../assets/config.js'

export default {
    name: 'mainHeader',
    data()  {
        return{
            taskName: ''
        }
    },
    methods: {
        createTask() {
            database.ref('/').push({
                title: this.taskName,
                status: 'Pre-Log'
            })
            this.taskName = ''
        }
    }
}
</script>
