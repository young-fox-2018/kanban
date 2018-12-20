<template>
  <div class="home">
    <div class="row">
      <div id="back-log" class="col-lg-3 col-sm-3 border bg-danger p-1">
        <b-card header="Back-Log"
                header-tag="header"
                header-bg-variant="danger"
                header-text-variant="white">
            <div class="card-text container">
              <b-card class="mb-2" v-for="(todo, index) in data['back-log']" :key="index" :header="todo.title"
                header-tag="header"
                header-bg-variant="danger"
                header-text-variant="white">
              <div class="card-text text-left">
                <table class="table">
                  <tr>
                    <td>
                      <span class="badge badge-info">Point :</span>
                    </td>
                    <td>
                      {{todo.point}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="badge badge-info">Assigned :</span>
                    </td>
                    <td>
                       {{todo.assigned}}
                    </td>
                  </tr>
                </table>
              </div>
              <b-button
                       @click="showDetail(todo)" variant="primary">Show Detail</b-button>
              </b-card>
            </div>
        </b-card>
      </div>
      <div id="To-Do" class="col-lg-3 col-sm-3 border bg-warning p-1">
        <b-card header="Todo"
                header-tag="header"
                header-bg-variant="warning"
                header-text-variant="white">
            <div class="card-text container">
              <b-card class="mb-2" v-for="(todo, index) in data['todo']" :key="index" 
                :header="todo.title"
                header-tag="header"
                header-bg-variant="warning"
                header-text-variant="white">
              <div class="card-text text-left">
                <table class="table">
                  <tr>
                    <td>
                      <span class="badge badge-info">Point :</span>
                    </td>
                    <td>
                      {{todo.point}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="badge badge-info">Assigned :</span>
                    </td>
                    <td>
                       {{todo.assigned}}
                    </td>
                  </tr>
                </table>
              </div>
              <b-button
                      @click="showDetail(todo)" variant="primary">Show Detail</b-button>
              </b-card>
            </div>
        </b-card>
      </div>
      <div id="Doing" class="col-lg-3 col-sm-3 border bg-primary p-1">
        <b-card header="Doing"
                header-tag="header"
                header-bg-variant="primary"
                header-text-variant="white">
            <div class="card-text container">
              <b-card class="mb-2" v-for="(todo, index) in data['doing']" :key="index" 
                :header="todo.title"
                header-tag="header"
                header-bg-variant="primary"
                header-text-variant="white">
              <div class="card-text text-left">
                <table class="table">
                  <tr>
                    <td>
                      <span class="badge badge-info">Point :</span>
                    </td>
                    <td>
                      {{todo.point}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="badge badge-info">Assigned :</span>
                    </td>
                    <td>
                       {{todo.assigned}}
                    </td>
                  </tr>
                </table>
              </div>
              <b-button
                    @click="showDetail(todo)" variant="primary">Show Detail</b-button>
              </b-card>
            </div>
        </b-card>
      </div>
      <div id="Done" class="col-lg-3 col-sm-3 border bg-success p-1">
        <b-card header="Done"
                header-tag="header"
                header-bg-variant="success"
                header-text-variant="white">
            <div class="card-text container">
              <b-card class="mb-2" v-for="(todo, index) in data['done']" :key="index" 
                :header="todo.title"
                header-tag="header"
                header-bg-variant="success"
                header-text-variant="white">
              <div class="card-text text-left">
                <table class="table">
                  <tr>
                    <td>
                      <span class="badge badge-info">Point :</span>
                    </td>
                    <td>
                      {{todo.point}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="badge badge-info">Assigned :</span>
                    </td>
                    <td>
                       {{todo.assigned}}
                    </td>
                  </tr>
                </table>
              </div>
              <b-button
                  @click="showDetail(todo)" variant="primary">Show Detail</b-button>
              </b-card>
            </div>
        </b-card>
      </div>
    </div>
    <myformupdate :open="open" :todo="temp" @hide="open = false"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myformupdate from '@/components/modal.vue'
// @ is an alias to /src
export default {
  name: 'home',
  data(){
    return {
      temp : {},
      open : false
    }
  },
  components: {
    myformupdate
  },
  methods : {
    showDetail(todo){
      this.temp = todo
      this.open = true
    }
  },
  computed : {
    ...mapState(['data'])
  }
}
</script>
