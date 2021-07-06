const handlePhoneInputChange = (e) => {
    const $p_cancle = e.target.nextSibling.childNodes[0]
    const $p_check = $p_cancle.nextSibling

    let value = e.target.value

    $p_cancle.classList.add('show')
    if (value.length === 0) {
        $p_cancle.classList.remove('show')
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
        $p_check.classList.add('complete')
    } else {
        $p_check.classList.remove('complete')
    }
    completeCheck()
}

const handleCancleClick = (e) => {
    e.preventDefault()
    const $p_check = e.target.nextSibling
    e.target.parentNode.previousSibling.value = ''
    e.target.classList.remove('show')
    $p_check.classList.remove('complete')
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
    const $p_input = document.querySelector('input[name=phone]')
    const $c_input = document.querySelector('input[name=cetify_num]')
    const $next = document.querySelector('header button')

    if ($p_input.value.match(/^\d{3}-\d{3,4}-\d{4}$/) && $c_input.value.match(/^[0-9]{4}$/)) {
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

    const $p_input = document.querySelector('.phone_wrapper form input')
    const $p_cancle = document.querySelector('.phone_wrapper form button')
    const $c_btn = document.querySelector('.input_certify > button')
    const $c_re = document.querySelector('.input_certify > div > button')
    const $c_input = document.querySelector('input[name=cetify_num]')
    const $next = document.querySelector('header button')


    $p_input.addEventListener('keyup', handlePhoneInputChange)
    $p_input.addEventListener('focusin', handlePhoneInputFocusIn)
    $p_input.addEventListener('focusout', handlePhoneInputFocusOut)

    $c_input.addEventListener('keyup', handleCertificationChange)
    $c_input.addEventListener('focusin', handleCertificationFocusIn)
    $c_input.addEventListener('focusout', handleCertificationFocusOut)

    $p_cancle.addEventListener('click', handleCancleClick)
    $c_btn.addEventListener('click', handleCertificationClick)
    $c_re.addEventListener('click', handleReCertification)
    $next.addEventListener('click', handleNextClick)

}

init();