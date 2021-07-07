<template>
    <div>
        <b-card :header="header"
                header-tag="header"
                footer-tag="footer"
                >
                <content-card :task="task" :title="header" v-for="(task, index) in tasks" :key="index"></content-card>
        </b-card>
    </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'

export default {
    name: 'kanban-card',
    props: {
        header: String,
        tasks: Array
    },
    components: {
        ContentCard
    }
}
</script>

