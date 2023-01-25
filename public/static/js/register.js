import { Toastr } from "./components/toastr.js";
import {
  NAME_ERRORS,
  EMAIL_ERRORS,
  PASSWORD_ERRORS,
  PASSWORDS_NOT_THE_SAME,
} from "../constants/register-errors.js";
import {
  checkAllLetters,
  checkIsEmpty,
  checkMaxLength,
  checkMinLength,
  checkOnlySpaces,
  checkValidEmail
} from "./utils/form-validations.js";
import { post } from "./utils/requests.js";

const form = document.querySelector("form");
const lastNameInput = form.querySelector("input[name='lastName']");
const firstNameInput = form.querySelector("input[name='firstName']");
const emailInput = form.querySelector("input[name='email']");
const passwordInput = form.querySelector("input[name='password']");
const confirmPasswordInput = form.querySelector("input[name='confirmPassword']");
const submitButton = form.querySelector("button[type='submit']");

let lastNameErrorText = "";
let firstNameErrorText = "";
let emailErrorText = "";
let passwordErrorText = "";
let confirmPasswordErrorText = "";

submitButton.disabled = true;

function isSubmitButtonDisabled() {
  if (
    lastNameInput.value.length === 0 ||
    firstNameInput.value.length === 0 ||
    emailInput.value.length === 0 ||
    passwordInput.value.length === 0 ||
    confirmPasswordInput.value.length == 0
  )
    return true;

  if (
    lastNameErrorText.length !== 0 ||
    firstNameErrorText.length !== 0 ||
    emailErrorText.length !== 0 ||
    passwordErrorText.length !== 0 ||
    confirmPasswordErrorText.length !== 0
  )
    return true;

  return false;
}

function updateSubmitButtonDisabled() {
  isSubmitButtonDisabled()
    ? (submitButton.disabled = true)
    : (submitButton.disabled = false);
}

firstNameInput.addEventListener("input", function (event) {
  const errorField = event.target.nextElementSibling;

  errorField.style.display = "none";
  firstNameErrorText = "";

  if (!checkMinLength(event.target.value, 3))
    firstNameErrorText = NAME_ERRORS.MIN_LENGTH;

  if (!checkMaxLength(event.target.value, 30))
    firstNameErrorText = NAME_ERRORS.MAX_LENGTH;

  if (!checkAllLetters(event.target.value))
    firstNameErrorText = NAME_ERRORS.ONLY_LETTERS;

  if (checkOnlySpaces(event.target.value))
    firstNameErrorText = NAME_ERRORS.ONLY_SPACES;

  if (checkIsEmpty(event.target.value))
    firstNameErrorText = NAME_ERRORS.REQUIRED;

  if (firstNameErrorText) {
    errorField.style.display = "block";
    errorField.innerHTML = firstNameErrorText;
  }

  updateSubmitButtonDisabled();
});
lastNameInput.addEventListener("input", function (event) {
  const errorField = event.target.nextElementSibling;

  errorField.style.display = "none";
    lastNameErrorText = "";

  if (!checkMinLength(event.target.value, 3))
    lastNameErrorText = NAME_ERRORS.MIN_LENGTH;

  if (!checkMaxLength(event.target.value, 30))
    lastNameErrorText = NAME_ERRORS.MAX_LENGTH;

  if (!checkAllLetters(event.target.value))
    lastNameErrorText = NAME_ERRORS.ONLY_LETTERS;

  if (checkOnlySpaces(event.target.value))
    lastNameErrorText = NAME_ERRORS.ONLY_SPACES;

  if (checkIsEmpty(event.target.value))
    lastNameErrorText = NAME_ERRORS.REQUIRED;

  if (lastNameErrorText) {
    errorField.style.display = "block";
    errorField.innerHTML = lastNameErrorText;
  }

  updateSubmitButtonDisabled();
});
emailInput.addEventListener("input", function (event) {
  const errorField = event.target.nextElementSibling;
  console.log(emailInput.value.length)
  errorField.style.display = "none";
  emailErrorText = "";

  if (!checkMinLength(event.target.value, 3))
    emailErrorText = EMAIL_ERRORS.MIN_LENGTH;

  if (!checkMaxLength(event.target.value, 30))
    emailErrorText = EMAIL_ERRORS.MAX_LENGTH;

  if (checkOnlySpaces(event.target.value))
    emailErrorText = EMAIL_ERRORS.ONLY_SPACES;

  if (checkIsEmpty(event.target.value))
    emailErrorText = EMAIL_ERRORS.REQUIRED;

  if( !checkValidEmail(event.target.value))
    emailErrorText = EMAIL_ERRORS.INVALID;


  if (emailErrorText) {
    errorField.style.display = "block";
    errorField.innerHTML = emailErrorText;
  }

  updateSubmitButtonDisabled();
});
passwordInput.addEventListener("input", function (event) {
  const errorField = event.target.nextElementSibling;

  errorField.style.display = "none";
  passwordErrorText = "";

  if (!checkMinLength(event.target.value, 3))
  passwordErrorText = PASSWORD_ERRORS.MIN_LENGTH;

  if (!checkMaxLength(event.target.value, 30))
  passwordErrorText = PASSWORD_ERRORS.MAX_LENGTH;

  if (checkOnlySpaces(event.target.value))
  passwordErrorText = PASSWORD_ERRORS.ONLY_SPACES;

  if (checkIsEmpty(event.target.value))
  passwordErrorText = PASSWORD_ERRORS.REQUIRED;
  

  if (passwordErrorText) {
    errorField.style.display = "block";
    errorField.innerHTML = passwordErrorText;
  }

  updateSubmitButtonDisabled();
});
confirmPasswordInput.addEventListener("input", function (event) {
  const errorField = event.target.nextElementSibling;

  errorField.style.display = "none";
  confirmPasswordErrorText = "";

  if (!checkMinLength(event.target.value, 3))
  confirmPasswordErrorText = PASSWORD_ERRORS.MIN_LENGTH;

  if (!checkMaxLength(event.target.value, 30))
  confirmPasswordErrorText = PASSWORD_ERRORS.MAX_LENGTH;

  if (checkOnlySpaces(event.target.value))
  confirmPasswordErrorText = PASSWORD_ERRORS.ONLY_SPACES;

  if (checkIsEmpty(event.target.value))
  confirmPasswordErrorText = PASSWORD_ERRORS.REQUIRED;
  if(passwordInput.value !== confirmPasswordInput.value){
    confirmPasswordErrorText = PASSWORDS_NOT_THE_SAME;
  }
  

  if (confirmPasswordErrorText) {
    errorField.style.display = "block";
    errorField.innerHTML = confirmPasswordErrorText;
  }

  updateSubmitButtonDisabled();
});





form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const lastName = form.lastName.value;
  const firstName = form.firstName.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password == confirmPassword) {
    const requestPayload = {
      lastName,
      firstName,
      email,
      password,
    };

    const response = await post("/auth/register", requestPayload);

    const responsePayload = await response.json();

    if (response.status >= 200 && response.status < 300) {
      new Toastr(responsePayload.message, responsePayload.severity);
      setTimeout(() => window.location.assign("/templates/login.html"), 3000);
    } else {
      new Toastr(responsePayload.error, responsePayload.severity);
    }
  } else {
    new Toastr(PASSWORDS_NOT_THE_SAME, "error");
  }
});
