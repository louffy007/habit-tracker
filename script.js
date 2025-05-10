let submitBtn = document.querySelector(".submit-btn");
let userNameValue = document.querySelector("#full-name");
let userEmailValue = document.querySelector("#email");
let userAgeValue = document.querySelector("#age");
let userGoalValue = document.querySelector("#goal");

let userInformation = [];

if (localStorage.getItem("users")) {
  userInformation = JSON.parse(localStorage.getItem("users"));
  console.log(userInformation);
}
submitBtn.onclick = function (e) {
  let userName = userNameValue.value;
  let userEmail = userEmailValue.value;
  let userAge = userAgeValue.value;
  let userGoal = userGoalValue.value;
  e.preventDefault();
  let validuser = validating(
    userName,
    userEmail,
    userAge,
    userGoal,
    userInformation
  );
  if (validuser) {
    addInfoToArrayAndToStorage(validuser);
  } else {
    window.alert("the email already exist or one of the fields is empty");
  }
};

// validating
function validating(name, email, age, goal, array) {
  let result = emailChecker(array, email);
  if (name != "" && email != "" && age != "" && goal != "" && !result) {
    return {
      name: name,
      email: email,
      age: age,
      goal: goal,
    };
  } else {
    return false;
  }
}

//adding information to the array and the storage
function addInfoToArrayAndToStorage(info) {
  userInformation.push(info);
  window.localStorage.setItem("users", JSON.stringify(userInformation));
}

// email checker
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
