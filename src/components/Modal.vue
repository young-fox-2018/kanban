<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h5>New Task</h5>
                    </div>

                    <div class="modal-body" style="text-align: left;">
                        <label>Title</label>
                        <input type="text" class="form-control mb-1" placeholder="Task Title" v-model="title" />
                        <label>Description</label>
                        <textarea placeholder="Task Short Description" class="form-control mb-1" v-model="description"></textarea>
                        <label>Point</label>
                        <input type="number" class="form-control mb-1" placeholder="0" v-model="point" />
                        <label>Assigned To</label>
                        <input type="text" class="form-control mb-1" placeholder="Assigned To" v-model="assignedTo" />
                    </div>

                    <div class="modal-footer">
                        <button class="modal-default-button" @click="saveTask">Save</button>
                        <button class="modal-default-button" @click="$emit('close')">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import database from '@/assets/config.js';

export default {
    name: 'Modal',
    data: function() {
        return {
            title: '',
            description: '',
            point: '',
            assignedTo: '',
        };
    },
    methods: {
        saveTask() {
            database.ref('/').push({
                title: this.title,
                description: this.description,
                point: this.point,
                assignedTo: this.assignedTo,
                status: 1
            });
            this.$emit('close');
        },
    }
}
</script>


<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 50%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    overflow-y: auto;
    max-height: 90%;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
    opacity: 0;
}
.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
