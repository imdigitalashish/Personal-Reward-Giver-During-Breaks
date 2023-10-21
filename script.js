class Application {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.updateTheListUI();
        this.addKeyBoardListeners();
    }

    updateTheListUI() {
        const taskList = document.querySelector(".tasks__list");
        taskList.innerHTML = ''; // Clear the task list

        this.tasks.forEach((task, index) => {
            const taskElement = document.createElement("p");
            taskElement.textContent = task;
            taskElement.classList.add("task__value");
            taskElement.addEventListener('click', () => {
                this.removeTask(index);
            });

            taskList.appendChild(taskElement);
        });
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.updateTheListUI();
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    addKeyBoardListeners() {
        const inputElement = document.querySelector("input");

        inputElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.tasks.push(inputElement.value);
                this.saveTasks();
                this.updateTheListUI();
                inputElement.value = "";
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space" && this.tasks.length > 0) {
                const randomTask = this.tasks[Math.floor(Math.random() * this.tasks.length)];
                document.querySelector(".container__right > p").textContent = randomTask;
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new Application();
});
