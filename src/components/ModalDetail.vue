<template>
  <b-modal v-model="showDetailModal"
             :title="'Detail Task: '+details.title"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant"
             :footer-bg-variant="footerBgVariant"
             :footer-text-variant="footerTextVariant"
             >
        <b-container fluid class="text-left">
          <div class="">
            <p class="task-label">Task Description: </p>
            <p>{{details.description}}</p>
          </div>
          <div class="mb-2">
            <p class="task-label">Point: </p>
            <p>{{details.point}}</p>
          </div>
          <div class="mb-2">
            <p class="task-label">Status: </p>
            <p>{{details.status | statusView}}</p>
          </div>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <!-- <p class="float-left">Modal Footer Content</p> -->
          <!-- <b-btn size="sm" class="mx-2" variant="danger" @click="showDetailModal = false">
            Cancel
          </b-btn> -->
          <div class="row d-flex justify-content-between px-2">
            <div class="text-center">
              <b-button size="sm" variant="danger" @click="deleteTask(details.id)">Delete</b-button>
            </div>
            <div class="text-right" v-if="details.status == 'todo'">
              <b-button size="sm" variant="success"
              @click="updateBacklog(details.id)">Back Log</b-button>
            </div>
            <div class="text-right" v-if="details.status == 'backlog' || details.status == 'doing'">
              <b-button size="sm" variant="success" @click="updateTodo(details.id)">To Do</b-button>
            </div>
            <div class="text-right" v-if="details.status == 'todo' || details.status == 'done'">
              <b-button size="sm" variant="success"
              @click="updateDoing(details.id)">Doing</b-button>
            </div>
            <div class="text-right" v-if="details.status == 'doing'">
              <b-button size="sm" variant="success"
              @click="updateDone(details.id)">Done</b-button>
            </div>
          </div>

        </div>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      variants: [
        'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark',
      ],
      headerBgVariant: 'dark',
      headerTextVariant: 'light',
      bodyBgVariant: 'light',
      bodyTextVariant: 'dark',
      footerBgVariant: 'warning',
      footerTextVariant: 'dark',
    };
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
    updateBacklog(id) {
      this.$store.dispatch('updateTask', {
        id,
        status: 'backlog',
      });
    },
    updateTodo(id) {
      this.$store.dispatch('updateTask', {
        id,
        status: 'todo',
      });
    },
    updateDoing(id) {
      this.$store.dispatch('updateTask', {
        id,
        status: 'doing',
      });
    },
    updateDone(id) {
      this.$store.dispatch('updateTask', {
        id,
        status: 'done',
      });
    },
  },
  computed: {
    showDetailModal: {
      get() {
        return this.$store.state.showDetailModal;
      },
      set(val) {
        return this.$store.commit('modalDetail', val);
      },
    },
    ...mapState(['details']),
  },
  filters: {
    statusView(val) {
      // console.log('filter kalee', val);
      if (val === 'backlog') {
        return 'Back Log';
      }
      if (val === 'todo') {
        return 'To Do';
      }
      if (val === 'doing') {
        return 'Doing';
      }
      if (val === 'done') {
        return 'Done';
      }
      return 'not found';
    },
  },
};
</script>

<style>
  .task-label{
    font-weight: bold;
    font-style: italic;
  }
</style>
