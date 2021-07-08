const handleEmailChange = (e) => {
  const $emailCancleBtn = e.target.nextSibling.childNodes[0];
  const $emailBtn = e.target.parentNode.lastChild;
  if (e.target.value.length) {
    $emailCancleBtn.classList.remove("none");
    $emailBtn.classList.add("focus");
  } else {
    $emailCancleBtn.classList.add("none");
    $emailBtn.classList.remove("focus");
  }
};

const handleFocusIn = (e) => {
  e.target.parentNode.previousSibling.classList.add("focus");
};

const handleFocusOut = (e) => {
  e.target.parentNode.previousSibling.classList.remove("focus");
};

const handleEmailBtnClick = (e) => {
  e.preventDefault();
  const $emailCancleBtn = e.target.previousSibling.childNodes[0];
  const $emailCheck = e.target.previousSibling.childNodes[1];
  const $emailInput = e.target.parentNode.firstChild;
  const $userInfoWrapper = document.querySelector(".u_container .info");
  if ($emailInput.value) {
    e.target.classList.remove("focus");
    $emailCancleBtn.classList.add("none");
    $emailCheck.classList.add("complete");
    $emailCheck.classList.remove("none");
    $userInfoWrapper.classList.remove("none");
    $emailInput.disabled = true;
  }
  completeRegisterCheck();
};

const handleNicknameChange = (e) => {
  const $nameCheck = e.target.nextSibling.childNodes[0];
  if (e.target.value) {
    $nameCheck.classList.add("complete");
  } else {
    $nameCheck.classList.remove("complete");
  }
  completeRegisterCheck();
};

const checkSame = (pwd) => {
  let cnt = 1;
  let ch;
  for (let i = 0; i < pwd.length; i++) {
    if (ch === pwd[i] && 0 <= pwd[i] && pwd[i] <= 9) {
      cnt++;
    } else {
      cnt = 1;
    }
    ch = pwd[i];
    if (cnt === 3) return true;
  }
  return false;
};

const checkConsecutive = (pwd) => {
  let cnt = 1;
  let diff;
  let cur_diff;
  let ch;
  for (let i = 0; i < pwd.length; i++) {
    cur_diff = pwd[i] - ch;
    if (diff === cur_diff && Math.abs(cur_diff) === 1) {
      cnt++;
    } else if (Math.abs(cur_diff) === 1) {
      diff = cur_diff;
      cnt = 2;
    } else {
      diff = -1;
      cnt = 1;
    }
    ch = pwd[i];
    if (cnt === 3) return true;
  }
  return false;
};

const checkCombination = (pwd) => {
  let cnt = 0;
  const num = pwd.search(/[0-9]/g);
  const lower = pwd.search(/[a-z]/g);
  const upper = pwd.search(/[A-Z]/g);
  const spe = pwd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  if (num >= 0) cnt += 1;
  if (lower >= 0) cnt += 1;
  if (upper >= 0) cnt += 1;
  if (spe >= 0) cnt += 1;
  if (cnt != 2) {
    return false;
  }
  return true;
};

const pwdValidation = (pwd) => {
  let ret;
  const isCombinated = checkCombination(pwd);
  const isSame = checkSame(pwd);
  const isSeq = checkConsecutive(pwd);

  if (pwd.length < 10 || !isCombinated) {
    ret =
      "10자 이상 영어, 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다.";
  } else if (isSame || isSeq) {
    ret = "같은 숫자 혹은 연속된 숫자를 3개이상 입력할 수 없습니다.";
  }
  return ret;
};

const handlePwdChange = (e) => {
  const $pwdAlertMsg = e.target.parentNode.nextSibling;
  const $pwdCheck = e.target.nextSibling.childNodes[0];
  const $form = e.target.parentNode;

  let result = pwdValidation(e.target.value);
  if (result) {
    $pwdAlertMsg.innerHTML = result;
    $pwdAlertMsg.classList.add("alert");
    $pwdAlertMsg.classList.remove("none");
    $pwdCheck.classList.remove("complete");
    $form.classList.add("b_red");
  } else {
    $pwdAlertMsg.classList.add("none");
    $pwdAlertMsg.classList.remove("alert");
    $pwdCheck.classList.add("complete");
    $form.classList.remove("b_red");
  }

  if (!e.target.value) {
    $pwdAlertMsg.classList.add("none");
    $pwdAlertMsg.classList.remove("alert");
    $form.classList.remove("b_red");
  }
  completeRegisterCheck();
};

