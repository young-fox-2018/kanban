<template>
    <div class="row pt-4 pl-5 pr-5">
        <div class="col-3">
            <Card
                :data-kanban="data1"
                @show-modal-detail="openModalDetail"
            />
        </div>
        <div class="col-3">
            <Card
                :data-kanban="data2"
                @show-modal-detail="openModalDetail"
            />
        </div>
        <div class="col-3">
            <Card
                :data-kanban="data3"
                @show-modal-detail="openModalDetail"
            />
        </div>
        <div class="col-3">
            <Card
                :data-kanban="data4"
                @show-modal-detail="openModalDetail"
            />
        </div>

        <modal-detail
            v-if="showModalDetail.status"
            @close="showModalDetail.status = false; showModalDetail.data = [];"
            :get-data="showModalDetail.data"
        />
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import ModalDetail from '@/components/ModalDetail.vue';
import database from '../assets/config.js'

export default {
    name: 'Home',
    components: {
        Card, ModalDetail
    },
    data() {
        return {
            data1: {
                color: 'danger',
                title: 'Back-Log',
                data: [],
            },
            data2: {
                color: 'warning',
                title: 'To-Do',
                data: [],
            },
            data3: {
                color: 'primary',
                title: 'Doing',
                data: [],
            },
            data4: {
                color: 'success',
                title: 'Done',
                data: [],
            },
            showModalDetail: {
                status: false,
                data: [],
            },
        };
    },
    methods: {
        openModalDetail(getData) {
            this.showModalDetail.status = true;
            this.showModalDetail.data = getData;
        },
    },
    mounted() {
        database.ref('/').on('value', snapshot => {
            let tmp1 = [];
            let tmp2 = [];
            let tmp3 = [];
            let tmp4 = [];
            if(snapshot.val()) {
                Object.entries(snapshot.val()).forEach(result => {
                    if(result[1].status === 1) {
                        tmp1.push(result);
                    }else if(result[1].status === 2) {
                        tmp2.push(result);
                    }else if(result[1].status === 3) {
                        tmp3.push(result);
                    }else if(result[1].status === 4) {
                        tmp4.push(result);
                    }
                });
            }
            this.data1.data = tmp1;
            this.data2.data = tmp2;
            this.data3.data = tmp3;
            this.data4.data = tmp4;
        });
    },
}
</script>