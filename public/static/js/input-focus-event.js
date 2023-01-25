const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");

[...inputs].map((input) => {
  input.addEventListener("focus", function () {
    form.classList.add("focused");
  });
  input.addEventListener("blur", function () {
    form.classList.remove("focused");
  });
});
