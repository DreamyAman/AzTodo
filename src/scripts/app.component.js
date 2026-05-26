class AppComponent {
    constructor(props) {
        this.todoDataSource = props.todoDataSource;
        this.#onInit();
    }

    #onInit() {
        const props = {
            todoDataSource: this.todoDataSource,
        }

        // task form component
        this.taskFormComp = new TaskFormComponent({
            ...props,
            onTaskAddedCallback: (task) => this.#handleTaskAdded(task)
        });

        // task list component
        this.todoListComp = new TodoListComponent({
            ...props,
            onTaskUpdatedCallback: (task) => this.#handleTaskUpdated(task)
        });

        // tasks stats coomponent
        this.tasksStatsComp = new TasksStatsComponent(props);
    }

    #handleTaskAdded(task) {
        this.todoDataSource.addTask(task);
        this.render();
    }

    #handleTaskUpdated(task) {
        this.render();
    }


    render() {
        this.todoListComp.render();

        this.tasksStatsComp.render();
    }
}