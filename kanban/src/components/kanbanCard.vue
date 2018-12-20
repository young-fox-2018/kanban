<template>
    <b-col cols="3" class="mt-5">
        <b-card class="mb-5" style="text-align: center; min-height: 320px;">
            <p><strong>{{ data.name }}</strong></p>
            <contentCard v-for="item in data.tasks" :key="item.id" :item="item" :name="data.name"/>
        </b-card>
    </b-col>
</template>

<script>
import contentCard from '@/components/contentCard.vue'

export default {
    name: 'kanbanCard',
    components: {
        contentCard
    },
    data() {
        return {}
    },
    props: ['data'],
}
</script>

