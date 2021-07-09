import { LOGIN } from "./constant/path.js";

const onClickLoginButton = () => {
  location.assign(`/${LOGIN}`);
};

const initHomePage = () => {
  const $loginButton = document.querySelector(".login-button-wrapper");

  $loginButton.addEventListener("click", onClickLoginButton);
};

initHomePage();
