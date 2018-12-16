<template>
    <div>
        <div v-for="(data, index) in dataKanban.data" :key="index">
            <h4>{{ data[1].title }}</h4>
            <div class="container-button">
                <div>Point: {{ data[1].point }}</div>
                <div>Assigned To: {{ data[1].assignedTo }}</div>
            </div>
            <button
                :class="'btn btn-outline-'+dataKanban.color+' btn-sm btn-block'"
                @click="$emit('show-modal-detail', { dataKanban: dataKanban, dataContent: data} )"
            >View Detail</button>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Content',
    props: ['dataKanban'],
}
</script>