class TasksStatsComponent {
    constructor(props) {
        this.todoDataSource = props.todoDataSource;
        this.#onInit();
    }

    #onInit() {
        this.statsBanner = document.getElementById("statsBanner");

        this.render();
    }

    render() {
        this.stats = this.todoDataSource.stats();

        this.statsBanner.innerHTML = `
        <div class="row">
        <p class="col-4">High <span>${this.stats.highCount}</span></p>
        <p class="col-4">Medium <span>${this.stats.mediumCount}</span></p>
        <p class="col-4">Low <span>${this.stats.lowCount}</span></p>
        <p class="col-4">Completed <span>${this.stats.completedCount}</span></p>
        <p class="col-4">Pending <span>${this.stats.pendingCount}</span></p>
        <p class="col-4">Total <span>${this.stats.total}</span></p>
      </div>`
    }
}
