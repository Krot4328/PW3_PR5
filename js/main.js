const modalAuth = document.querySelector('.modal-auth');
const buttonAuth = document.querySelector('.button-auth');
const buttonLogout = document.querySelector('.button-out');
const cartButton = document.querySelector('.button-cart');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');
const userName = document.querySelector('.user-name');
const logInForm = document.querySelector('#logInForm');
const closeModalButton = document.querySelector('.close-auth');

let scrollPosition = 0;

function disableScroll() {
    scrollPosition = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: -${scrollPosition}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
    `;
}

function enableScroll() {
    document.body.style.cssText = '';
    window.scrollTo(0, scrollPosition);
}

function toggleModal() {
    modalAuth.classList.toggle('is-open');

    if (modalAuth.classList.contains('is-open')) {
        disableScroll();

        loginInput.style.border = '1px solid black';
        passwordInput.style.border = '1px solid black';
    } else {
        enableScroll();
    }
}

buttonAuth.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);

modalAuth.addEventListener('click', function(event) {
    if (event.target === modalAuth) {
        toggleModal();
    }
});

function logIn(event) {
    event.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    let hasError = false;

    if (login === "") {
        loginInput.style.border = '2px solid red';
        hasError = true;
    } else {
        loginInput.style.border = '1px solid black';
    }

    if (password === "") {
        passwordInput.style.border = '2px solid red';
        hasError = true;
    } else {
        passwordInput.style.border = '1px solid black';
    }

    if (hasError) {
        return;
    }

    localStorage.setItem('nameParametr', login);

    userName.textContent = login;
    userName.style.display = 'inline';

    buttonAuth.style.display = 'none';
    buttonLogout.style.display = 'inline-block';

    toggleModal();
    logInForm.reset();
}

logInForm.addEventListener('submit', logIn);

document.addEventListener('DOMContentLoaded', function() {
    const savedLogin = localStorage.getItem('nameParametr');

    if (savedLogin) {
        userName.textContent = savedLogin;
        userName.style.display = 'inline';
        buttonAuth.style.display = 'none';
        buttonLogout.style.display = 'inline-block';
    } else {
        buttonAuth.style.display = 'block';
        buttonLogout.style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem('nameParametr');
    userName.textContent = '';
    userName.style.display = 'none';

    buttonAuth.style.display = 'block';
    buttonLogout.style.display = 'none';
}

buttonLogout.addEventListener('click', logout);

const obj1 = {
    a: 15,
    b: 10,
};

const obj2 = { ...obj1 };

obj1.a = 5;

console.log('1:', obj1);
console.log('2:', obj2);
