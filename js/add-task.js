// ===============================
// ELEMENTS
// ===============================

const backBtn =
  document.getElementById("backBtn");

const saveTaskBtn =
  document.getElementById("saveTaskBtn");

const taskTitle =
  document.getElementById("taskTitle");

const taskDescription =
  document.getElementById("taskDescription");

const taskDate =
  document.getElementById("taskDate");

const taskTime =
  document.getElementById("taskTime");

const taskLocation =
  document.getElementById("taskLocation");

const taskNotify =
  document.getElementById("taskNotify");

// ===============================
// BACK BUTTON
// ===============================

backBtn.addEventListener("click", () => {

  window.history.back();

});

// ===============================
// REQUEST NOTIFICATION
// ===============================

if ("Notification" in window) {

  Notification.requestPermission();

}

// ===============================
// SAVE TASK
// ===============================

saveTaskBtn.addEventListener("click", () => {

  // GET VALUES

  const title =
    taskTitle.value.trim();

  const description =
    taskDescription.value.trim();

  const date =
    taskDate.value;

  const time =
    taskTime.value;

  const location =
    taskLocation.value.trim();

  const notifyBefore =
    Number(taskNotify.value);

  // VALIDATION

  if (
    title === "" ||
    date === "" ||
    time === ""
  ) {

    alert(
      "Please fill all required fields 🌸"
    );

    return;
  }

  // TASK OBJECT

  const newTask = {

    id: Date.now(),

    title,
    description,
    date,
    time,
    location,

    notifyBefore,

    completed: false

  };

  // LOAD OLD TASKS

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  // ADD NEW TASK

  tasks.push(newTask);

  // SAVE TASKS

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  // NOTIFICATION

  scheduleNotification(newTask);

  // SUCCESS

  alert("Task added successfully ✨");

  // GO TO TODO PAGE

  window.location.href =
    "todo.html";

});

// ===============================
// NOTIFICATION FUNCTION
// ===============================

function scheduleNotification(task) {

  if (
    Notification.permission !== "granted"
  ) {
    return;
  }

  // TASK DATE + TIME

  const taskDateTime =
    new Date(`${task.date}T${task.time}`);

  // NOTIFY BEFORE

  const notifyTime =
    taskDateTime.getTime() -
    task.notifyBefore * 60 * 1000;

  // CURRENT TIME

  const now = new Date().getTime();

  // TIME DIFFERENCE

  const timeout =
    notifyTime - now;

  // SCHEDULE

  if (timeout > 0) {

    setTimeout(() => {

      new Notification(
        "Planner Reminder 🌸",
        {
          body:
            `${task.title} starts in ` +
            `${task.notifyBefore} minutes`
        }
      );

    }, timeout);

  }

}