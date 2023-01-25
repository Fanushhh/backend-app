import { Toastr } from "./components/toastr.js";
import { post } from "./utils/requests.js";

const form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const requestPayload = {
    email,
    password,
  };

  const response = await post("/auth/login", requestPayload);

  const responsePayload = await response.json();

  if (response.status >= 200 && response.status < 300) {
    new Toastr(responsePayload.message, responsePayload.severity);
    setTimeout(() => window.location.assign("/templates/admin.html"), 3000);
  } else {
    new Toastr(responsePayload.error, responsePayload.severity);
  }
});
