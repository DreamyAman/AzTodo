class TodoListItemComponent {
    constructor(props) {
        this.parentElemRef = props.parentElemRef;
        this.task = props.task;
        this.onDeleteCallback = props.onDeleteCallback;
        this.onToggleCallback = props.onToggleCallback;
        this.#onInit();
    }

    /**
     * Creates the event handlers for checkbox, edit and delete buttons.
     */
    #onInit() {
        this.statusToggleEventHanlder = (event) => this.#handleStatusToggle(event.target.checked);
        this.editEventHandler = () => this.#handleEdit();
        this.deleteEventHandler = () => this.#handleDelete();
        this.render();
    }

    /**
     * Renders the list item as LI element.
     * 
     * @example
     * 
     * <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-danger">
     *  <input type="checkbox" class="form-check-input me-1" id="taskInput1777473965118">
     *  <label class="form-check-label" for="taskInput1777473965118">Master task</label>
     *  <button class="btn"><span class="fa fa-edit"></span></button>
     *  <button class="btn"><span class="fa fa-trash"></span></button>
     * </li>
     */
    render() {
        const task = this.task;

        const isTaskCompleted = task.status === TaskStatus.COMPLETED;

        let liClassList = "list-group-item d-flex justify-content-between align-items-center";

        switch (task.priority) {
            case TaskPriority.LOW:
                liClassList += " todo-low-priority-item";
                break;

            case TaskPriority.MEDIUM:
                liClassList += " todo-medium-priority-item";
                break;

            case TaskPriority.HIGH:
                liClassList += " todo-high-priority-item";
                break;
        }


        // create the li element and add the class list
        const li = document.createElement("li");
        li.classList.add(...liClassList.split(" "));

        // input checkbox element
        // a unique id for input checkbox and its label
        const listItemInputId = `taskInput${task.id}`;
        const todoMarkCheckbox = document.createElement("input");
        todoMarkCheckbox.setAttribute("type", "checkbox");
        todoMarkCheckbox.setAttribute("class", "form-check-input me-1");
        todoMarkCheckbox.setAttribute("id", listItemInputId);
        if (isTaskCompleted) {
            todoMarkCheckbox.setAttribute("checked", true);
        } else {
            todoMarkCheckbox.removeAttribute("checked");
        }
        todoMarkCheckbox.addEventListener("change", this.statusToggleEventHanlder)

        // append the input to li element
        li.appendChild(todoMarkCheckbox);

        // input checkbox label element
        const todoMarkCheckboxLabel = document.createElement("label");
        todoMarkCheckboxLabel.setAttribute("class", "form-check-label");
        todoMarkCheckboxLabel.setAttribute("for", listItemInputId);
        const taskNameClass = isTaskCompleted ? "text-decoration-line-through" : "";
        todoMarkCheckboxLabel.innerHTML = `<span class="${taskNameClass}">${task.name}</span>`;

        // append the label to li element
        li.appendChild(todoMarkCheckboxLabel);

        // edit and delete button for todo task
        // they are registered with event listener
        const editBtn = document.createElement("button");
        editBtn.setAttribute("class", "btn");
        editBtn.innerHTML = `<span class="fa fa-edit"></span>`;
        editBtn.addEventListener("click", this.editEventHandler);

        // append the edit button to li element
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "btn");
        deleteBtn.innerHTML = `<span class="fa fa-trash"></span>`;
        deleteBtn.addEventListener("click", this.deleteEventHandler);

        // append the delete button to li element
        li.appendChild(deleteBtn);

        // append the complete li element to parent ul element
        this.parentElemRef.appendChild(li);

        // add elements to instance
        this.li = li;
        this.todoMarkCheckbox = todoMarkCheckbox;
        this.editBtn = editBtn;
        this.deleteBtn = deleteBtn;
    }

    #handleStatusToggle(isCompleted) {
        // call the parent callback method to toggle the status
        this.onToggleCallback(this.task, isCompleted);
    }

    #handleDelete() {
        // call the parent callback method to clear the task
        this.onDeleteCallback(this.task);
    }

    #handleEdit() {
        console.log("Editing...", this.task.name);
    }

    /**
     *  Clear the resources like li element.
     */
    destroy() {
        // free/clean the memory resources
        this.todoMarkCheckbox.removeEventListener("change", this.editEventHandler);
        this.editBtn.removeEventListener("click", this.editEventHandler);
        this.deleteBtn.removeEventListener("click", this.deleteEventHandler);

        // delete the li element
        this.parentElemRef.removeChild(this.li);
    }
}