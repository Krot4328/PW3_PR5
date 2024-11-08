const modalAuth = document.querySelector('.modal-auth');
const buttonAuth = document.querySelector('.button-auth');
const buttonLogout = document.querySelector('.button-out');
const cartButton = document.querySelector('.button-cart');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const logInForm = document.querySelector('#logInForm');
const closeModalButton = document.querySelector('.close-auth');

function toggleModal() {
   modalAuth.classList.toggle('is-open');
}

buttonAuth.addEventListener('click', toggleModal);

closeModalButton.addEventListener('click', toggleModal);

function logIn(event) {
   event.preventDefault();

   const login = loginInput.value.trim();
   if (login === "") {
      loginInput.style.border = '2px solid red';
      return;
   }

   localStorage.setItem('nameParametr', login);

   userName.textContent = login;
   userName.style.display = 'inline';

   buttonAuth.style.display = 'none';
   buttonLogout.style.display = 'inline-block';

   toggleModal();
   logInForm.reset();
   loginInput.style.border = '';
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
