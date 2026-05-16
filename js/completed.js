// ===============================
// ELEMENTS
// ===============================

const backBtn =
  document.getElementById("backBtn");

const username =
  document.getElementById("username");

const userImage =
  document.getElementById("userImage");

const completedList =
  document.getElementById("completedList");

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
// BACK BUTTON
// ===============================

backBtn.addEventListener("click", () => {

  window.history.back();

});

// ===============================
// LOAD TASKS
// ===============================

const tasks =
  JSON.parse(
    localStorage.getItem("tasks")
  ) || [];

// ===============================
// FILTER COMPLETED TASKS
// ===============================

const completedTasks =
  tasks.filter(
    (task) => task.completed === true
  );

// ===============================
// EMPTY STATE
// ===============================

if (completedTasks.length === 0) {

  completedList.innerHTML = `
  
    <div class="empty-completed">
      No completed tasks yet 🌸
    </div>

  `;

} else {

  // =============================
  // RENDER COMPLETED TASKS
  // =============================

  completedTasks
    .slice()
    .reverse()
    .forEach((task) => {

      const card =
        document.createElement("div");

      card.classList.add("completed-card");

      card.innerHTML = `
      
        <div class="card-top">

          <h3>
            ${task.title}
          </h3>

          <div class="completed-badge">
            Completed
          </div>

        </div>

        <p class="task-description">
          ${
            task.description ||
            "No description"
          }
        </p>

        <div class="task-details">

          <p>
            📅 ${task.date}
          </p>

          <p>
            ⏰ ${task.time}
          </p>

          <p>
            📍 ${
              task.location ||
              "No location"
            }
          </p>

        </div>

      `;

      completedList.appendChild(card);

    });

}