<template>
  <div class='home' >
     <div class="row" style="width: 100%">
      <div v-for="(category,index) in categories" :key="index" class="column" style="border: 1px solid red">
        <categorycomp :title="category" :nextTitle="categories[index+1]" :preTitle="categories[index-1]"/>
      </div>  
    </div>
  </div>
</template>

<script>
import categorycomp from '@/components/Category.vue'

export default {
  name: 'home',
  data: function(){
    return {
      categories: ['Back-Log', 'To-Do', "Doing", "Done"]
    }
  },
  components: {
    categorycomp
  }
}
</script>
<style scoped>
.row{
  display: flex;
}
.column {
  float: left;
  width: 25%;
}
</style>
