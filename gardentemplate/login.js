

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add('form__message--${type}');
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("#login");
//     const createAccountForm = document.querySelector("#createAccount");

//     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.add("form--hidden");
//         createAccountForm.classList.remove("form--hidden");
//     });
//     document.querySelector("#linkLogin").addEventListener("click", e => {
//         e.preventDefault();
//         loginForm.classList.remove("form--hidden");
//         createAccountForm.classList.add("form--hidden");
//     });

//     loginForm.addEventListener("submit", e => {
//         e.preventDefault();

//         // perfrom AJAX/Fetch login
//         setFormMessage(loginForm, "error", "Invalid Username/Password Combination");
//     });


//Login validation
$('#loginButton').on('click', function() {
  event.preventDefault();
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    console.log(username,password)
   $.ajax({
      url: '/verifyLogin',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username: username,password: password}),
      success: function(response) {
        console.log(response);
        res = JSON.parse(response)
        console.log(res.msg)
        if (res.msg == "correct") {
          window.location.href = "./suggestedGardens.html";
        }
      }
    });
});



