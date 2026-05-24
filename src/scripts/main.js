// data source
const todoDataSource = new TodoDataSource();

// task form component
const taskFormComp = new TaskFormComponent(todoDataSource);

// task list component
const todoListComp = new TodoListComponent(todoDataSource);