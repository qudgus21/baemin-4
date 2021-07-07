const handlePhoneInputChange = (e) => {
    const $pCancle = e.target.nextSibling.childNodes[0]
    const $pCheck = $pCancle.nextSibling

    let value = e.target.value

    $pCancle.classList.add('show')
    if (value.length === 0) {
        $pCancle.classList.remove('show')
    }

    if (e.keyCode !== 8) {
        if (value.length === 3) {
            e.target.value += '-'
        }
        if (value.length === 8) {
            e.target.value += '-'
        }
    }
    //backspace


    if (value.match(/^\d{3}-\d{3,4}-\d{4}$/)) {
        $pCheck.classList.add('complete')
    } else {
        $pCheck.classList.remove('complete')
    }
    completeCheck()
}

const handleCancleClick = (e) => {
    e.preventDefault()
    const $pCheck = e.target.nextSibling
    e.target.parentNode.previousSibling.value = ''
    e.target.classList.remove('show')
    $pCheck.classList.remove('complete')
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
    const $pInput = document.querySelector('input[name=phone]')
    const $cInput = document.querySelector('input[name=cetify_num]')
    const $next = document.querySelector('header button')

    if ($pInput.value.match(/^\d{3}-\d{3,4}-\d{4}$/) && $cInput.value.match(/^[0-9]{4}$/)) {
        $next.classList.add('complete')
    } else {
        $next.classList.remove('complete')
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

const handleNextClick = (e) => {
    if (e.target.classList.contains('complete')) {
        console.log('다음페이지로 이동')
    }
}

const init = () => {

    const $pInput = document.querySelector('.phone_wrapper form input')
    const $pCancle = document.querySelector('.phone_wrapper form button')
    const $cBtn = document.querySelector('.input_certify > button')
    const $cRe = document.querySelector('.input_certify > div > button')
    const $cInput = document.querySelector('input[name=cetify_num]')
    const $next = document.querySelector('header button')


    $pInput.addEventListener('keyup', handlePhoneInputChange)
    $pInput.addEventListener('focusin', handlePhoneInputFocusIn)
    $pInput.addEventListener('focusout', handlePhoneInputFocusOut)

    $cInput.addEventListener('keyup', handleCertificationChange)
    $cInput.addEventListener('focusin', handleCertificationFocusIn)
    $cInput.addEventListener('focusout', handleCertificationFocusOut)

    $pCancle.addEventListener('click', handleCancleClick)
    $cBtn.addEventListener('click', handleCertificationClick)
    $cRe.addEventListener('click', handleReCertification)
    $next.addEventListener('click', handleNextClick)

}

init();