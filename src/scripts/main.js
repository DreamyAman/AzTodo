const todoDataSource = new TodoDataSource();

// const task = todoDataSource.addTask({
//   name: "Book chapter reading",
//   priority: TaskPriority.HIGH,
// });

// console.log("Task added", task);

console.log("Task list", todoDataSource.listTasks());

// const udpatedTask = todoDataSource.updateTask(task.id, {
//   status: TaskStatus.COMPLETED,
//   completedAt: new Date(),
// });

// console.log("Task updated", udpatedTask);

// console.log(todoDataSource.listTasks());
