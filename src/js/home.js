import { LOGIN } from "./constant/path.js";

const onClickLoginButton = () => {
  location.assign(`/${LOGIN}`);
};

const onClickLogOutButton = () => {
  const $login = document.querySelector("#login-btn");
  $login.textContent = `로그인해주세요`;
  localStorage.removeItem("nickname");

  const $loginButton = document.querySelector(".login-button-wrapper");

  $loginButton.addEventListener("click", onClickLoginButton);
};

const initHomePage = () => {
  const isLogin = localStorage.getItem("nickname") !== null;

  if (isLogin) {
    const $login = document.querySelector("#login-btn");
    $login.textContent = `환영합니다 ${localStorage.getItem("nickname")}`;
  }

  const $loginButton = document.querySelector(".login-button-wrapper");

  $loginButton.addEventListener(
    "click",
    isLogin ? onClickLogOutButton : onClickLoginButton
  );
};

initHomePage();
