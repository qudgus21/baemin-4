const onClickCloseButton = () => {
  history.back();
};

const initCloseLayout = () => {
  const $closeButton = document.querySelector("button.close-button");

  $closeButton.addEventListener("click", onClickCloseButton);
};

initCloseLayout();
