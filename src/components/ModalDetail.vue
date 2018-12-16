<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <h5>{{ getData.dataContent[1].title }} for {{ getData.dataContent[1].assignedTo }}</h5>
                    </div>

                    <div class="modal-body" style="text-align: left;">
                        <label>Task Description : {{ getData.dataContent[1].description }}</label>
                        <div></div>
                        <label>Point : {{ getData.dataContent[1].point }}</label>
                        <div></div>
                        <label>Status : <span :class="'badge badge-'+getData.dataKanban.color">{{ getData.dataKanban.title }}</span></label>
                        <div></div>
                    </div>

                    <div class="modal-footer container">
                        <button
                            class="btn btn-outline-danger btn-sm mr-1"
                            @click="backlog"
                            v-if="getData.dataKanban.color === 'warning'"
                        >Back Log</button>
                        <button
                            class="btn btn-outline-warning btn-sm mr-1"
                            @click="todo"
                            v-if="getData.dataKanban.color === 'danger' || getData.dataKanban.color === 'primary'"
                        >To Do</button>
                        <button
                            class="btn btn-outline-primary btn-sm mr-1"
                            @click="doing"
                            v-if="getData.dataKanban.color === 'warning' || getData.dataKanban.color === 'success'"
                        >Doing</button>
                        <button
                            class="btn btn-outline-success btn-sm mr-1"
                            @click="done"
                            v-if="getData.dataKanban.color === 'primary'"
                        >Done</button>
                        <button class="btn btn-outline-dark btn-sm mr-1" @click="deleteTask">Delete</button>
                        <button class="btn btn-outline-dark btn-sm mr-1" @click="$emit('close')">Close</button>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import database from '@/assets/config.js'

export default {
    name: 'modal-detail',
    props: ['getData'],
    methods: {
        backlog() {
            database.ref(`/${this.getData.dataContent[0]}`).update({ status: 1 });
            this.$emit('close');
        },
        todo() {
            database.ref(`/${this.getData.dataContent[0]}`).update({ status: 2 });
            this.$emit('close');
        },
        doing() {
            database.ref(`/${this.getData.dataContent[0]}`).update({ status: 3 });
            this.$emit('close');
        },
        done() {
            database.ref(`/${this.getData.dataContent[0]}`).update({ status: 4 });
            this.$emit('close');
        },
        deleteTask() {
            database.ref(`/${this.getData.dataContent[0]}`).remove();
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
