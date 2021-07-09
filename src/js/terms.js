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
    target: { tagName, id },
  } = e;
  if (tagName === "INPUT") {
    if (id === "all") {
      onClickAllTermsCheckBoxHandler();
    }
    const isNextLevelPossible = checkNextLevelPossible();
    const $nextButton = document.querySelector(".next-button");
    $nextButton.disabled = !isNextLevelPossible;
  }
};

const getInfo = () => {
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

  const info = {
    ...terms,
    isOver14,
  };

  return info;
};

let isInit = false;

const initTermsPage = ({
  onClickPrevButtonHandler,
  onClickNextButtonHandler,
}) => {
  if (isInit) return;
  isInit = true;

  const $termsWrapperDiv = document.querySelector(".terms-form-wrapper");
  const $prevButton = document.querySelector(".prev-button");
  const $nextButton = document.querySelector(".next-button");

  $termsWrapperDiv.addEventListener("click", onClickInputsHandler);
  $prevButton.addEventListener("click", onClickPrevButtonHandler);
  $nextButton.addEventListener("click", () => {
    const info = getInfo();
    onClickNextButtonHandler(info);
  });
};

export default initTermsPage;
