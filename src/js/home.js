import { ORIGIN, LOGIN } from "./constant/path.js";

const onClickLoginButton = (e) => {
  const loginPageUrl = `${ORIGIN}/${LOGIN}`;

  location.assign(loginPageUrl);
};

const initHomePage = () => {
  const $loginButton = document.querySelector(".login-button-wrapper");

  $loginButton.addEventListener("click", onClickLoginButton);
};

initHomePage();
