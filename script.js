class Application {
    constructor() {
        this.tasks = localStorage.getItem("tasks");
        if (null === this.tasks) {
            localStorage.setItem("tasks", JSON.stringify([]));
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        } else {
            this.tasks = JSON.parse(this.tasks);
        }
        this.updateTheListUI();

        this.addKeyBoardListeners();
    }


    updateTheListUI() {
        let node = document.querySelector(".tasks__list");
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }


        this.tasks.forEach((elem, index) => {
            let p = document.createElement("p");
            p.onclick = () => {
                this.tasks.splice(index, 1);
                this.saveToTasks();
                this.updateTheListUI();

            };
            p.innerHTML = elem;
            p.setAttribute("index", index);
            p.classList.add("task__value");

            document.querySelector(".tasks__list").appendChild(p);
        })
    }

    saveToTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    addKeyBoardListeners() {
        document.querySelector("input").addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.tasks.push(document.querySelector("input").value);
                this.saveToTasks();
                this.updateTheListUI();
                document.querySelector("input").value = "";
            }
        });

        document.addEventListener("keydown", (event) => {
            console.log(event)
            if (event.code == "Space") {
                document.querySelector(".container__right > p").innerHTML = this.tasks[Math.floor(Math.random() * this.tasks.length)];
            }
        })
    }
}

window.onload = () => {
    window.app = new Application();
}