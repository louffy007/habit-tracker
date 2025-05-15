let nameFiled = document.querySelector(".name span");
let goalField = document.querySelector(".goal span");
let addHabit = document.querySelector(".add-habit");
let modalDiv = document.querySelector(".modal");

let getUser = window.localStorage.getItem("currentUser");
let currentUser = JSON.parse(getUser);

nameFiled.textContent = currentUser.name;
goalField.textContent = currentUser.goal;

addHabit.onclick = function () {
  modalDiv.classList.add("open");
};
modalDiv.onclick = function (e) {
  if (e.target === modalDiv) {
    modalDiv.classList.remove("open");
  }
};
