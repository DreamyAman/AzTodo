/** 
Service to work with task data source.
Schema of Task
{
    id: string // unique id of task
    name: string
    status: string // COMPLETED, TODO
    priority: string // LOW, MEDIUM, HIGH
    createdAt: timestamp // date time when todo is created
    completedAt: timestamp // date time when todo is transitioned to COMPLETED
}
**/
class TodoDataSource {
  constructor() {
    this.tasks = this.#loadTasks();
  }

  /**
   * Private method to load tasks from local storage
   * @return task list
   */
  #loadTasks() {
    const tasksStr = window.localStorage.getItem("tasks");

    if (!tasksStr) {
      return [];
    }

    return JSON.parse(tasksStr);
  }

  /**
   * Private method to save task list to local storage
   */
  #saveTasks() {
    window.localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  /**
   * Add a new task to task list
   *
   * @returns added task
   */
  addTask(task) {
    const id = generateId();

    const taskToSave = {
      ...task,
      id,
      status: TaskStatus.TODO,
      createdAt: new Date(),
    };

    this.tasks.push(taskToSave);

    this.#saveTasks();

    return taskToSave;
  }

  /**
   * Update a exisitng task by id
   *
   * @returns updated task
   */
  updateTask(id, taskUpdate) {
    const existingTask = this.tasks.find((task) => task.id === id);

    if (!existingTask) {
      return;
    }

    Object.assign(existingTask, taskUpdate);

    this.#saveTasks();

    return existingTask;
  }

  /**
   * @returns the list of tasks
   */
  listTasks() {
    return this.tasks;
  }

  /**
   * @returns the stats of all tasks. 
   * @example {
      highCount: 5,
      lowCount: 10,
      mediumCount: 5,
      pendingCount: 10,
      completedCount: 1,
      total: 31
    };
   */
  stats() {
    const statsRecord = {
      highCount: 0,
      lowCount: 0,
      mediumCount: 0,
      pendingCount: 0,
      completedCount: 0,
      total: this.tasks.length
    };

    for (const task of this.tasks) {
      // accumalate the count of priority
      switch (task.priority) {
        case TaskPriority.LOW:
          statsRecord.lowCount += 1;
          break;

        case TaskPriority.MEDIUM:
          statsRecord.mediumCount += 1;
          break;

        case TaskPriority.HIGH:
          statsRecord.highCount += 1;
          break;
      }

      // accumalate the count of status
      switch (task.status) {
        case TaskStatus.TODO:
          statsRecord.pendingCount += 1;
          break;

        case TaskStatus.COMPLETED:
          statsRecord.completedCount += 1;
          break;
      }

    }

    return statsRecord;
  }

  /**
   * Delete a task by id
   *
   * @returns nothing
   */
  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.#saveTasks();
  }
}
