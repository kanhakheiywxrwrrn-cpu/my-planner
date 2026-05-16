// ELEMENTS

const imageInput = document.getElementById("imageInput");
const profilePreview = document.getElementById("profilePreview");

const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("startBtn");

// IMAGE DATA

let profileImage = "";

// ===============================
// UPLOAD IMAGE
// ===============================

imageInput.addEventListener("change", function (e) {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function () {

    profileImage = reader.result;

    profilePreview.src = profileImage;
  };

  reader.readAsDataURL(file);

});

// ===============================
// START BUTTON
// ===============================

startBtn.addEventListener("click", function () {

  const username = usernameInput.value.trim();

  // CHECK NAME

  if (username === "") {

    alert("Please enter your name 🌸");

    return;
  }

  // SAVE TO LOCAL STORAGE

  localStorage.setItem("plannerUsername", username);

  // SAVE IMAGE

  if (profileImage !== "") {

    localStorage.setItem(
      "plannerProfileImage",
      profileImage
    );

  }

  // GO TO DASHBOARD

  window.location.href = "pages/dashboard.html";

});