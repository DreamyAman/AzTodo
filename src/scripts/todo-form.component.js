/**
 * Task from component
 *
 * Controls the adding of new task through UI.
 */
class TaskFormComponent {
  constructor(taskDataSource) {
    this.taskDataSource = taskDataSource;
    this.#onInit();
  }

  /**
   * Registeres the event listener for form
   */
  #onInit() {
    this.taskForm = document.getElementById("taskForm");
    this.taskNameElemRef = this.taskForm.taskName;
    this.taskPriorityElemRef = this.taskForm.taskPriority;

    this.taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#addTask(taskForm);
    });
  }

  /**
   * Add the task to data source
   */
  #addTask(taskForm) {
    // form model
    const taskName = taskForm.taskName.value.trim();
    const taskPriority = taskForm.taskPriority.value.trim();

    if (!taskName.length || !taskPriority.length) {
      alert("Input cannot be blanked");
    }

    // task
    const task = {
      name: taskName,
      priority: taskPriority,
    };

    this.taskDataSource.addTask(task);

    this.render();
  }

  render() {
    // clear input
    this.taskNameElemRef.value = null;

    // reset selected to HIGH
    this.taskPriorityElemRef.value = TaskPriority.HIGH;
  }
}
