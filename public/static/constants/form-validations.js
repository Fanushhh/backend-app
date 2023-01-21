import { FIRST_NAME_ERRORS, EMAIL_ERRORS } from "./register-errors.js";

export function checkInputMinLength(input, p, min) {
  if (input.value.length < min) {
    p.innerHTML = FIRST_NAME_ERRORS.MIN_LENGTH;
    p.style.display = "block";
    registerButton.disabled = true;
  } else {
    registerButton.disabled = false;
  }
}

export function checkInputMaxLength(input, p, max) {
  if (input.value.length > max) {
    p.innerHTML = FIRST_NAME_ERRORS.MAX_LENGTH;
    p.style.display = "block";
  }
}

export function checkValidEmail(input, p) {
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

export function checkIfAllLetters(input, p) {
  var letters = /^[A-Za-z]+$/;
  if (input.value.match(letters)) {
    return true;
  } else {
    p.innerHTML = FIRST_NAME_ERRORS.ONLY_LETTERS;
    p.style.display = "block";
  }
}

export function checkInputIsEmpty(input, p) {
  if (input.value.trim().length == 0) {
    p.innerHTML = "Password cannot be empty spaces";
    p.style.display = "block";
  }
}



