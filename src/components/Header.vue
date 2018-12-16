<template>
    <nav class="navbar navbar-expand-md fixed-top bg-light">
        <span class="pr-5"><h3>Kanban Zainal</h3></span>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline">
                <a href="#" class="btn btn-outline-primary mr-1" @click="showModal = true">
                    <i class="fa fa-telegram"></i> Add Task
                </a>
            </form>
        </div>
        <Modal v-if="showModal" @close="showModal = false" />
    </nav>
</template>

<script>
    import Modal from '@/components/Modal.vue';
    
    export default {
        name: 'Header',
        components: {
            Modal,
        },
        data: function() {
            return {
                showModal: false,
            };
        },
    };
</script>