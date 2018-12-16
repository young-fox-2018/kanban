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
        <!-- {{kanban}} -->
        <b-card border-variant="danger"
            header="Back-Log"
            header-bg-variant="danger"
            header-text-variant="white"
            align="center" class="my-2 ">

          <!-- isi kanban -->
          <div v-for="(item, i) in kanban" :key="i">
            <CardKanban  :kanban="item" v-if="item.status ==  'backlog'"
            @modaldetail="modalDetail"/>
          </div>
          <!-- /isi kanban -->
        </b-card>
      </div>
      <div class="col-3 my-2">
        <b-card border-variant="warning"
            header="To-Do"
            header-bg-variant="warning"
            header-text-variant="white"
            align="center" class="my-2 ">

          <!-- isi kanban -->
          <div v-for="(item, i) in kanban" :key="i">
            <CardKanban  :kanban="item" v-if="item.status ==  'todo'"
            @modaldetail="modalDetail"/>
          </div>
          <!-- /isi kanban -->
        </b-card>
      </div>
      <div class="col-3 my-2">
        <b-card border-variant="primary"
            header="Doing"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center" class="my-2 ">

          <!-- isi kanban -->
          <div v-for="(item, i) in kanban" :key="i">
            <CardKanban  :kanban="item" v-if="item.status ==  'doing'"
            @modaldetail="modalDetail"/>
          </div>
          <!-- /isi kanban -->
        </b-card>
      </div>
      <div class="col-3 my-2">
        <b-card border-variant="success"
            header="Done"
            header-bg-variant="success"
            header-text-variant="white"
            align="center" class="my-2 ">

          <!-- isi kanban -->
          <div v-for="(item, i) in kanban" :key="i">
            <CardKanban  :kanban="item" v-if="item.status ==  'done'"
            @modaldetail="modalDetail"/>
          </div>
          <!-- /isi kanban -->
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ModalAdd from '@/components/ModalAdd.vue';
import ModalDetail from '@/components/ModalDetail.vue';
import CardKanban from '@/components/CardKanban.vue';

export default {
  components: {
    ModalAdd,
    CardKanban,
    ModalDetail,
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
