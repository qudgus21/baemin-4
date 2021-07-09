import { LOGIN } from "./constant/path.js";

const onClickLoginButton = () => {
  location.assign(`/${LOGIN}`);
};

const onClickLogOutButton = () => {
  localStorage.setItem("isLogin", "false");
};

const initHomePage = () => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (isLogin) {
    // $login = document.querySelector("#login-btn");
    // $login.textContent
  }

  const $loginButton = document.querySelector(".login-button-wrapper");

  $loginButton.addEventListener(
    "click",
    isLogin ? onClickLogOutButton : onClickLoginButton
  );
};

initHomePage();
