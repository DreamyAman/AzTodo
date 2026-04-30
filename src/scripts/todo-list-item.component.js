class TodoListItemComponent {
    constructor(parentElemRef, task) {
        this.parentElemRef = parentElemRef;
        this.task = task;
        this.#onInit();
    }

    #onInit() {
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

        let liClassList = "list-group-item d-flex justify-content-between align-items-center";

        switch (task.priority) {
            case TaskPriority.LOW:
                liClassList += " list-group-item-primary";
                break;

            case TaskPriority.MEDIUM:
                liClassList += " list-group-item-warning";
                break;

            case TaskPriority.HIGH:
                liClassList += " list-group-item-danger";
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
        todoMarkCheckbox.addEventListener("change", (event) => this.#handleStatusToggle(event.target.checked))

        // append the input to li element
        li.appendChild(todoMarkCheckbox);

        // input checkbox label element
        const todoMarkCheckboxLabel = document.createElement("label");
        todoMarkCheckboxLabel.setAttribute("class", "form-check-label");
        todoMarkCheckboxLabel.setAttribute("for", listItemInputId);
        todoMarkCheckboxLabel.innerHTML = task.name;

        // append the label to li element
        li.appendChild(todoMarkCheckboxLabel);

        // edit and delete button for todo task
        // they are registered with event listener
        const editBtn = document.createElement("button");
        editBtn.setAttribute("class", "btn");
        editBtn.innerHTML = `<span class="fa fa-edit"></span>`;
        editBtn.addEventListener("click", () => this.#handleEdit());

        // append the edit button to li element
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class", "btn");
        deleteBtn.innerHTML = `<span class="fa fa-trash"></span>`;
        deleteBtn.addEventListener("click", () => this.#handleDelete());

        // append the delete button to li element
        li.appendChild(deleteBtn);

        // append the complete li element to parent ul element
        this.parentElemRef.appendChild(li);
    }

    #handleStatusToggle(isCompleted) {
        console.log("Toggle...", this.task.name, isCompleted);
    }

    #handleDelete() {
        console.log("Deleting...", this.task.name);
    }

    #handleEdit() {
        console.log("Editing...", this.task.name);
    }
}