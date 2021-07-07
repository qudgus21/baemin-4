const handlePhoneInputChange = (e) => {

    const $pwdCancleBtn = e.target.nextSibling.childNodes[0]
    const $pwdCheck = $pwdCancleBtn.nextSibling

    let value = e.target.value

    $pwdCancleBtn.classList.add('show')
    if (value.length === 0) {
        $pwdCancleBtn.classList.remove('show')
    }

    if (e.keyCode !== 8) {
        if (value.length === 3) {
            e.target.value += '-'
        }
        if (value.length === 8) {
            e.target.value += '-'
        }
    }

    if (value.match(/^\d{3}-\d{3,4}-\d{4}$/)) {
        $pwdCheck.classList.add('complete')
    } else {
        $pwdCheck.classList.remove('complete')
    }
    completeCheck()
}

const handleCancleClick = (e) => {
    e.preventDefault()
    const $pwdCheck = e.target.nextSibling
    e.target.parentNode.previousSibling.value = ''
    e.target.classList.remove('show')
    $pwdCheck.classList.remove('complete')
    completeCheck()
}

const handlePhoneInputFocusIn = (e) => {
    e.target.parentNode.previousSibling.classList.add('focus')
}

const handlePhoneInputFocusOut = (e) => {
    e.target.parentNode.previousSibling.classList.remove('focus')
}



const handleCertificationClick = (e) => {
    setTimeout(() => {
        e.target.classList.add('none');
        e.target.nextSibling.classList.remove('hidden')
        e.target.nextSibling.childNodes[1].childNodes[0].focus()
        e.target.nextSibling.childNodes[1].childNodes[0].value = makeRandomCode(4)
        completeCheck()
    }, 2000)
}

const handleReCertification = (e) => {
    setTimeout(() => {
        e.target.previousSibling.childNodes[0].value = makeRandomCode(4)
        completeCheck()
    }, 2000)
}


const makeRandomCode = (n) => {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}


const completeCheck = () => {
    const $pwdInput = document.querySelector('input[name=phone]')
    const $certifyInput = document.querySelector('input[name=cetify_num]')
    const $nextBtn = document.querySelector('header button')

    if ($pwdInput.value.match(/^\d{3}-\d{3,4}-\d{4}$/) && $certifyInput.value.match(/^[0-9]{4}$/)) {
        $nextBtn.classList.add('complete')
    } else {
        $nextBtn.classList.remove('complete')
    }
}

const handleCertificationChange = () => {
    completeCheck()
}

const handleCertificationFocusIn = (e) => {
    e.target.parentNode.previousSibling.classList.add('focus')
}

const handleCertificationFocusOut = (e) => {
    e.target.parentNode.previousSibling.classList.remove('focus')
}

const handleNextBtnClick = (e) => {
    if (e.target.classList.contains('complete')) {
        window.location.href = '/signup/register';
    }
}

const init = () => {
    const $pwdInput = document.querySelector('.phone_wrapper form input')
    const $pwdCancleBtn = document.querySelector('.phone_wrapper form button')
    const $certifyBtn = document.querySelector('.input_certify > button')
    const $recertifyBtn = document.querySelector('.input_certify > div > button')
    const $certifyInput = document.querySelector('input[name=cetify_num]')
    const $nextBtn = document.querySelector('header button')


    $pwdInput.addEventListener('keyup', handlePhoneInputChange)
    $pwdInput.addEventListener('focusin', handlePhoneInputFocusIn)
    $pwdInput.addEventListener('focusout', handlePhoneInputFocusOut)

    $certifyInput.addEventListener('keyup', handleCertificationChange)
    $certifyInput.addEventListener('focusin', handleCertificationFocusIn)
    $certifyInput.addEventListener('focusout', handleCertificationFocusOut)

    $pwdCancleBtn.addEventListener('click', handleCancleClick)
    $certifyBtn.addEventListener('click', handleCertificationClick)
    $recertifyBtn.addEventListener('click', handleReCertification)
    $nextBtn.addEventListener('click', handleNextBtnClick)
}

init();


