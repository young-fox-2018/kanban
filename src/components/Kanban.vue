<template>
  <div class="container rounded shadow my-2">
    <h1>My Kanban</h1>
    <div class="row">
      <div class="col-12 text-right">
        <b-button variant="outline-primary" @click="modalAdd">Add Task</b-button>
        <ModalAdd/>
        <ModalDetail/>
      </div>
    </div>
    <div class="row">
      <div class="col-3 my-2">
        <CardCategory :kanban="kanban" :variant="'danger'"
        :typetask="'backlog'" :title="'Back Log'"/>
      </div>
      <div class="col-3 my-2">
        <CardCategory :kanban="kanban" :variant="'warning'"
        :typetask="'todo'" :title="'To Do'"/>
      </div>
      <div class="col-3 my-2">
        <CardCategory :kanban="kanban" :variant="'primary'"
        :typetask="'doing'" :title="'Doing'"/>
      </div>
      <div class="col-3 my-2">
        <CardCategory :kanban="kanban" :variant="'success'"
        :typetask="'done'" :title="'Done'"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalAdd from '@/components/ModalAdd.vue';
import ModalDetail from '@/components/ModalDetail.vue';
import CardCategory from '@/components/CardCategory.vue';

export default {
  components: {
    ModalAdd,
    ModalDetail,
    CardCategory,
  },
  mounted() {
    this.$store.dispatch('readData');
  },
  computed: {
    ...mapState(['kanban']),
  },
  methods: {
    modalAdd() {
      this.$store.dispatch('modalAdd');
    },
    modalDetail(payload) {
      console.log('testing', payload);
      this.$store.commit('detailTask', payload);
      this.$store.commit('modalDetail', true);
    },
  },
};
</script>

<style>
.container {
  background-color: white
}

.card:hover {
  /* webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; */
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  transition: all .45s ease-in-out;
  /* box-shadow: none; */
}
.title {
  font-weight: bold;
}
</style>
