<template>
  <div class="cardContent">
    <h2>{{item.title}}</h2>
    <div class="container-button">
      <div>
        <button class="h4" @click.prevent="goPrev">{{previous}}</button>
        <button class="h4" @click.prevent="goNext" v-if="next">{{next}}</button>
      </div>
      <div>
        <h4 @click="removeItem">delete</h4>
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'Contents',
  data: function () {
    return {
      previous: '',
      next: ''
    }
  },
  props: ['item', 'name'],
  methods: {
    goPrev () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.previous
      })
    },
    goNext () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.next
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    }
  },
  created () {
    if (this.name === 'Back-Log') {
      this.previous = 'To-Do'
      this.next = null
    } else if (this.name === 'To-Do') {
      this.previous = 'Back-Log'
      this.next = 'Doing'
    } else if (this.name === 'Doing') {
      this.previous = 'To-Do'
      this.next = 'Done'
    } else if (this.name === 'Done') {
      this.previous = 'Doing'
      this.next = null
    }
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: #fff;
  width: 70%;
  min-height: 100px;
  background-color: #4684f6;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
}
.card h2 {
  padding-top: 20px;
  font-size: 20px;
}
.container-button h4{
  color: #4684f6;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
button{
  color: #4684f6;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>
