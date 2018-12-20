<template>
<div >
    <v-list :style="styleColor"  >
       <h3>{{titleCard}}</h3>
    </v-list>
    <div v-for="element in listData" :key="element[0]" style="margin: 2px 2px;">
    <v-hover>
    <v-list :class=" `elevation-${hover ? 12 : 2}`" class="mx-auto" slot-scope="{hover}">
    <v-hover>
        <v-card :max-width="300" :class=" `elevation-${hover ? 12 : 2}`" class="mx-auto" slot-scope="{hover}">
        <v-card-title style="border-bottom: 2px solid #eee">
          <div>
            <h5 class="headline mb-0">{{element[1].name}}</h5>
            <!-- <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div> -->
          </div>  
        </v-card-title>

        <v-card-text>
            <p>point: {{element[1].point}}</p>
            <p>assign to: {{element[1].assignedTo}}</p>
        </v-card-text>

        <v-card-actions>
          <show-detail :detailTask="element"/>
        </v-card-actions>
      </v-card>
    </v-hover>   
    </v-list>
    </v-hover>   
    </div>
   
</div>
</template>

<script>
import showDetail from './detail.vue'
export default {
    data (){
        return {
            
        }
    },
    components:{

        showDetail
    },
    props: ['titleCard','listData', 'styleColor']
}
</script>

<style scoped>

</style>
