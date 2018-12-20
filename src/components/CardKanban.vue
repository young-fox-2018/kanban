<template>
  <div class="my-2">
    <!-- {{item}} -->
    <b-card class="text-left">
      <div slot="header">
        <div class="title">{{kanban.title}}</div>
      </div>
      <p>Point: {{kanban.point}}</p>
      <p>Assigned to: {{kanban.assigned}}</p>
      <div slot="footer" class="text-center">
        <b-button variant="primary" @click="modalDetail">Detail</b-button>
      </div>
    </b-card>

  </div>
</template>

<script>
// import ModalDetail from '@/components/ModalDetail.vue';

export default {
  name: 'cardkanban',
  props: ['kanban'],
  // components: {
  //   ModalDetail,
  // },
  methods: {
    modalDetail() {
      // this.$store.commit('modalDetail', true);
      console.log('kesisini', this.kanban);
      this.$emit('modaldetail', this.kanban);
    },
  },
};
</script>

<style>

</style>
