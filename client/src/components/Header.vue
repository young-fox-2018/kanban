<template>
    <div class="container mt-4">
        <h1 class="text-center">Kanban</h1>
        <div class="d-flex justify-content-center my-4">
            <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#addTask">Add new task</button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addTask" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" >New Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <form>

                            <div class="form-group form-group-sm">
                                <label>Title</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter title" v-model="task.title">
                            </div>
                            <div class="form-group form-group-sm">
                                <label>Description</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter description" v-model="task.description">
                            </div>
                            <div class="form-group form-group-sm">
                                <label>Point</label>
                                <input type="number" class="form-control form-control-sm" placeholder="Enter point" v-model="task.point">
                            </div>
                            <div class="form-group form-group-sm">
                                <label>Assigned To</label>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter name" v-model="task.assignedTo">
                            </div>
                            <hr>
                            <button type="button" class="btn btn-secondary mr-2" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" @click.prevent="addTask" data-dismiss="modal">Add task</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import database from '@/assets/config.js'

export default {
    data() {
        return {
            task: {
                title: "",
                description: "",
                point: "",
                assignedTo: ""
            }
        }
    },
    methods: {
        addTask: function() {
            database.ref('db/tasks/').push({
                title: this.task.title,
                description: this.task.description,
                point: this.task.point,
                assignedTo: this.task.assignedTo,
                status: "back-log"
            })
        }
    }
}
</script>
