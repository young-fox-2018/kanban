<template>
  <div>
    <b-form @submit.prevent="addKanban">
    <b-modal v-model="showAddModal"
             title="Add new task"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             :body-bg-variant="bodyBgVariant"
             :body-text-variant="bodyTextVariant"
             :footer-bg-variant="footerBgVariant"
             :footer-text-variant="footerTextVariant"
             >
        <b-container fluid>
         <b-form-group id="titleGroup"
                        label="Title:"
                        label-for="title" class="text-left">
            <b-form-input id="title"
                          type="text"
                          v-model="title"
                          required
                          placeholder="Enter the title">
            </b-form-input>
          </b-form-group>

          <b-form-group id="descriptionGroup"
          label="Description:"
          label-for="title"
          class="text-left">
              <b-textarea
              id="description"
              v-model="description"
              required
              placeholder="Enter the description"/>
          </b-form-group>

          <b-form-group id="pointGroup"
                        label="Point:"
                        label-for="point" class="text-left">
            <b-form-input id="point"
                          type="text"
                          v-model="point"
                          required
                          >
            </b-form-input>
          </b-form-group>

          <b-form-group id="assignedGroup"
                        label="Assigned To:"
                        label-for="assigned" class="text-left">
            <b-form-input id="assigned"
                          type="text"
                          v-model="assigned"
                          required
                          placeholder="Enter assigned to"
                          >
            </b-form-input>
          </b-form-group>
       </b-container>
       <div slot="modal-footer" class="w-100">
         <!-- <p class="float-left">Modal Footer Content</p> -->
         <b-btn size="sm" class="mx-2" variant="danger" @click="showAddModal = false">
           Cancel
         </b-btn>
         <b-button type="submit" size="sm" variant="primary">Submit</b-button>
       </div>
    </b-modal>
    </b-form>
  </div>
</template>

<script>

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
  computed: {
    showAddModal: {
      get() {
        return this.$store.state.showAddModal;
      },
      set(val) {
        return this.$store.commit('modalAdd', val);
      },
    },
    title: {
      get() {
        return this.$store.state.title;
      },
      set(val) {
        return this.$store.commit('addTitle', val);
      },
    },
    description: {
      get() {
        return this.$store.state.description;
      },
      set(val) {
        return this.$store.commit('addDescription', val);
      },
    },
    point: {
      get() {
        return this.$store.state.point;
      },
      set(val) {
        return this.$store.commit('addPoint', val);
      },
    },
    assigned: {
      get() {
        return this.$store.state.assigned;
      },
      set(val) {
        return this.$store.commit('addAssigned', val);
      },
    },
  },
  methods: {
    closeModalAdd() {
      console.log('close modal methods');
      this.$store.state.showAddModal = false;
    },
    addKanban() {
      this.$store.dispatch('addKanban');
    },
  },
};
</script>

<!-- modal-variant-1.vue -->
