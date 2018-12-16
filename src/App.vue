<template>
  <div id="app">
    <div id="nav" class="row">
      <div class="col-6" style="justify-content: flex-first;">KanBan</div>
      <div class="col-6" style="justify-content: flex-end">
        <button type="button" class="btn btn-sm btn-info" @click="showModal">
           New Task
        </button>
        <NewTask v-show="isModalVisible" @close="closeModal"/>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NewTask from '@/components/NewTask.vue';

 export default {
    name: 'app',
    components: {
      NewTask,
    },
    data () {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    },
  };
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
.col-6 {
  display: flex;
}

</style>
