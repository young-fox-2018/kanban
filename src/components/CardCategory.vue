<template>
  <b-card :border-variant="variant"
      :header="title"
      :header-bg-variant="variant"
      header-text-variant="white"
      align="center" class="my-2 ">

    <!-- isi kanban -->
    <div v-for="(item, i) in kanban" :key="i">
      <CardKanban  :kanban="item" v-if="item.status ==  typetask"
      @modaldetail="modalDetail"/>
    </div>
    <!-- /isi kanban -->
  </b-card>
</template>

<script>
import { mapState } from 'vuex';
import CardKanban from '@/components/CardKanban.vue';

export default {
  components: {
    CardKanban,
  },
  props: ['variant', 'typetask', 'title'],
  methods: {
    modalDetail(payload) {
      console.log('testing', payload);
      this.$store.commit('detailTask', payload);
      this.$store.commit('modalDetail', true);
    },
  },
  computed: {
    ...mapState(['kanban']),
  },
};
</script>

<style>

</style>
