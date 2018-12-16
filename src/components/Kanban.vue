<template>
  <div>
    <div class="content">
      <div class="task" v-for="(datum,index) in data" :key="index"> 
        <div class="title">
          {{datum.title}}
        </div>
        <div class="separator"></div>
        <div class="summary">
          Point: {{datum.point}}
          <br>
          Assigned To: {{datum.assignedto}}
          <br>
          <button class="btn btn-sm btn-info" @click="storeDetail(datum, status, previous, next)">Details</button>
          <Detail v-show="isModalVisible" @close="closeModal" :data="currentDetail"> </Detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from '@/components/Detail.vue';

export default {
  name: 'kanban',
  components: {
    Detail
  },
  props: ["data", "status", "previous", "next"],
  data() {
    return {
      isModalVisible: false,
      currentDetail: {
        taskId: "",
        title: "",
        description: "",
        point: 0,
        assignedto: "",
        status: "",
        next: null,
        previous: null
      }
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    storeDetail(datum, status, previous, next) {
      this.currentDetail.taskId = datum.taskId
      this.currentDetail.title = datum.title
      this.currentDetail.description = datum.description
      this.currentDetail.point = datum.point
      this.currentDetail.assignedto = datum.assignedto
      this.currentDetail.status = status
      this.currentDetail.previous = previous
      this.currentDetail.next = next
      this.showModal()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  min-height: 500px;
  border: 1px solid grey;
  padding: 10px
}
.task {
  border: 1px solid slategray;
  margin-bottom: 10px;
  text-align: left;
  padding: 5px
}
.separator {
  border: 1px solid lightgray
}
.summary {
  font-size: 14px;
  color: slategray
}
</style>
