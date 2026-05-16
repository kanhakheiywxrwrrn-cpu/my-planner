// ===============================
// ELEMENTS
// ===============================

const backBtn =
  document.getElementById("backBtn");

const incomeBtn =
  document.getElementById("incomeBtn");

const expenseBtn =
  document.getElementById("expenseBtn");

const financeTitle =
  document.getElementById("financeTitle");

const financeAmount =
  document.getElementById("financeAmount");

const saveFinanceBtn =
  document.getElementById("saveFinanceBtn");

const historyList =
  document.getElementById("historyList");

const totalBalance =
  document.getElementById("totalBalance");

// ===============================
// TYPE
// ===============================

let currentType = "income";

// ===============================
// LOAD DATA
// ===============================

let financeData =
  JSON.parse(
    localStorage.getItem("financeData")
  ) || [];

// ===============================
// BACK BUTTON
// ===============================

backBtn.addEventListener("click", () => {

  window.history.back();

});

// ===============================
// TYPE BUTTONS
// ===============================

incomeBtn.addEventListener("click", () => {

  currentType = "income";

  incomeBtn.classList.add("active-type");

  expenseBtn.classList.remove("active-type");

});

expenseBtn.addEventListener("click", () => {

  currentType = "expense";

  expenseBtn.classList.add("active-type");

  incomeBtn.classList.remove("active-type");

});

// ===============================
// SAVE FINANCE
// ===============================

saveFinanceBtn.addEventListener("click", () => {

  const title =
    financeTitle.value.trim();

  const amount =
    Number(financeAmount.value);

  // VALIDATION

  if (
    title === "" ||
    amount <= 0
  ) {

    alert(
      "Please enter valid information 🌸"
    );

    return;
  }

  // CREATE ITEM

  const newItem = {

    id: Date.now(),

    type: currentType,

    title,

    amount

  };

  // ADD DATA

  financeData.push(newItem);

  // SAVE

  saveFinanceData();

  // CLEAR INPUTS

  financeTitle.value = "";
  financeAmount.value = "";

  // RENDER

  renderFinance();

});

// ===============================
// SAVE LOCAL STORAGE
// ===============================

function saveFinanceData() {

  localStorage.setItem(
    "financeData",
    JSON.stringify(financeData)
  );

}

// ===============================
// RENDER FINANCE
// ===============================

function renderFinance() {

  historyList.innerHTML = "";

  // EMPTY

  if (financeData.length === 0) {

    historyList.innerHTML = `
    
      <div class="empty-history">
        No finance history yet 💰
      </div>

    `;

    totalBalance.textContent = "$0";

    return;
  }

  // TOTAL

  let total = 0;

  financeData.forEach((item) => {

    if (item.type === "income") {

      total += item.amount;

    } else {

      total -= item.amount;
    }

  });

  totalBalance.textContent =
    `$${total}`;

  // SHOW HISTORY

  financeData
    .slice()
    .reverse()
    .forEach((item) => {

      const card =
        document.createElement("div");

      card.classList.add("history-card");

      const amountClass =
        item.type === "income"
          ? "income"
          : "expense";

      const symbol =
        item.type === "income"
          ? "+"
          : "-";

      card.innerHTML = `
      
        <div class="history-left">

          <h4>
            ${item.title}
          </h4>

          <p>
            ${item.type}
          </p>

        </div>

        <div>

          <p class="amount ${amountClass}">
            ${symbol}$${item.amount}
          </p>

          <button
            class="delete-btn"
            data-id="${item.id}"
          >
            Delete
          </button>

        </div>

      `;

      historyList.appendChild(card);

    });

  // DELETE BUTTONS

  const deleteButtons =
    document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const id =
        Number(button.dataset.id);

      financeData =
        financeData.filter(
          (item) => item.id !== id
        );

      saveFinanceData();

      renderFinance();

    });

  });

}

// FIRST RENDER

renderFinance();