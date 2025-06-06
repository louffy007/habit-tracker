let editedCardId;

// ==========================
// * USER INFO + HEADER DISPLAY
// ==========================

// header info and button.
let nameField = document.querySelector(".name span");
let goalField = document.querySelector(".goal span");

// we get the current user info fro mthe storage.
let getUser = window.localStorage.getItem("currentUser");
let currentUser = JSON.parse(getUser);
if (currentUser == null) {
  window.location.href = "signup.html";
}

nameField.textContent = currentUser.name;
goalField.textContent = currentUser.goal;

//logout button
let logout = document.querySelector(".logout");
if (logout) {
  logout.onclick = function () {
    let confirmed = window.confirm("are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    }
  };
}

// ==========================
// * STORAGE SETUP & HABIT ARRAY
// ==========================

//parse and get item and pass them to the array
let habits =
  JSON.parse(localStorage.getItem(`user: ${currentUser.email}`)) || [];

window.onload = function () {
  cardRendering(habits);
};

// ==========================
// * MODAL: OPEN / CLOSE HANDLING
// ==========================
//add habit button
let addHabit = document.querySelector(".add-habit");
//modal.
let modalDiv = document.querySelector(".modal");
// open and close the modal box.
addHabit.onclick = function () {
  editedCardId = null;
  modalDiv.classList.add("open");
};
modalDiv.onclick = function (e) {
  if (e.target === modalDiv) {
    modalDiv.classList.remove("open");
  }
};
// ==========================
// *  HABIT FORM: INPUT, VALIDATION, SUBMISSION
// ==========================
// geting the modal form info.
let habitTitle = document.querySelector("#habit-title");
let habitCat = document.querySelector("#habit-cat");
let habitDesc = document.querySelector("#habit-description");
let habitSubmit = document.querySelector(".submit-btn");

// getting the form data
function getFormData() {
  let idContent = editedCardId || Date.now();
  let dataObject = {
    id: idContent,
    title: habitTitle.value,
    category: habitCat.value,
    description: habitDesc.value,
  };
  return dataObject;
}
// validate the data
function validateData(data) {
  if (data.title != "" && data.category != "" && data.description != "") {
    return true;
  } else {
    return false;
  }
}
//add habits to array and storage
function createAndPushHabits(object, email) {
  habits.push(object);

  localStorage.setItem(`user: ${email}`, JSON.stringify(habits));
}
//empty the data
function clearDataInput() {
  document.forms[0].reset();
}

//warning
let warningDiv = document.createElement("div");
warningDiv.className = "warning-message py-2 radius-md";

//habit submit function

let handleSubmit = function (e) {
  e.preventDefault();
  let habitData = getFormData();
  let validHabitData = validateData(habitData);

  if (validHabitData) {
    if (editedCardId) {
      habits = habits.map((ele) => {
        return ele.id === Number(editedCardId) ? habitData : ele;
      });
      clearDataInput();
      modalDiv.classList.remove("open");
      let theCardToEdit = document.querySelector(
        `.card[data-id="${editedCardId}"]`
      );
      let modifiedTitle = theCardToEdit.querySelector(".card-title");
      let modifiedCat = theCardToEdit.querySelector(".card-cat");
      let modifiedDesc = theCardToEdit.querySelector(".card-description");
      modifiedTitle.innerText = habitData.title;
      modifiedCat.innerText = habitData.category;
      modifiedDesc.innerText = habitData.description;
      editedCardId = null;
    } else {
      createAndPushHabits(habitData, currentUser.email);
      elementsAdding(habitData);
    }
    clearDataInput();
    modalDiv.classList.remove("open");
  } else {
    if (!document.forms[0].contains(warningDiv)) {
      warningDiv.textContent = "Your Inputs are empty enter a valid data!";
      document.forms[0].appendChild(warningDiv);
    }
  }
};
habitSubmit.onclick = handleSubmit;
