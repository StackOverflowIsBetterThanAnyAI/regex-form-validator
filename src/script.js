let correctEmail
let correctPassword
let correctPasswordRepeat

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return

    const focusElements = Array.from(
        document.querySelectorAll('button, input')
    ).filter((item) => !item.disabled)

    const firstElement = focusElements[0]
    const lastElement = focusElements[focusElements.length - 1]

    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
        }
    } else if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
    }
})

function emailInput() {
    const email = document.getElementById('email')
    email.style.outlineColor = '#19191c'
    const errorEmail = document.getElementById('error-email')
    const pattern =
        /^[a-zA-Z0-9]+[_\-\.]?[a-zA-Z0-9]+(@[a-z]{3,}\.[a-z_\.\-]*[a-z]{2,3})$/
    const result = pattern.test(email.value)
    correctEmail = result
    if (result) {
        email.style.outlineColor = '#1aaa00'
        errorEmail.style.display = 'none'
        email.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && correctPassword && correctPasswordRepeat) {
                submitData()
            }
        })
    } else {
        email.style.outlineColor = '#f80101'
        errorEmail.style.display = 'block'
    }
    checkForValidSubmit()
}

function passwordInput() {
    const password = document.getElementById('password')
    const passwordRepeat = document.getElementById('password-repeat')
    const errorContainer = document.getElementById('error-container')
    const errorPassword = document.getElementById('error-password')
    const lowercase = document.getElementById('lowercase')
    const uppercase = document.getElementById('uppercase')
    const number = document.getElementById('number')
    const special = document.getElementById('special')
    const length = document.getElementById('length')
    const info = document.getElementById('info')

    let correctLow = false
    let correctUpp = false
    let correctNum = false
    let correctSpec = false
    let correctLen = false

    password.style.outlineColor = '#19191c'

    if (/[a-z]/.test(password.value)) {
        lowercase.style.display = 'none'
        correctLow = true
    } else {
        lowercase.style.display = 'block'
        correctLow = false
    }
    if (/[A-Z]/.test(password.value)) {
        uppercase.style.display = 'none'
        correctUpp = true
    } else {
        uppercase.style.display = 'block'
        correctUpp = false
    }
    if (/\d/.test(password.value)) {
        number.style.display = 'none'
        correctNum = true
    } else {
        number.style.display = 'block'
        correctNum = false
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        special.style.display = 'none'
        correctSpec = true
    } else {
        special.style.display = 'block'
        correctSpec = false
    }
    if (/[^\s]{8,}/.test(password.value)) {
        length.style.display = 'none'
        correctLen = true
    } else {
        length.style.display = 'block'
        correctLen = false
    }
    if (correctLow && correctUpp && correctNum && correctSpec && correctLen) {
        info.style.display = 'none'
        password.style.outlineColor = '#1aaa00'
        passwordRepeat.removeAttribute('disabled')
        passwordRepeat.removeAttribute('aria-disabled')
        errorContainer.style.marginBottom = '0px'
        errorPassword.style.display = 'none'
        correctPassword = true
        password.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && correctEmail && correctPasswordRepeat) {
                submitData()
            }
        })
    } else {
        info.style.display = 'block'
        password.style.outlineColor = '#f80101'
        passwordRepeat.setAttribute('disabled', 'true')
        passwordRepeat.setAttribute('aria-disabled', 'true')
        errorContainer.style.marginBottom = '2rem'
        errorPassword.style.display = 'block'
        correctPassword = false
        if (!passwordRepeat.hasAttribute('disabled'))
            passwordRepeat.style.outlineColor = '#f80101'
    }
    checkForValidSubmit()
}

function passwordRepeatInput() {
    const password = document.getElementById('password').value
    const passwordRepeat = document.getElementById('password-repeat')
    const errorPasswordRepeat = document.getElementById('error-password-repeat')
    correctPasswordRepeat = password === passwordRepeat.value
    if (correctPasswordRepeat) {
        passwordRepeat.style.outlineColor = '#1aaa00'
        errorPasswordRepeat.style.display = 'none'
        passwordRepeat.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && correctEmail && correctPassword) {
                submitData()
            }
        })
    } else {
        passwordRepeat.style.outlineColor = '#f80101'
        errorPasswordRepeat.style.display = 'block'
    }
    checkForValidSubmit()
}

function checkForValidSubmit() {
    const submit = document.getElementById('submit')
    const errorContainer = document.getElementById('error-container')
    if (correctEmail && correctPassword && correctPasswordRepeat) {
        submit.removeAttribute('disabled')
        submit.removeAttribute('aria-disabled')
    }
    if (
        correctEmail === false ||
        correctPassword === false ||
        correctPasswordRepeat === false
    ) {
        submit.setAttribute('disabled', 'true')
        submit.setAttribute('aria-disabled', 'true')
    }
    if (
        (correctEmail || correctEmail === undefined) &&
        (correctPassword || correctPassword === undefined) &&
        (correctPasswordRepeat || correctPasswordRepeat === undefined)
    )
        errorContainer.style.display = 'none'
    if (
        correctEmail === false ||
        correctPassword === false ||
        correctPasswordRepeat === false
    )
        errorContainer.style.display = 'block'
}

function submitData() {
    const accountForm = document.getElementById('create-account-form')
    const welcome = document.getElementById('welcome')
    const email = document.getElementById('email').value
    const name = email
        .split('@')[0]
        .split(/[\.\-_]/)
        .map(
            (item) =>
                item.substring(0, 1).toUpperCase() +
                item.substring(1).toLowerCase()
        )
        .join(' ')
    const submit = document.getElementById('submit')
    if (correctEmail && correctPassword && correctPasswordRepeat) {
        accountForm.style.display = 'none'
        welcome.style.display = 'block'
        welcome.textContent = `Welcome, ${name}!`
    } else {
        submit.setAttribute('disabled', 'true')
        submit.setAttribute('aria-disabled', 'true')
    }
}
