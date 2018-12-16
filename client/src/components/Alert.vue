<template>
  <b-alert :show="dismissCountDown"
             dismissible
             :variant="type"
             fade
             @dismissed="dismissCountDowns=0">
      {{message}}
  </b-alert>
</template>
<script>
export default {
  props: ['message', 'type', 'dismissCountDown'],
  data () {
    return {
      dismissCountDowns: this.dismissCountDown
    }
  }
}
</script>
