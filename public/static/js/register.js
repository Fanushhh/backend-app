import {FIRST_NAME_ERRORS, EMAIL_ERRORS} from '../constants/register-errors.js';
import { Toastr } from '../constants/toastr.js';
import {checkInputMinLength, checkInputMaxLength, checkValidEmail, checkIfAllLetters, checkInputIsEmpty } from '../constants/form-validations.js';
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const lastNameInput = form.querySelector("input[name='lastName']");
const firstNameInput = form.querySelector("input[name='firstName']");
const emailInput = form.querySelector("input[name='email']");
const passwordInput = form.querySelector("input[name='password']");
const passwordRepeatInput = form.querySelector("input[name='confirmPassword']");
const registerButton = form.querySelector("button");

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
