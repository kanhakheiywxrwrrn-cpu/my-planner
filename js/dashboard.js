//
// ===============================
// ELEMENTS
// ===============================
//

const username = document.getElementById("username");
const userImage = document.getElementById("userImage");

const currentDate =
  document.getElementById("currentDate");

const monthYear =
  document.getElementById("monthYear");

const calendarDates =
  document.getElementById("calendarDates");

const prevMonth =
  document.getElementById("prevMonth");

const nextMonth =
  document.getElementById("nextMonth");

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.getElementById("sidebar");

const logoutBtn =
  document.getElementById("logoutBtn");

const todoBtn =
  document.getElementById("todoBtn");

const financeBtn =
  document.getElementById("financeBtn");

const addTaskBtn =
  document.getElementById("addTaskBtn");

const saveReviewBtn =
  document.getElementById("saveReviewBtn");

const dailyReview =
  document.getElementById("dailyReview");

const selectedTaskList =
  document.getElementById("selectedTaskList");

const selectedDateTitle =
  document.getElementById("selectedDateTitle");

//
// ===============================
// LOAD DATA
// ===============================
//

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

//
// ===============================
// TASKS (IMPORTANT FIX)
// ===============================
//

const tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

//
// ===============================
// CURRENT DATE
// ===============================
//

const today = new Date();

currentDate.textContent =
  today.toDateString();

//
// ===============================
// CALENDAR
// ===============================
//

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar() {

  calendarDates.innerHTML = "";

  const firstDay =
    new Date(currentYear, currentMonth, 1);

  const lastDay =
    new Date(currentYear, currentMonth + 1, 0);

  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay();

  const monthNames = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December"
  ];

  monthYear.textContent =
    `${monthNames[currentMonth]} ${currentYear}`;

  // empty cells
  for (let i = 0; i < startDay; i++) {
    calendarDates.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= totalDays; day++) {

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");

    dateDiv.innerHTML = `<span>${day}</span>`;

    // today highlight
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dateDiv.classList.add("today");
    }

    const fullDate = `${currentYear}-${
      String(currentMonth + 1).padStart(2, "0")
    }-${String(day).padStart(2, "0")}`;

    // check tasks
    const hasTask = tasks.some(
      (task) => task.date === fullDate
    );

    if (hasTask) {
      const dot = document.createElement("div");
      dot.classList.add("task-dot");
      dateDiv.appendChild(dot);
    }

    // click
    dateDiv.addEventListener("click", () => {
      showTasksByDate(fullDate);
    });

    calendarDates.appendChild(dateDiv);
  }
}

//
// ===============================
// SHOW TASKS BY DATE
// ===============================
//

function showTasksByDate(dateString) {

  selectedTaskList.innerHTML = "";

  const filteredTasks =
    tasks.filter(task => task.date === dateString);

  selectedDateTitle.textContent =
    `Tasks for ${dateString} 🌸`;

  if (filteredTasks.length === 0) {
    selectedTaskList.innerHTML = `
      <div class="empty-selected">
        No tasks for this day
      </div>
    `;
    return;
  }

  filteredTasks.forEach(task => {

    const card = document.createElement("div");
    card.classList.add("selected-task-card");

    card.innerHTML = `
      <h4>${task.title}</h4>
      <p>⏰ ${task.time}</p>
      <p>📍 ${task.location || "No location"}</p>
    `;

    selectedTaskList.appendChild(card);
  });
}

//
// ===============================
// INIT
// ===============================
//

renderCalendar();

const todayString =
  `${today.getFullYear()}-${
    String(today.getMonth() + 1).padStart(2, "0")
  }-${String(today.getDate()).padStart(2, "0")}`;

showTasksByDate(todayString);

//
// ===============================
// MONTH CHANGE
// ===============================
//

prevMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

//
// ===============================
// SIDEBAR
// ===============================
//

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

window.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && e.target !== menuBtn) {
    sidebar.classList.remove("active");
  }
});

//
// ===============================
// REVIEW
// ===============================
//

const savedReview =
  localStorage.getItem("dailyReview");

if (savedReview) {
  dailyReview.value = savedReview;
}

saveReviewBtn.addEventListener("click", () => {
  localStorage.setItem("dailyReview", dailyReview.value);
  alert("Review saved 🌸");
});

//
// ===============================
// NAVIGATION
// ===============================
//

todoBtn.addEventListener("click", () => {
  window.location.href = "todo.html";
});

financeBtn.addEventListener("click", () => {
  window.location.href = "finance.html";
});

addTaskBtn.addEventListener("click", () => {
  window.location.href = "add-task.html";
});

//
// ===============================
// LOGOUT
// ===============================
//

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "../index.html";
});