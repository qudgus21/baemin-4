import initTermsPage from "./terms.js";
import initPhonePage from "./phone.js";
import initUserInfoPage from "./user-info.js";
import { LOGIN, SIGNUP } from "./constant/path.js";

const signup = async (info) => {
  const body = JSON.stringify(info);

  const result = await fetch(`/${SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  return result.ok;
};

const SignupStage = {
  _stage: 0,
  _signupInfo: {},
  setSignupInfo(info) {
    this._signupInfo = {
      ...this._signupInfo,
      ...info,
    };
  },
  init() {
    this._stage = 0;
    this.renderStage();
  },
  get stage() {
    return this._stage;
  },
  movePrevStage() {
    if (this._stage === 0) {
      history.back();
    } else {
      this._stage -= 1;
      this.renderStage();
    }
  },
  async moveNextStage(info) {
    this.setSignupInfo(info);
    if (this._stage === 2) {
      const isOk = await signup(this._signupInfo);
      if (isOk) {
        this.init();
        location.assign(`/${LOGIN}`);
      } else {
        alert("회원가입에 실패하셨습니다.");
      }
    } else {
      this._stage += 1;
      this.renderStage();
    }
  },
  renderStage() {
    const $termsPage = document.querySelector("#terms-page");
    const $phonePage = document.querySelector("#phone-page");
    const $userInfoPage = document.querySelector("#user-info-page");

    const displayNoneClassName = "display-none";

    if (this._stage === 0) {
      $termsPage.classList.remove(displayNoneClassName);
      $phonePage.classList.add(displayNoneClassName);
      $userInfoPage.classList.add(displayNoneClassName);
      initTermsPage({
        onClickPrevButtonHandler: this.movePrevStage.bind(this),
        onClickNextButtonHandler: this.moveNextStage.bind(this),
      });
    } else if (this._stage === 1) {
      $termsPage.classList.add(displayNoneClassName);
      $phonePage.classList.remove(displayNoneClassName);
      $userInfoPage.classList.add(displayNoneClassName);
      initPhonePage({
        onClickPrevButtonHandler: this.movePrevStage.bind(this),
        onClickNextButtonHandler: this.moveNextStage.bind(this),
      });
    } else {
      $termsPage.classList.add(displayNoneClassName);
      $phonePage.classList.add(displayNoneClassName);
      $userInfoPage.classList.remove(displayNoneClassName);
      initUserInfoPage({
        onClickPrevButtonHandler: this.movePrevStage.bind(this),
        onClickNextButtonHandler: this.moveNextStage.bind(this),
      });
    }
  },
};

const initSignupPage = () => {
  const stage = Object.create(SignupStage);
  stage.init();
};

initSignupPage();
