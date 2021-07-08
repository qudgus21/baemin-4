import { LOGIN, ORIGIN } from "./constant/path.js";

const checkEmailInput = (email) => {
  const hasEmail = email.trim().length > 0;

  return hasEmail;
};

const checkPasswordInput = (password) => {
  const hasPassword = password.trim().length > 0;

  return hasPassword;
};

const initLoginPage = () => {
  const $emailInput = document.querySelector("#email-input");
  const $passwordInput = document.querySelector("#password-input");
  const $loginButton = document.querySelector('input[type="submit"]');

  $loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const $emailInput = document.querySelector("#email-input");
    const $passwordInput = document.querySelector("#password-input");
    const email = $emailInput.value;
    const password = $passwordInput.value;

    const url = new URL(`${ORIGIN}/${LOGIN}`);
    const body = JSON.stringify({ email, password });

    const result = await fetch(url.pathname, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      location.assign("/");
    } else {
      alert("이메일 또는 비밀번호가 잘 못 되었습니다.");
    }
  });
};

initLoginPage();
