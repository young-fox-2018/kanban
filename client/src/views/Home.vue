<template>
  <div class="container">
    <Nav @getData="callGetData"/>
    <Card :callData="statusGetData"/>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    Nav,
    Card
  },
  data() {
    return {
      statusGetData: null
    }
  },
  methods: {
    callGetData(v) {
      console.log(this.statusGetData, 'before')
      this.statusGetData = v
      console.log(this.statusGetData, 'after')
      // this.statusGetData = null
    }
  }
}
</script>

