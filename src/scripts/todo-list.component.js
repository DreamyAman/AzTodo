/**
 * Task list (parent) container to manage the list items (children). 
 */
class TodoListComponent {
    constructor(props) {
        this.todoDataSource = props.todoDataSource;
        this.onTaskUpdatedCallback = props.onTaskUpdatedCallback;
        this.#onInit();
    }


    /**
     * Stores the element ref of the list element and render the list
     */
    #onInit() {
        this.taskListElemRef = document.getElementById("taskList");

        this.commonProps = {
            // <ul> element used by the list item components to append the <li>
            parentElemRef: this.taskListElemRef,
            // call by the list item component when delete action is triggered
            onDeleteCallback: (task) => this.#handleTaskDelete(task),
            // call by the list item component when task toggle action is triggered
            onToggleCallback: (task, isCompleted) => this.#handleTaskToggle(task, isCompleted),
            // call by the list item componet when task is edited
            onEditCallback: (updatedTask) => this.#handleTaskEdit(updatedTask)
        }


        this.render();
    }

    /**
     * Renders the tasks as list items in the UI.
     */
    render() {
        const taskList = this.todoDataSource.listTasks();

        // empty the <ul> element before showing the new <li> items
        this.taskListElemRef.innerHTML = "";

        this.taskItemComponents = new Map();

        // iterate over the task list 
        for (const task of taskList) {
            // ctor properties to set in the todo list item component 
            const taskListItemProps = {
                ...this.commonProps,
                // task to render in the list item UI component
                task,
            };


            const taskItemComponent = new TodoListItemComponent(taskListItemProps);

            this.taskItemComponents.set(task.id, taskItemComponent);
        }
    }

    #handleTaskToggle(task, isCompleted) {
        // toggle the task status
        const taskStatus = {
            status: isCompleted ? TaskStatus.COMPLETED : TaskStatus.TODO
        }

        // update the task status in data source
        this.todoDataSource.updateTask(task.id, taskStatus);


        // get the list item from component
        const taskItemComponent = this.taskItemComponents.get(task.id);

        // update the task list item <li> UI
        taskItemComponent.destroy();

        // notify parent about update
        this.onTaskUpdatedCallback(task);
    }

    /**
     * Remove the task from datasouce and 
     * removes the list item component from Map and UI.
     */
    #handleTaskDelete(task) {
        // remove the task from data source
        this.todoDataSource.removeTask(task.id);

        // get the list item from component
        const taskItemComponent = this.taskItemComponents.get(task.id);

        // destry the component
        taskItemComponent.destroy();

        this.taskItemComponents.delete(task.id);

        // notify parent about update
        this.onTaskUpdatedCallback(task);
    }

    #handleTaskEdit(updatedTask) {
        this.todoDataSource.updateTask(updatedTask.id, updatedTask);

        // get the list item from component
        const taskItemComponent = this.taskItemComponents.get(updatedTask.id);

        // update the task list item <li> UI
        taskItemComponent.destroy();

        // notify parent about update
        this.onTaskUpdatedCallback(updatedTask);
    }
}