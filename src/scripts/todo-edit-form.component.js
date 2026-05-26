/**
 * Task Edit from component
 *
 * Controls the updting of existing task through UI.
 */
class TaskEditFormComponent {
    constructor(props) {
        this.task = props.task;
        this.onEditCallback = props.onEditCallback;
        this.#onInit();
    }

    /**
     * Registeres the event listener for the edit form
     * and also creates the instance of modal for edit form wrapping
     */
    #onInit() {
        this.editModal = new bootstrap.Modal(document.getElementById('taskEditModal'), {
            keyboard: false
        });

        this.taskForm = document.getElementById("taskEditForm");
        this.taskNameElemRef = this.taskForm.taskName;
        this.taskPriorityElemRef = this.taskForm.taskPriority;
        this.taskEditSubmitBtn = document.getElementById("taskEditSubmitBtn");

        this.setFormValues();


        this.taskEditSubmitBtn.addEventListener("click", (event) => {
            this.#updateTask(this.taskForm);
        });
    }

    /**
     * Show the wdit form modal
     */
    show() {
        this.render();
    }

    /**
     * Update the task and emit the updated task to parent
     */
    #updateTask(taskForm) {
        // form model
        const taskName = taskForm.taskName.value.trim();
        const taskPriority = taskForm.taskPriority.value.trim();

        const isTasNameBlank = !taskName.length || taskName === " ";

        if (isTasNameBlank || !taskPriority.length) {
            alert("Input cannot be blanked");
            return;
        }

        // updated task
        const updatedTask = {
            ...this.task,
            name: taskName,
            priority: taskPriority,
        };

        // hide the boostrap modal
        this.editModal.hide();

        // call the parent edit callback to update the task
        this.onEditCallback(updatedTask);
    }

    /**
     * Sets the form values for the task for update
     */
    setFormValues() {
        // show task name in input
        this.taskNameElemRef.value = this.task.name;

        // show task priority in select input
        this.taskPriorityElemRef.value = this.task.priority;
    }

    render() {
        // show form modal
        this.editModal.show();
    }

    destroy() {
        // clear task name in input
        this.taskNameElemRef.value = null;

        // clear task priority in select input
        this.taskPriorityElemRef.value = null;
    }
}
