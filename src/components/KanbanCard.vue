<template>
  <div class="card">
    <div class="card">
      <div id="Back-Log" class="card-header" v-if="data.name==`Back-Log`">{{data.name}}</div>
      <div id="To-Do" class="card-header" v-if="data.name==`To-Do`">{{data.name}}</div>
      <div id="Doing" class="card-header" v-if="data.name==`Doing`">{{data.name}}</div>
      <div id="Done" class="card-header" v-if="data.name==`Done`">{{data.name}}</div>
      <ContentCard v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name"></ContentCard>
    </div>
  </div>
</template>

<script>
import ContentCard from "@/components/ContentCard.vue";
export default {
  name: "KanbanCard",
  components: {
    ContentCard
  },
  data: function() {
    return {};
  },
  props: ["data"],
  created() {
    this.cardTitle = this.title;
  }
};
</script>

<style scoped>
.card {
  margin: 5px;
}
#Back-Log {
  font-size: 20px;
  color: #ffff;
  width: 100%;
  height: 100%;
  background-color: red;
}
#To-Do {
  font-size: 20px;
  color: #ffff;
  width: 100%;
  height: 100%;
  background-color: #ff9900;
}
#Doing {
  font-size: 20px;
  color: #ffff;
  width: 100%;
  height: 100%;
  background-color: #0066ff;
}
#Done {
  font-size: 20px;
  color: #ffff;
  width: 100%;
  height: 100%;
  background-color: green;
}
</style>
