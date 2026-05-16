// ===============================
// ELEMENTS
// ===============================

const username =
  document.getElementById("username");

const userImage =
  document.getElementById("userImage");

const taskList =
  document.getElementById("taskList");

const addTaskBtn =
  document.getElementById("addTaskBtn");

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.getElementById("sidebar");

const logoutBtn =
  document.getElementById("logoutBtn");

// ===============================
// LOAD USER DATA
// ===============================

const savedName =
  localStorage.getItem("plannerUsername");

const savedImage =
  localStorage.getItem("plannerProfileImage");

if (savedName) {
  username.textContent = savedName;
}

if (savedImage) {
  userImage.src = savedImage;
}

// ===============================
// LOAD TASKS
// ===============================

let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

// ===============================
// RENDER TASKS
// ===============================

function renderTasks() {

  taskList.innerHTML = "";

  // EMPTY TASKS

  if (tasks.length === 0) {

    taskList.innerHTML = `
      <div class="empty-task">
        No tasks yet 🌸
      </div>
    `;

    return;
  }

  // SHOW TASKS

  tasks.forEach((task, index) => {

    const taskCard =
      document.createElement("div");

    taskCard.classList.add("task-card");

    // COMPLETED STYLE

    const completedClass =
      task.completed ? "completed" : "";

    taskCard.innerHTML = `
    
      <div class="task-left">

        <input
          type="checkbox"
          class="task-checkbox"
          ${task.completed ? "checked" : ""}
        />

        <div class="task-info ${completedClass}">

          <h3>${task.title}</h3>

          <p>
            ${task.time || "No Time"}
          </p>
          <p>📅 ${task.date}</p>

          <p>📝 ${task.description || "No description"}</p>

          <p>📍 ${task.location || "No location"}</p>

          <p>🔔 Reminder: ${task.reminder ? "Yes" : "No"}</p>


          

        </div>

      </div>

      <button class="delete-btn">
        Delete
      </button>

    `;

    // =========================
    // CHECKBOX
    // =========================

    const checkbox =
      taskCard.querySelector(".task-checkbox");

    checkbox.addEventListener("change", () => {

      tasks[index].completed =
        checkbox.checked;

      saveTasks();

      renderTasks();

    });

    // =========================
    // DELETE
    // =========================

    const deleteBtn =
      taskCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      tasks.splice(index, 1);

      saveTasks();

      renderTasks();

    });

    taskList.appendChild(taskCard);

  });

}

// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

// FIRST RENDER

renderTasks();

// ===============================
// ADD TASK BUTTON
// ===============================

addTaskBtn.addEventListener("click", () => {

  window.location.href =
    "add-task.html";

});

// ===============================
// SIDEBAR
// ===============================

menuBtn.addEventListener("click", () => {

  sidebar.classList.toggle("active");

});

// CLOSE SIDEBAR

window.addEventListener("click", (e) => {

  if (
    !sidebar.contains(e.target) &&
    e.target !== menuBtn
  ) {

    sidebar.classList.remove("active");
  }

});

// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click", () => {

  localStorage.clear();

  window.location.href =
    "../index.html";

});