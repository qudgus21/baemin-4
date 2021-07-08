import { ORIGIN, REGISTER, SIGNUP, TERMS } from "./constant/path.js";

const checkNextLevelPossible = () => {
  const $checkBoxesArray = Array.from(
    document.querySelectorAll("input[type=checkbox]:not(#all)")
  );
  const $radioArray = Array.from(
    document.querySelectorAll("input[type=radio]")
  );
  const $mandatoryCheckBoxTerms = $checkBoxesArray.slice(0, 3);

  const isNextLevelPossible =
    $mandatoryCheckBoxTerms.every(($term) => $term.checked) &&
    $radioArray.some(($ageTerm) => $ageTerm.checked);

  return isNextLevelPossible;
};

const onClickAllTermsCheckBoxHandler = () => {
  const $allTermsCheckBox = document.querySelector("#all");
  const $checkBoxesArray = Array.from(
    document.querySelectorAll("input[type=checkbox]:not(#all)")
  );

  const isAllChecked = $allTermsCheckBox.checked;

  $checkBoxesArray.forEach(
    ($checkBox) => ($checkBox.checked = isAllChecked ? true : false)
  );
};

const onClickInputsHandler = (e) => {
  const {
    target: { tagName, id, type },
  } = e;
  if (tagName === "INPUT" && type !== "submit") {
    if (id === "all") {
      onClickAllTermsCheckBoxHandler();
    }
    const isNextLevelPossible = checkNextLevelPossible();
    const $submitButton = document.querySelector("input[type=submit]");
    $submitButton.disabled = !isNextLevelPossible;
  }
};

const onClickSubmitButtonHandler = async (e) => {
  e.preventDefault();

  const $checkBoxesArray = Array.from(
    document.querySelectorAll("input[type=checkbox]:not(#all)")
  );
  const $over14RadioInput = document.querySelector("input[type=radio]#over-14");
  const terms = $checkBoxesArray
    .map(($checkBox) => $checkBox.checked)
    .reduce((acc, cur, idx) => {
      acc[`term${idx + 1}`] = cur;
      return acc;
    }, {});
  const isOver14 = $over14RadioInput.checked;

  const body = JSON.stringify({
    ...terms,
    isOver14,
  });

  const result = await fetch(`${ORIGIN}/${SIGNUP}/${TERMS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (result.ok) {
    location.assign(`/${SIGNUP}/${REGISTER}`);
  } else {
    alert("알 수 없는 에러");
  }
};

const initSignupTermsPage = () => {
  const $termsWrapperDiv = document.querySelector(".terms-form-wrapper");
  const $submitButton = document.querySelector("input[type=submit]");

  $termsWrapperDiv.addEventListener("click", onClickInputsHandler);
  $submitButton.addEventListener("click", onClickSubmitButtonHandler);
};

initSignupTermsPage();
