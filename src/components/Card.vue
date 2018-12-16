<template>
    <div :class="'card border-'+dataKanban.color">
        <div class="card-header">{{ dataKanban.title }}</div>
        <div class="card-body">
            <Content
                :dataKanban="dataKanban"
                @show-modal-detail="showModalDetail"
            />
        </div>
    </div>    
</template>

<script>
import Content from '@/components/Content.vue'

export default {
    name: 'Card',
    props: ['dataKanban'],
    data() {
        return {};
    },
    components: {
        Content,
    },
    methods: {
        showModalDetail(getData) {
            this.$emit('show-modal-detail', getData);
        }
    },
}
</script>