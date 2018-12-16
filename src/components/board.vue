<template>
  <div class="columns is-variable is-1">
    <column v-for="(status, index) in statuses" :key="index + 1" :status="status"/>
  </div>
</template>

<script>
import column from "@/components/column";

export default {
  components: {
    column
  },

  data() {
    return {
      statuses: [0, 1, 2, 3]
    };
  },

  computed: {}
};
</script>

