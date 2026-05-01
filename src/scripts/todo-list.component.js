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
                onDeleteCallback: (task) => this.#handleTaskDelete(task)
            };


            const taskItemComponent = new TodoListItemComponent(props);

            this.taskItemComponents.set(task.id, taskItemComponent);
        }
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

        //
        taskItemComponent.destroy();

        this.taskItemComponents.delete(task.id);
    }
}