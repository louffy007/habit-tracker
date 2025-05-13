let submitLogin = document.querySelector(".submit-btn");
let emailLogin = document.querySelector("#email");
let passwordLogin = document.querySelector("#password");

//warning
let warningDiv = document.createElement("div");
warningDiv.className = "warning-message py-2 radius-md";

let storedInfo = [];

if (localStorage.getItem("users")) {
  storedInfo = JSON.parse(localStorage.getItem("users"));
}
console.log(storedInfo);
submitLogin.onclick = function (e) {
  e.preventDefault();
  let emailLoginValue = emailLogin.value;
  let passwordLoginValue = passwordLogin.value;
  let found = storedInfo.find((ele) => {
    return (
      ele.email.toLowerCase() === emailLoginValue.toLowerCase().trim() &&
      ele.password === passwordLoginValue.trim()
    );
  });
  if (found) {
    window.location.href = "main.html";
  } else {
    if (!document.forms[0].contains(warningDiv)) {
      warningDiv.innerText =
        "email or password not correct try again or go sign up !";
      document.forms[0].appendChild(warningDiv);
    }
  }
};
