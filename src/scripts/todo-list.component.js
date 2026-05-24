/**
 * Task list (parent) container to manage the list items (children). 
 */
class TodoListComponent {
    constructor(taskDataSource) {
        this.taskDataSource = taskDataSource;
        this.#onInit();
    }


    /**
     * Stores the element ref of the list element and render the list
     */
    #onInit() {
        this.taskListElemRef = document.getElementById("taskList");

        this.render();
    }

    /**
     * Renders the tasks as list items in the UI.
     */
    render() {
        const taskList = this.taskDataSource.listTasks();

        // empty the <ul> element before showing the new <li> items
        this.taskListElemRef.innerHTML = "";

        this.taskItemComponents = new Map();

        // iterate over the task list 
        for (const task of taskList) {
            // ctor properties to set in the todo list item component 
            const taskListItemProps = {
                // <ul> element used by the list item components to append the <li>
                parentElemRef: this.taskListElemRef,
                // task to render in the list item UI component
                task,
                // call by the list item component when delete action is triggered
                onDeleteCallback: (task) => this.#handleTaskDelete(task),
                // call by the list item component when task toggle action is triggered
                onToggleCallback: (task, isCompleted) => this.#handleTaskToggle(task, isCompleted)
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
        this.taskDataSource.updateTask(task.id, taskStatus);


        // get the list item from component
        const taskItemComponent = this.taskItemComponents.get(task.id);

        // update the task list item <li> UI
        taskItemComponent.destroy();
        taskItemComponent.render();
    }

    /**
     * Remove the task from datasouce and 
     * removes the list item component from Map and UI.
     */
    #handleTaskDelete(task) {
        // remove the task from data source
        this.taskDataSource.removeTask(task.id);

        // get the list item from component
        const taskItemComponent = this.taskItemComponents.get(task.id);

        // destry the component
        taskItemComponent.destroy();

        this.taskItemComponents.delete(task.id);
    }
}