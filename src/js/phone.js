const makeRandomCode = (n) => {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

const completePhoneCheck = () => {
  const $phoneInput = document.querySelector("#phone-page input[name=phone]");
  const $certifyInput = document.querySelector(
    "#phone-page input[name=cetify_num]"
  );
  const $nextBtn = document.querySelector("#go-next-button");

  const phoneNumber = $phoneInput.value;
  const certifyNumber = $certifyInput.value;
  const phoneValidationRE = /^\d{3}-\d{3,4}-\d{4}$/;
  const certifyRE = /^[0-9]{4}$/;

  $nextBtn.disabled = !(
    phoneValidationRE.test(phoneNumber) && certifyRE.test(certifyNumber)
  );
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

const handlePhoneInputFocusIn = (e) => {
  e.target.parentNode.previousSibling.classList.add("focus");
};

const handlePhoneInputFocusOut = (e) => {
  e.target.parentNode.previousSibling.classList.remove("focus");
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

const handleCancleClick = (e) => {
  e.preventDefault();
  const $pwdCheck = e.target.nextSibling;
  e.target.parentNode.previousSibling.value = "";
  e.target.classList.remove("show");
  $pwdCheck.classList.remove("complete");
  completePhoneCheck();
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

const getInfo = () => {
  const $passwordInput = document.querySelector("input[name=phone]");
  const password = $passwordInput.value;
  return {
    password,
  };
};

let isInit = false;

const initPhonePage = ({
  onClickPrevButtonHandler,
  onClickNextButtonHandler,
}) => {
  if (isInit) return;
  isInit = true;

  const $phoneInput = document.querySelector(
    "#phone-page .phone_wrapper form input"
  );
  const $phoneCancleBtn = document.querySelector(
    "#phone-page .phone_wrapper form button"
  );
  const $certifyBtn = document.querySelector(
    "#phone-page .input_certify > button"
  );
  const $recertifyBtn = document.querySelector(
    "#phone-page .input_certify > div > button"
  );
  const $certifyInput = document.querySelector(
    "#phone-page input[name=cetify_num]"
  );
  const $pervBtn = document.querySelector("#go-back-button");
  const $nextBtn = document.querySelector("#go-next-button");

  $nextBtn.disabled = true;

  $phoneInput.addEventListener("keyup", handlePhoneInputChange);
  $phoneInput.addEventListener("focusin", handlePhoneInputFocusIn);
  $phoneInput.addEventListener("focusout", handlePhoneInputFocusOut);
  $certifyInput.addEventListener("keyup", handleCertificationChange);
  $certifyInput.addEventListener("focusin", handleCertificationFocusIn);
  $certifyInput.addEventListener("focusout", handleCertificationFocusOut);
  $phoneCancleBtn.addEventListener("click", handleCancleClick);
  $certifyBtn.addEventListener("click", handleCertificationClick);
  $recertifyBtn.addEventListener("click", handleReCertification);
  $pervBtn.addEventListener("click", onClickPrevButtonHandler);
  $nextBtn.addEventListener("click", () => {
    const info = getInfo();
    onClickNextButtonHandler(info);
  });
};

export default initPhonePage;
