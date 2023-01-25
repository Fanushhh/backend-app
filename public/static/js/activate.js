import { Toastr } from "./components/toastr.js";
import { post } from "./utils/requests.js";

async function activateAccount() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const requestPayload = {
    token,
  };

  const response = await post("/auth/activate", requestPayload);

  const responsePayload = await response.json();

  if (response.status >= 200 && response.status < 300) {
    new Toastr(responsePayload.message, responsePayload.severity);
    setTimeout(() => window.location.assign("/templates/login.html"), 3000);
  } else {
    new Toastr(responsePayload.error, responsePayload.severity);
    setTimeout(() => window.location.assign("/templates/register.html"), 3000);
  }
}

activateAccount();
