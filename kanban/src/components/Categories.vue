<template>
  <div class="card">
    <h2>{{data.name}}</h2>
    <Contents v-for="(item) in data.tasks" :key="item.id" :item="item" :name="data.name"></Contents>  <!-- giving props -->
  </div>
</template>

<script>
import Contents from '@/components/Contents.vue'
export default {
  name: 'Categories',
  components: {
    Contents
  },
  data: function () {
    return {}
  },
  props: ['data'],
  created () {
    this.cardTitle = this.title
  }
}
</script>

<style scoped>
.card {
  font-size: 10px;
  color: #4684f6;
  width: 100%;
  min-height: 400px;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
}
.card h2 {
  padding: 20px;
}
</style>
