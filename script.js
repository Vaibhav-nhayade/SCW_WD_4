// Selecting elements
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    li.innerHTML = `
      <div class="task-info">
        <span class="task-name">${task.name}</span>
        <span class="task-date">${task.dateTime || ""}</span>
      </div>
      <div class="buttons">
        <button class="complete" onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
addBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (taskName === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({ name: taskName, dateTime: dateTime, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskDateTime.value = "";
});

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newName = prompt("Edit your task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();
