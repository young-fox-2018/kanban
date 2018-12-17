<template>
  <div>
    <div v-if="this.name === 'Pre-Log'" id="cardContentPreLog" class="cardContent">
      <h5>{{item.title}}</h5>
      Description to:<br>
      {{item.description}}
      <br>
      Assign to:<br>
      {{item.assignTo}}
      <div class="container-button-delete">
        <div>
          <h4 @click="removeItem">delete</h4>
        </div>
      </div>
      <div class="container-button-other">
        <div>
          <h4 @click="actionOne">{{buttonOne}}</h4>
        </div>

        <div>
          <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h4>
        </div>
      </div>
    </div>
    <div v-if="this.name === 'To-Do'" id="cardContentTo-Do" class="cardContent">
      <h5>{{item.title}}</h5>
      Description to:<br>
      {{item.description}}
      <br>
      Assign to:<br>
      {{item.assignTo}}
      <div class="container-button-delete">
        <div>
          <h4 @click="removeItem">delete</h4>
        </div>
      </div>
      <div class="container-button-other">
        <div>
          <h4 @click="actionOne">{{buttonOne}}</h4>
        </div>

        <div>
          <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h4>
        </div>
      </div>
    </div>
    <div v-if="this.name === 'On-Going'" id="cardContentOn-Going" class="cardContent">
      <h5>{{item.title}}</h5>
      Description to:<br>
      {{item.description}}
      <br>
      Assign to:<br>
      {{item.assignTo}}
      <div class="container-button-delete">
        <div>
          <h4 @click="removeItem">delete</h4>
        </div>
      </div>
      <div class="container-button-other">
        <div>
          <h4 @click="actionOne">{{buttonOne}}</h4>
        </div>

        <div>
          <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h4>
        </div>
      </div>
    </div>
    <div v-if="this.name === 'Finished'" id="cardContentFinished" class="cardContent">
      <h5>{{item.title}}</h5>
      Description to:<br>
      {{item.description}}
      <br>
      Assign to:<br>
      {{item.assignTo}}
      <div class="container-button-delete">
        <div>
          <h4 @click="removeItem">delete</h4>
        </div>
      </div>
      <div class="container-button-other">
        <div>
          <h4 @click="actionOne">{{buttonOne}}</h4>
        </div>

        <div>
          <h4 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h4>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import database from '@/connection/fireb.js'

export default {

  name: 'ContentCard',

  data: function () {
    return {
      buttonOne: '',
      buttonTwo: ''
    }
  },

  props: ['item', 'name'],

  methods: {
    actionOne () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        assignTo: this.item.assignTo,
        description: this.item.description,
        status: this.buttonOne
      })
    },

    actionTwo () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        assignTo: this.item.assignTo,
        description: this.item.description,
        status: this.buttonTwo
      })
    },

    removeItem () {
      if (localStorage.getItem('jtoken')){
        axios({
          method:'get',
          url:'http://localhost:3000/users/checkUser',
          headers:{
            jtoken: localStorage.getItem('jtoken')
          }
        })
        .then((response)=> {
          console.log(response.data)
          if (response.data === 'User authorized'){
            database.ref(`/${this.item.id}`).remove()
          } else {
            this.$emit('invalid-login', error.response.data)
          }
        })
        .catch((error)=> {
          console.log(error)
          this.$emit('invalid-login', error.response.data)
        })
      } 
      else {
        this.$emit('invalid-delete')
      }
      

    }
    
  },

  created () {
    if (this.name === 'Pre-Log') {
      this.buttonOne = 'To-Do'
      this.buttonTwo = null
    } 
    else if (this.name === 'To-Do') {
      this.buttonOne = 'Pre-Log'
      this.buttonTwo = 'On-Going'
    } 
    else if (this.name === 'On-Going') {
      this.buttonOne = 'To-Do'
      this.buttonTwo = 'Finished'
    } 
    else if (this.name === 'Finished') {
      this.buttonOne = 'On-Going'
      this.buttonTwo = null
    }
  }

}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: rgb(255, 255, 255);
  width: 70%;
  min-height: 100px;
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

#cardContentPreLog {
  background-color: #e68e0a;
}

#cardContentTo-Do {
  background-color: #0b8a90;
}

#cardContentOn-Going {
  background-color: #1454cc;
}

#cardContentFinished {
  background-color: #1fd434;
  color: black
}

.card h5 {
  padding-top: 20px;
  font-size: 20px;
}

.container-button-other h4 {
  color: #4208ff;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
  font-size: 10px;
}

.container-button-delete h4 {
  color: #000000;
  background-color: rgb(206, 38, 38);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
  font-size: 10px;
}
</style>