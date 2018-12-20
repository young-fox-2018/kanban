<template>
  <div>
    <h1>DOING</h1>
    <hr>
      <v-card v-for="list in doing" :key="list.id" class="card">
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
        <v-btn fab small dark color="green" @click="moveDoing(list)"><v-icon dark></v-icon>Todo</v-btn>
        <v-btn fab small dark color="cyan" @click="show = !show">
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn fab small dark color="red" @click="remove(list.id)"><v-icon dark>delete</v-icon></v-btn>
        <v-btn fab small dark color="green" @click="done(list)"><v-icon dark>send</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'doing',
  data () {
    return {
      doing: [],
      show: false
    } 
  },
  methods: {
    remove (id) {
      firebase.firestore().collection('Doing').doc(id).delete()
    },
    done (data) {
      this.remove(data.id)
      delete data.id
      firebase.firestore().collection('Done').add(data)
    },
    moveDoing (data) {
      firebase.firestore().collection('Doing').doc(data.id).delete()
      delete data.id
      firebase.firestore().collection('Todo').add(data)
    }
  },
  mounted () {
    firebase.firestore().collection('Doing').onSnapshot(({docs}) => {
      let task = []
      docs.forEach(e => {
        let temp = e.data()
        temp.id = e.id
        task.push(temp)
      });
      this.doing = task
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
    text-align: center;
  }
</style>