const birthValidation = (birth) => {
  let date = birth.split(".");
  let y = parseInt(date[0], 10),
    m = parseInt(date[1], 10),
    d = parseInt(date[2], 10);
  let dateRegex =
    /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
  let validation = /^[0-9]{4}.[0-9]{2}.[0-9]{2}/;
  return validation.test(birth) && dateRegex.test(d + "-" + m + "-" + y);
};

const handleBirthChange = (e) => {
  const $birthAlertMsg = e.target.parentNode.nextSibling;
  const $birthCheck = e.target.nextSibling.childNodes[0];
  const $form = e.target.parentNode;
  let value = e.target.value;

  if (e.keyCode !== 8) {
    if (value.length === 4) {
      e.target.value += ".";
    }
    if (value.length === 7) {
      e.target.value += ".";
    }
  }

  let result = birthValidation(value);

  if (result) {
    $birthAlertMsg.classList.add("none");
    $birthAlertMsg.classList.remove("alert");
    $birthCheck.classList.add("complete");
    $form.classList.remove("b_red");
  } else {
    $birthAlertMsg.innerHTML = "올바른 생년월일을 입력해야 합니다.";
    $birthAlertMsg.classList.add("alert");
    $birthAlertMsg.classList.remove("none");
    $birthCheck.classList.remove("complete");
    $form.classList.add("b_red");
  }
  if (!e.target.value) {
    $birthAlertMsg.classList.add("none");
    $birthAlertMsg.classList.remove("alert");
    $form.classList.remove("b_red");
  }
  completeRegisterCheck();
};

const completeRegisterCheck = () => {
  const $completes = document.querySelectorAll(
    ".u_container form > div > span"
  );
  const $next = document.querySelector(".u_container header button");

  const isCompleted = Array.from($completes).every((complete) =>
    complete.classList.contains("complete")
  );

  if (isCompleted) {
    $next.classList.add("complete");
  } else {
    $next.classList.remove("complete");
  }
};

