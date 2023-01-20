const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const lastNameInput = form.querySelector("input[name='lastName']");
const firstNameInput = form.querySelector("input[name='firstName']");
const emailInput = form.querySelector("input[name='email']");
const passwordInput = form.querySelector("input[name='password']");
const passwordRepeatInput = form.querySelector("input[name='confirmPassword']");
const registerButton = form.querySelector("button");
class Toastr {
  constructor(message, severity) {
    // Create the toastr container
    this.toastr = document.createElement("div");
    this.toastr.classList.add("toastr");

    const icon = document.createElement("i");

    switch (severity) {
      case "success":
        icon.classList.add("fa");
        icon.classList.add("fa-check");
        this.toastr.style.backgroundColor = 'green';
        break;
      case "error":
        icon.classList.add("fa-solid");
        icon.classList.add("fa-shield-xmark");
        this.toastr.style.backgroundColor = 'red';
        break;
      case "info":
        icon.classList.add("fa-solid");
        icon.classList.add("fa-circle-info");
        this.toastr.style.backgroundColor = '#146EBE';
        break;
      default:
        icon.classList.add("fa");
        icon.classList.add("fa-check");
        this.toastr.style.backgroundColor = 'red';
        break;
    }

    this.toastr.appendChild(icon);

    const content = document.createElement("p");
    content.textContent = message;

    this.toastr.appendChild(content);

    // Add the container to the beginning of the body
    document.body.appendChild(this.toastr);

    setTimeout(() => {
      this.toastr.remove();
    }, 3000);
  }
}
const FIRST_NAME_ERRORS = Object.freeze({
  REQUIRED: "Last name is required",
  MIN_LENGTH: "Last name must contain at least two letters",
  MAX_LENGTH: "Last name must contain a maximum of 30 letters",
  ONLY_LETTERS: "Last name must contain only letters",
  ONLY_SPACES: "Last name must not contain spaces",
});
const EMAIL_ERRORS = Object.freeze({
  REQUIRED: "Email-ul este obligatoriu",
  MIN_LENGTH: "Email-ul trebuie sa aiba minim 6 caractere",
  MAX_LENGTH: "Email-ul trebuie sa aiba maxim 100 caractere",
  ONLY_SPACES: "Email-ul nu poate contine doar spatii",
  INVALID: "The email is not valid",
});

[...inputs].map((input) => {
  input.addEventListener("focus", function () {
    form.classList.add("focused");
  });
  input.addEventListener("blur", function () {
    form.classList.remove("focused");
  });
});

// ca atunci cand scriem ceva in lastName, tu sa faci sa se afiseze p-ul
// fara sa-ti iei cu query selector p-ul, vreau sa te folosesti de nextSibling

function checkInputMinLength(input, p, min) {
  if (input.value.length < min) {
    p.innerHTML = FIRST_NAME_ERRORS.MIN_LENGTH;
    p.style.display = "block";
    registerButton.disabled = true;
  } else {
    registerButton.disabled = false;
  }
}

function checkInputMaxLength(input, p, max) {
  if (input.value.length > max) {
    p.innerHTML = FIRST_NAME_ERRORS.MAX_LENGTH;
    p.style.display = "block";
  }
}

function checkValidEmail(input, p) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (input.value.match(validRegex)) {
    registerButton.disabled = false;
    return true;
  } else {
    p.innerHTML = EMAIL_ERRORS.INVALID;
    p.style.display = "block";
    registerButton.disabled = true;
  }
}

function checkIfAllLetters(input, p) {
  var letters = /^[A-Za-z]+$/;
  if (input.value.match(letters)) {
    return true;
  } else {
    p.innerHTML = FIRST_NAME_ERRORS.ONLY_LETTERS;
    p.style.display = "block";
  }
}

function checkInputIsEmpty(input, p) {
  if (input.value.trim().length == 0) {
    p.innerHTML = "Password cannot be empty spaces";
    p.style.display = "block";
  }
}

firstNameInput.addEventListener("input", function (event) {
  const input = event.target;
  const p = input.nextElementSibling;

  p.style.display = "none";
  checkInputMinLength(input, p, 3);
  checkInputMaxLength(input, p, 30);
  checkIfAllLetters(input, p);
  checkInputIsEmpty(input, p);
});

lastNameInput.addEventListener("input", function (event) {
  const input = event.target;
  const p = input.nextElementSibling;

  p.style.display = "none";
  checkInputMinLength(input, p, 3);
  checkInputMaxLength(input, p, 30);
  checkIfAllLetters(input, p);
  checkInputIsEmpty(input, p);
});

emailInput.addEventListener("input", function (event) {
  const input = event.target;
  const p = input.nextElementSibling;
  p.style.display = "none";
  checkValidEmail(input, p);
  checkInputIsEmpty(input, p);
});

passwordInput.addEventListener("input", function (event) {
  const input = event.target;
  const p = input.nextElementSibling;
  p.style.display = "none";
  checkInputIsEmpty(input, p);
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const lastName = form.lastName.value;
  const firstName = form.firstName.value;
  const email = form.email.value;
  const password = form.password.value;
  const repeatPassword = form.confirmPassword.value;
  if (password == repeatPassword) {
    const data = {
      lastName,
      firstName,
      email,
      password,
    };

    const response = await fetch(`/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responsePayload = await response.json();
    console.log(responsePayload);
    if (response.status >= 200 && response.status < 300) {
      new Toastr(responsePayload.message, responsePayload.severity);
      setTimeout(() => window.location.assign('/templates/login.html'), 3000);
    } else {
      new Toastr(responsePayload.error, responsePayload.severity);
    }
  
  } else {
    new Toastr(responsePayload.error, responsePayload.severity);
  }
});
