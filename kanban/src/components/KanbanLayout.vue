<template>
    <div class="kanbancard">
        <v-card v-if="todo.name==='Back-Log'" color="orange">
        <v-card-text class="px-0">{{todo.name}}</v-card-text>
        </v-card>
         <v-card v-else-if="todo.name==='To-Do'" color="yellow">
        <v-card-text class="px-0">{{todo.name}}</v-card-text>
        </v-card>
         <v-card v-else-if="todo.name==='Doing'" color="blue">
        <v-card-text class="px-0">{{todo.name}}</v-card-text>
        </v-card>
         <v-card v-else-if="todo.name==='Done'" color="green">
        <v-card-text class="px-0">{{todo.name}}</v-card-text>
        </v-card>
        <kanbanContent v-for="(task) in todo.tasks" :key="task.id" :task="task" :name="todo.name"></kanbanContent>
    </div>
</template>

<script>
import kanbanContent from '@/components/KanbanContent.vue'
export default {
    name: 'KanbanLayout',
    data () {
        return {}
    },
    components: {
        kanbanContent
    },
    props:['todo'],
    created () {
        this.titleTask = this.title
    }
}
</script>

<style>

</style>

