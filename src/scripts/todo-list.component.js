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
     * Renders the task list items in the UI as .
     */
    render() {
        const taskList = this.taskDataSource.listTasks();

        this.taskListElemRef.innerHTML = "";

        for (const task of taskList) {
            new TodoListItemComponent(this.taskListElemRef, task);
        }
    }
}