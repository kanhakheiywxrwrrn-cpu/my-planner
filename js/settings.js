// ===============================
// ELEMENTS
// ===============================

const backBtn =
  document.getElementById("backBtn");

const imageInput =
  document.getElementById("imageInput");

const profileImage =
  document.getElementById("profileImage");

const nameInput =
  document.getElementById("nameInput");

const saveProfileBtn =
  document.getElementById("saveProfileBtn");

const darkToggle =
  document.getElementById("darkToggle");

const clearDataBtn =
  document.getElementById("clearDataBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

// ===============================
// LOAD USER DATA
// ===============================

const savedName =
  localStorage.getItem("plannerUsername");

const savedImage =
  localStorage.getItem("plannerProfileImage");

// NAME

if (savedName) {

  nameInput.value = savedName;

}

// IMAGE

if (savedImage) {

  profileImage.src = savedImage;

} else {

  profileImage.src =
    "https://cdn-icons-png.flaticon.com/512/847/847969.png";

}

// ===============================
// BACK BUTTON
// ===============================

backBtn.addEventListener("click", () => {

  window.history.back();

});

// ===============================
// IMAGE UPLOAD
// ===============================

let currentImage = savedImage || "";

imageInput.addEventListener("change", (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {

    currentImage = reader.result;

    profileImage.src = currentImage;

  };

  reader.readAsDataURL(file);

});

// ===============================
// SAVE PROFILE
// ===============================

saveProfileBtn.addEventListener("click", () => {

  const newName =
    nameInput.value.trim();

  // VALIDATION

  if (newName === "") {

    alert(
      "Please enter your name 🌸"
    );

    return;
  }

  // SAVE NAME

  localStorage.setItem(
    "plannerUsername",
    newName
  );

  // SAVE IMAGE

  if (currentImage !== "") {

    localStorage.setItem(
      "plannerProfileImage",
      currentImage
    );

  }

  alert("Profile updated ✨");

});

// ===============================
// DARK MODE
// ===============================

const darkMode =
  localStorage.getItem("darkMode");

// LOAD MODE

if (darkMode === "true") {

  document.body.classList.add("dark");

  darkToggle.checked = true;

}

// TOGGLE

darkToggle.addEventListener("change", () => {

  if (darkToggle.checked) {

    document.body.classList.add("dark");

    localStorage.setItem(
      "darkMode",
      true
    );

  } else {

    document.body.classList.remove("dark");

    localStorage.setItem(
      "darkMode",
      false
    );

  }

});

// ===============================
// CLEAR DATA
// ===============================

clearDataBtn.addEventListener("click", () => {

  const confirmClear =
    confirm(
      "Delete all planner data?"
    );

  if (!confirmClear) return;

  localStorage.clear();

  alert("All data cleared");

  window.location.href =
    "../index.html";

});

// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click", () => {

  localStorage.clear();

  window.location.href =
    "../index.html";

});