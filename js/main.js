// R.Piranavan (CodeAlpha) TASK 2 Expense Tracker JS file  

const form = document.getElementById("expense-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

// Get and parse transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction to list
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> 
  <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">Delete</button>
  `;

  list.appendChild(item);
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Edit transaction by ID
function editTransaction(id) {
  const index = transactions.findIndex(transaction => transaction.id === id);

  if (index !== -1) {
    const editedText = prompt("Enter the new text:");
    const editedAmount = parseFloat(prompt("Enter the new amount:"));

    if (editedText !== null && !isNaN(editedAmount)) {
      transactions[index].text = editedText;
      transactions[index].amount = editedAmount;

      updateLocalStorage();
      init();
    }
  }
}

// Initialize app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
}

init();

form.addEventListener("submit", addTransaction);
