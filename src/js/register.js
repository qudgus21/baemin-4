const handleEmailChange = (e) => {
    const $emailCancleBtn = e.target.nextSibling.childNodes[0]
    const $emailBtn = e.target.parentNode.lastChild
    if (e.target.value.length) {
        $emailCancleBtn.classList.remove('none')
        $emailBtn.classList.add('focus')
    } else {
        $emailCancleBtn.classList.add('none')
        $emailBtn.classList.remove('focus')
    }

}

const handleFocusIn = (e) => {
    e.target.parentNode.previousSibling.classList.add('focus')
}

const handleFocusOut = (e) => {
    e.target.parentNode.previousSibling.classList.remove('focus')
}

const handleEmailBtnClick = (e) => {
    e.preventDefault()
    const $emailCancleBtn = e.target.previousSibling.childNodes[0]
    const $emailCheck = e.target.previousSibling.childNodes[1]
    const $emailInput = e.target.parentNode.firstChild
    const $userInfoWrapper = document.querySelector('.info')
    if ($emailInput.value) {
        $emailCancleBtn.classList.add('none')
        $emailCheck.classList.add('complete')
        $emailCheck.classList.remove('none')
        $userInfoWrapper.classList.remove('none')
        $emailInput.disabled = true;
    }
    completeCheck()
}

const handleNicknameChange = (e) => {
    const $nameCheck = e.target.nextSibling.childNodes[0]
    if (e.target.value) {
        $nameCheck.classList.add('complete')
    } else {
        $nameCheck.classList.remove('complete')
    }
    completeCheck()
}


const checkSame = (pwd) => {
    let cnt = 1;
    let ch;
    for (let i = 0; i < pwd.length; i++) {
        if (ch === pwd[i] && (0 <= pwd[i] && pwd[i] <= 9)) {
            cnt++
        } else {
            cnt = 1;
        }
        ch = pwd[i]
        if (cnt === 3) return true;
    }
    return false;
}


const checkConsecutive = (pwd) => {
    let cnt = 1;
    let diff;
    let cur_diff;
    let ch;
    for (let i = 0; i < pwd.length; i++) {
        cur_diff = pwd[i] - ch
        if (diff === cur_diff && Math.abs(cur_diff) === 1) {
            cnt++;
        } else if (Math.abs(cur_diff) === 1) {
            diff = cur_diff;
            cnt = 2;
        } else {
            diff = -1;
            cnt = 1;
        }
        ch = pwd[i]
        if (cnt === 3) return true;
    }
    return false;
}

const checkCombination = (pwd) => {
    let cnt = 0;
    const num = pwd.search(/[0-9]/g);
    const lower = pwd.search(/[a-z]/g);
    const upper = pwd.search(/[A-Z]/g);
    const spe = pwd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    if (num >= 0) cnt += 1
    if (lower >= 0) cnt += 1
    if (upper >= 0) cnt += 1
    if (spe >= 0) cnt += 1
    if (cnt != 2) {
        return false;
    }
    return true;
}


const pwdValidation = (pwd) => {
    let ret;
    const isCombinated = checkCombination(pwd)
    const isSame = checkSame(pwd)
    const isSeq = checkConsecutive(pwd)

    if (pwd.length < 10 || !isCombinated) {
        ret = '10자 이상 영어, 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다.'
    } else if (isSame || isSeq) {
        ret = '같은 숫자 혹은 연속된 숫자를 3개이상 입력할 수 없습니다.'
    }
    return ret;
}


const handlePwdChange = (e) => {
    const $pwdAlertMsg = e.target.parentNode.nextSibling
    const $pwdCheck = e.target.nextSibling.childNodes[0]
    const $form = e.target.parentNode

    let result = pwdValidation(e.target.value)
    if (result) {
        $pwdAlertMsg.innerHTML = result
        $pwdAlertMsg.classList.add('alert')
        $pwdAlertMsg.classList.remove('none')
        $pwdCheck.classList.remove('complete')
        $form.classList.add('b_red')
    } else {
        $pwdAlertMsg.classList.add('none')
        $pwdAlertMsg.classList.remove('alert')
        $pwdCheck.classList.add('complete')
        $form.classList.remove('b_red')
    }

    if (!e.target.value) {
        $pwdAlertMsg.classList.add('none')
        $pwdAlertMsg.classList.remove('alert')
        $form.classList.remove('b_red')
    }
    completeCheck()
}

const birthValidation = (birth) => {
    let date = birth.split(".");
    let y = parseInt(date[0], 10),
        m = parseInt(date[1], 10),
        d = parseInt(date[2], 10);
    let dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    let validation = /^[0-9]{4}.[0-9]{2}.[0-9]{2}/
    return validation.test(birth) && dateRegex.test(d + '-' + m + '-' + y)
}


const handleBirthChange = (e) => {
    const $birthAlertMsg = e.target.parentNode.nextSibling
    const $birthCheck = e.target.nextSibling.childNodes[0]
    const $form = e.target.parentNode
    let value = e.target.value

    if (e.keyCode !== 8) {
        if (value.length === 4) {
            e.target.value += '.'
        }
        if (value.length === 7) {
            e.target.value += '.'
        }
    }

    let result = birthValidation(value)

    if (result) {
        $birthAlertMsg.classList.add('none')
        $birthAlertMsg.classList.remove('alert')
        $birthCheck.classList.add('complete')
        $form.classList.remove('b_red')
    } else {
        $birthAlertMsg.innerHTML = '올바른 생년월일을 입력해야 합니다.'
        $birthAlertMsg.classList.add('alert')
        $birthAlertMsg.classList.remove('none')
        $birthCheck.classList.remove('complete')
        $form.classList.add('b_red')
    }
    if (!e.target.value) {
        $birthAlertMsg.classList.add('none')
        $birthAlertMsg.classList.remove('alert')
        $form.classList.remove('b_red')
    }
    completeCheck()
}


const completeCheck = () => {
    const $completes = document.querySelectorAll('form > div > span')
    const $next = document.querySelector('header button')

    const isCompleted = Array.from($completes).every(complete => complete.classList.contains('complete'));

    if (isCompleted) {
        $next.classList.add('complete')
    } else {
        $next.classList.remove('complete')
    }
}

const handleNextClick = (e) => {
    if (e.target.classList.contains('complete')) {
        window.location.href = '/';
    }
}


const init = () => {
    const $inputs = document.querySelectorAll('input')
    const $emailInput = document.querySelector('input[name=email]')
    const $emailBtn = document.querySelector('.email_wrapper > form > button')
    const $nameInput = document.querySelector('input[name=nickname]')
    const $pwdInput = document.querySelector('input[name=password]')
    const $birthInput = document.querySelector('input[name=birth]')
    const $next = document.querySelector('header button')

    $inputs.forEach(input => {
        input.addEventListener('focusin', handleFocusIn)
        input.addEventListener('focusout', handleFocusOut)
    })

    $emailInput.addEventListener('keyup', handleEmailChange)
    $emailBtn.addEventListener('click', handleEmailBtnClick);
    $nameInput.addEventListener('keyup', handleNicknameChange)
    $pwdInput.addEventListener('keyup', handlePwdChange)
    $birthInput.addEventListener('keyup', handleBirthChange)
    $next.addEventListener('click', handleNextClick)
}


init()