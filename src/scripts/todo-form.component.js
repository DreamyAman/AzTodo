/**
 * Task from component
 *
 * Controls the adding of new task through UI.
 */
class TaskFormComponent {
  constructor(props) {
    this.onTaskAddedCallback = props.onTaskAddedCallback;
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
      this.#addTask(this.taskForm);
    });
  }

  /**
   * Add the task to data source
   */
  #addTask(taskForm) {
    // form model
    const taskName = taskForm.taskName.value.trim();
    const taskPriority = taskForm.taskPriority.value.trim();

    const isTasNameBlank = !taskName.length || taskName === " ";

    if (isTasNameBlank || !taskPriority.length) {
      alert("Input cannot be blanked");
      return;
    }

    // task
    const task = {
      name: taskName,
      priority: taskPriority,
    };

    this.#resetDefaults();

    this.onTaskAddedCallback(task);
  }

  #resetDefaults() {
    // clear input
    this.taskNameElemRef.value = null;

    // reset selected to HIGH
    this.taskPriorityElemRef.value = TaskPriority.HIGH;
  }

  render() {
    this.#resetDefaults();
  }
}
