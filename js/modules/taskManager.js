const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = loadData("tasks"); // storage.js 已保證回傳陣列，不需再額外防呆

function renderTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  // 空狀態
  if (tasks.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "目前沒有任務，新增一個開始今天的學習吧！";
    emptyLi.className = "text-gray-400 list-none";
    taskList.appendChild(emptyLi);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "flex items-center";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      const target = tasks.find((t) => t.id === task.id);
      if (target) target.completed = checkbox.checked;
      saveData("tasks", tasks);
    });

    // title
    const span = document.createElement("span");
    span.textContent = task.title;
    span.className =
      "ml-2" + (task.completed ? " line-through text-gray-400" : "");

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "刪除";
    deleteBtn.className = "ml-3 text-red-500 hover:underline";

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveData("tasks", tasks);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// 新增任務
if (addTaskBtn && taskInput) {
  addTaskBtn.addEventListener("click", () => {
    const value = taskInput.value.trim();

    if (value === "") return;

    tasks.push({
      id: Date.now(),
      title: value,
      completed: false,
    });

    taskInput.value = "";
    saveData("tasks", tasks);

    renderTasks();
  });

  // Enter 鍵也能新增任務
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });
}

renderTasks();
