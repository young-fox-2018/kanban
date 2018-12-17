<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item active">{{ board.name }} </li>
            <Card v-for="(task, index) in board.tasks" :task="task" :key="index"></Card>
        </ul>
    </div>
</template>


<script>
import Card from '@/components/Card.vue'

export default {
    components: { Card },
    props: ['board']
}
</script>
