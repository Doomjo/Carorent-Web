const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  document.querySelector("#alert").style.display = "none"
  document.querySelector("#alert").style.textAlign = "left"
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  document.querySelector("#alert").style.display = "none"
  document.querySelector("#alert").style.textAlign = "right"
});