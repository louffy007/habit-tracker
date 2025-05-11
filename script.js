let submitBtn = document.querySelector(".submit-btn");
let userNameValue = document.querySelector("#full-name");
let userEmailValue = document.querySelector("#email");
let userAgeValue = document.querySelector("#age");
let userGoalValue = document.querySelector("#goal");
let userPassWordValue = document.querySelector("#password");

let userInformation = [];

// creat warning div

let warningDiv = document.createElement("div");
warningDiv.className = "warning-message py-2 radius-md";

console.log(warningDiv);

// populate the array from the existing content from the storage

if (localStorage.getItem("users")) {
  userInformation = JSON.parse(localStorage.getItem("users"));
}

submitBtn.onclick = function (e) {
  let userName = userNameValue.value.trim();
  let userEmail = userEmailValue.value.trim();
  let userAge = userAgeValue.value.trim();
  let userGoal = userGoalValue.value.trim();
  let userPassWord = userPassWordValue.value.trim();
  e.preventDefault();

  // assign the variable to the return value of the validating function
  let validuser = validating(
    userName,
    userEmail,
    userAge,
    userGoal,
    userPassWord,
    userInformation
  );

  if (typeof validuser === "object") {
    // calling the function that adds the new content to the array and storage

    addInfoToArrayAndToStorage(validuser);
    if (document.forms[0].contains(warningDiv)) {
      warningDiv.remove();
    }
    window.location.href = "main.html";
  } else {
    warningDiv.textContent = validuser;
    document.forms[0].appendChild(warningDiv);
  }
};

// validating
function validating(name, email, age, goal, password, array) {
  // here we call the function that check the email if already exist we assign it to result
  let nameChecker = checkingName(name);
  if (nameChecker !== true) return nameChecker;

  let emailChecking = checkingEmail(email);
  if (emailChecking !== true) return emailChecking;

  let ageChecker = checkingAge(age);
  if (ageChecker !== true) return ageChecker;

  let goalChecker = checkingGoal(goal);
  if (goalChecker !== true) return goalChecker;

  let passwordChecker = checkingpassWord(password);
  if (passwordChecker !== true) return passwordChecker;

  if (emailChecker(array, email)) {
    return "email already exists";
  }
  return {
    name: name,
    email: email.toLowerCase(),
    age: age,
    goal: goal,
    password: password,
  };
}

function checkingName(n) {
  return n != "" ? true : "Your Name field is empty!";
}
function checkingEmail(e) {
  return e != "" ? true : "Your email field is empty!";
}
function checkingAge(a) {
  return a != "" && !isNaN(a)
    ? true
    : "eather age filed is emty or not a valid age";
}
function checkingGoal(g) {
  return g != "" ? true : "goal filed is empty";
}
function checkingpassWord(p) {
  return p != "" ? true : "password filed is empty";
}

//pushing elements to array and storage
function addInfoToArrayAndToStorage(info) {
  userInformation.push(info);
  window.localStorage.setItem("users", JSON.stringify(userInformation));
}

// checking if the email already exist
function emailChecker(array, input) {
  let exist = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i].email.toLowerCase() === input.toLowerCase()) {
      exist = true;
      break;
    }
  }
  return exist;
}
