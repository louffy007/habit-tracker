// ==========================
// * HABIT RENDERING
// ==========================

//creat one card.
let sectionContainer = document.querySelector(".section-container");
function elementsAdding(habit) {
  //creat card elements
  let habitCardElement = document.createElement("article");
  let cardTop = document.createElement("div");
  let habitTitleElement = document.createElement("h4");
  let habitDescElement = document.createElement("p");
  let habitCatElement = document.createElement("p");

  //create card buttons elements
  let buttonsContainer = document.createElement("div");
  let habitDeleteElement = document.createElement("button");
  let habitEditElement = document.createElement("button");
  let deleteIcon = document.createElement("img");
  let editIcon = document.createElement("img");

  //add classess to the elements
  habitCardElement.classList.add("card", "radius-md");
  cardTop.classList.add("card-top");
  habitTitleElement.classList.add("card-title");
  habitCatElement.classList.add("card-cat", "radius-md");
  habitDescElement.classList.add("card-description");

  //add clasess and srcs to the card buttons
  buttonsContainer.classList.add("buttons-container");
  habitDeleteElement.classList.add("delete-button");
  habitEditElement.classList.add("delete-button");
  deleteIcon.classList.add("delete-icon");
  editIcon.classList.add("edit-icon");
  deleteIcon.setAttribute("src", "assets/icons/trash.svg");
  editIcon.setAttribute("src", "assets/icons/pencil-square.svg");

  // adding content dynamicly to the card
  habitTitleElement.textContent = habit.title;
  habitDescElement.textContent = habit.description;
  habitCatElement.textContent = habit.category;
  habitCardElement.dataset.id = habit.id;

  // appending elements
  cardTop.appendChild(habitTitleElement);
  cardTop.appendChild(habitCatElement);
  habitCardElement.appendChild(cardTop);
  habitCardElement.appendChild(habitDescElement);

  habitDeleteElement.appendChild(deleteIcon);
  habitEditElement.appendChild(editIcon);
  buttonsContainer.appendChild(habitDeleteElement);
  buttonsContainer.appendChild(habitEditElement);
  habitCardElement.appendChild(buttonsContainer);

  sectionContainer.appendChild(habitCardElement);
}
// loop through array and call the one card function
function cardRendering(habitArr) {
  for (let i = 0; i < habitArr.length; i++) {
    elementsAdding(habitArr[i]);
  }
}

// ==========================
// * card delete full logic
// ==========================

sectionContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    let deleted = e.target.closest(".card");
    let deletedCardId = Number(deleted.dataset.id);

    habits = habits.filter((ele) => {
      console.log(typeof ele.id);
      return ele.id !== deletedCardId;
    });
    localStorage.setItem(`user: ${currentUser.email}`, JSON.stringify(habits));

    deleted.remove();
  }
});

// ==========================
// * card edit full logic
// ==========================

sectionContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-icon")) {
    modalDiv.classList.add("open");
    editedCardId = Number(e.target.closest(".card").dataset.id);
    console.log(typeof editedCardId);
    let editedCard = habits.find((ele) => {
      return ele.id === editedCardId;
    });
    habitTitle.value = editedCard.title;
    habitCat.value = editedCard.category;
    habitDesc.value = editedCard.description;
  }
});
