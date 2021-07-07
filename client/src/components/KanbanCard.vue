<template>
  <div class="card">
    <h5>{{data.name}}</h5>
    <ContentCard 
      v-for="(item) in data.tasks" :key="item.id" 
      :item="item" 
      :name="data.name" 
      @invalid-delete="showInvalidDelete">
    </ContentCard>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'

export default {
  name: 'KanbanCard',

  components: {
    ContentCard
  },

  data: function () {
    return {}
  },

  props: ['data'],
  
  created () {
    this.cardTitle = this.title

  },

  methods: {
    showInvalidDelete: function () {
      this.$emit('showCannotDelete')
    }
  }
}
</script>

<style scoped>
.card {
  font-size: 10px;
  color: #000000;
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