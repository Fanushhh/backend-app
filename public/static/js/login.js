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

const form = document.querySelector("form");
const loginFormInputs = document.querySelectorAll("input");

[...loginFormInputs].map((input) => {
  input.addEventListener("focus", function () {
    console.log("click");
    form.classList.add("focused");
  });
  input.addEventListener("blur", function () {
    form.classList.remove("focused");
  });
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = event.target.email.value;
  const password = event.target.password.value;

  const requestPayload = {
    email,
    password,
  };

  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestPayload),
  });

  const responsePayload = await response.json();

  console.log(responsePayload);

  if (response.status >= 200 && response.status < 300) {
    new Toastr(responsePayload.message, responsePayload.severity);
    setTimeout(() => window.location.assign('/templates/admin.html'), 3000);
  } else {
    new Toastr(responsePayload.error, responsePayload.severity);
  }
});
