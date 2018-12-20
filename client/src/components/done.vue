<template>
  <div>
    <h1>DONE</h1>
    <hr>
      <v-card v-for="list in done" :key="list.id" class="card">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ list.title }}</h3>
          <hr>
          <br>
          <h4>Point: {{ list.point }}</h4>
          <h4>Assigned to: {{ list.assigned }}</h4>
        </div>
      </v-card-title>

      <v-slide-y-transition>
        <v-card-text v-show="show">
         description: {{ list.description }}
        </v-card-text>
      </v-slide-y-transition>

      <v-card-actions>
        <v-btn fab small dark color="green" @click="moveDone(list)"><v-icon dark></v-icon>Doing</v-btn>
        <v-btn fab small dark color="cyan" @click="show = !show">
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn fab small dark color="red" @click="remove(list.id)"><v-icon dark>delete</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'done',
  data () {
    return {
      done: [],
      show: false
    } 
  },
  methods: {
    remove (id) {
      firebase.firestore().collection('Done').doc(id).delete()
    },
    moveDone (data) {
      firebase.firestore().collection('Done').doc(data.id).delete()
      delete data.id
      firebase.firestore().collection('Doing').add(data)
    }
  },
  mounted () {
    firebase.firestore().collection('Done').onSnapshot(({docs}) => {
      let task = []
      docs.forEach(e => {
        let temp = e.data()
        temp.id = e.id
        task.push(temp)
      });
      this.done = task
      console.log(task)
    }, err => {
      console.log(err)
    })
  }
}
</script>

<style>
  .card {
    margin: 3vw;
  }
  h1 {
    text-align: center
  }
</style>
