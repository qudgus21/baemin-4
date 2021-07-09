import { LOGIN } from "./constant/path.js";

const checkEmailInput = (email) => {
  const hasEmail = email.trim().length > 0;

  return hasEmail;
};

const checkPasswordInput = (password) => {
  const hasPassword = password.trim().length > 0;

  return hasPassword;
};

const onClickLoginButtonHandler = async (e) => {
  e.preventDefault();

  const $emailInput = document.querySelector("#email-input");
  const $passwordInput = document.querySelector("#password-input");
  const email = $emailInput.value;
  const password = $passwordInput.value;

  const isFillEmailInput = checkEmailInput(email);
  const isFillPasswordInput = checkPasswordInput(password);

  $emailInput.nextElementSibling.style.display = isFillEmailInput
    ? "none"
    : "block";
  $passwordInput.nextElementSibling.style.display = isFillPasswordInput
    ? "none"
    : "block";

  if (isFillEmailInput && isFillPasswordInput) {
    const body = JSON.stringify({ email, password });

    const result = await fetch(`/${LOGIN}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      // const json = await result.json()
      // console.log(json)

      localStorage.setItem("isLogin", "true");
      location.assign("/");
    } else {
      alert("이메일 또는 비밀번호가 틀립니다.");
    }
  }
};

const initLoginPage = () => {
  const $loginButton = document.querySelector('input[type="submit"]');

  $loginButton.addEventListener("click", onClickLoginButtonHandler);
};

initLoginPage();