const handleCompleteClick = (e) => {
  const $phoneInput = document.querySelector(
    ".p_container .phone_wrapper form input"
  );
  const $emailInput = document.querySelector(".u_container input[name=email]");
  const $nameInput = document.querySelector(
    ".u_container input[name=nickname]"
  );
  const $pwdInput = document.querySelector(".u_container input[name=password]");
  const $birthInput = document.querySelector(".u_container input[name=birth]");

  if (e.target.classList.contains("complete")) {
    let phone = $phoneInput.value;
    let email = $emailInput.value;
    let name = $nameInput.value;
    let password = $pwdInput.value;
    let birth = $birthInput.value;

    let userData = {
      method: "POST",
      body: JSON.stringify({ phone, email, name, password, birth }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/signup/register`, userData)
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        alert("아이디 또는 패스워드를 확인해 주세요.");
      });
  }
};

const handlePhoneInputChange = (e) => {
  const $phoneCancleBtn = e.target.nextSibling.childNodes[0];
  const $pwdCheck = $phoneCancleBtn.nextSibling;

  let value = e.target.value;

  $phoneCancleBtn.classList.add("show");
  if (value.length === 0) {
    $phoneCancleBtn.classList.remove("show");
  }

  if (e.keyCode !== 8) {
    if (value.length === 3) {
      e.target.value += "-";
    }
    if (value.length === 8) {
      e.target.value += "-";
    }
  }

  if (value.match(/^\d{3}-\d{3,4}-\d{4}$/)) {
    $pwdCheck.classList.add("complete");
  } else {
    $pwdCheck.classList.remove("complete");
  }
  completePhoneCheck();
};

const handleCancleClick = (e) => {
  e.preventDefault();
  const $pwdCheck = e.target.nextSibling;
  e.target.parentNode.previousSibling.value = "";
  e.target.classList.remove("show");
  $pwdCheck.classList.remove("complete");
  completePhoneCheck();
};

const handlePhoneInputFocusIn = (e) => {
  e.target.parentNode.previousSibling.classList.add("focus");
};

const handlePhoneInputFocusOut = (e) => {
  e.target.parentNode.previousSibling.classList.remove("focus");
};

const handleCertificationClick = (e) => {
  setTimeout(() => {
    e.target.classList.add("none");
    e.target.nextSibling.classList.remove("hidden");
    e.target.nextSibling.childNodes[1].childNodes[0].focus();
    e.target.nextSibling.childNodes[1].childNodes[0].value = makeRandomCode(4);
    completePhoneCheck();
  }, 2000);
};

const handleReCertification = (e) => {
  setTimeout(() => {
    e.target.previousSibling.childNodes[0].value = makeRandomCode(4);
    completePhoneCheck();
  }, 2000);
};

const makeRandomCode = (n) => {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

const completePhoneCheck = () => {
  const $phoneInput = document.querySelector(".p_container input[name=phone]");
  const $certifyInput = document.querySelector(
    ".p_container input[name=cetify_num]"
  );
  const $nextBtn = document.querySelector(".p_container header button");

  const phoneNumber = $phoneInput.value;
  const certifyNumber = $certifyInput.value;
  const phoneValidationRE = /^\d{3}-\d{3,4}-\d{4}$/;
  const certifyRE = /^[0-9]{4}$/;

  if (phoneValidationRE.test(phoneNumber) && certifyRE.test(certifyNumber)) {
    $nextBtn.classList.add("complete");
  } else {
    $nextBtn.classList.remove("complete");
  }
};

const handleCertificationChange = () => {
  completePhoneCheck();
};

const handleCertificationFocusIn = (e) => {
  e.target.parentNode.previousSibling.classList.add("focus");
};

const handleCertificationFocusOut = (e) => {
  e.target.parentNode.previousSibling.classList.remove("focus");
};

const handleNextBtnClick = (e) => {
  const $phoneContainer = document.querySelector(".p_container");
  const $userContainer = document.querySelector(".u_container");

  if (e.target.classList.contains("complete")) {
    $phoneContainer.classList.add("none");
    $userContainer.classList.remove("none");
  }
};

const handleBeforeToPhone = (e) => {
  const $phoneContainer = document.querySelector(".p_container");
  const $userContainer = document.querySelector(".u_container");

  $phoneContainer.classList.remove("none");
  $userContainer.classList.add("none");
};

const init = () => {
  const $inputs = document.querySelectorAll(".u_container input");
  const $emailInput = document.querySelector(".u_container input[name=email]");
  const $emailBtn = document.querySelector(
    ".u_container .email_wrapper > form > button"
  );
  const $nameInput = document.querySelector(
    ".u_container input[name=nickname]"
  );
  const $pwdInput = document.querySelector(".u_container input[name=password]");
  const $birthInput = document.querySelector(".u_container input[name=birth]");
  const $next = document.querySelector(".u_container header button");
  const $beforeToPhone = document.querySelector(".u_container header img");

  const $phoneInput = document.querySelector(
    ".p_container .phone_wrapper form input"
  );
  const $phoneCancleBtn = document.querySelector(
    ".p_container .phone_wrapper form button"
  );
  const $certifyBtn = document.querySelector(
    ".p_container .input_certify > button"
  );
  const $recertifyBtn = document.querySelector(
    ".p_container .input_certify > div > button"
  );
  const $certifyInput = document.querySelector(
    ".p_container input[name=cetify_num]"
  );
  const $nextBtn = document.querySelector(".p_container header button");

  $inputs.forEach((input) => {
    input.addEventListener("focusin", handleFocusIn);
    input.addEventListener("focusout", handleFocusOut);
  });
  $emailInput.addEventListener("keyup", handleEmailChange);
  $emailBtn.addEventListener("click", handleEmailBtnClick);
  $nameInput.addEventListener("keyup", handleNicknameChange);
  $pwdInput.addEventListener("keyup", handlePwdChange);
  $birthInput.addEventListener("keyup", handleBirthChange);
  $next.addEventListener("click", handleCompleteClick);
  $beforeToPhone.addEventListener("click", handleBeforeToPhone);

  $phoneInput.addEventListener("keyup", handlePhoneInputChange);
  $phoneInput.addEventListener("focusin", handlePhoneInputFocusIn);
  $phoneInput.addEventListener("focusout", handlePhoneInputFocusOut);
  $certifyInput.addEventListener("keyup", handleCertificationChange);
  $certifyInput.addEventListener("focusin", handleCertificationFocusIn);
  $certifyInput.addEventListener("focusout", handleCertificationFocusOut);
  $phoneCancleBtn.addEventListener("click", handleCancleClick);
  $certifyBtn.addEventListener("click", handleCertificationClick);
  $recertifyBtn.addEventListener("click", handleReCertification);
  $nextBtn.addEventListener("click", handleNextBtnClick);
};

init();
