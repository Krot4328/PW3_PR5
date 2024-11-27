const modalAuth = document.querySelector('.modal-auth');
const buttonAuth = document.querySelector('.button-auth');
const buttonLogout = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const logInForm = document.querySelector('#logInForm');
const closeModalButton = document.querySelector('.close-auth');
const cardsContainer = document.querySelector('.cards-restaurants');

let isLoggedIn = false;

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

        document.querySelector('#login').style.border = '1px solid black';
        document.querySelector('#password').style.border = '1px solid black';
    } else {
        enableScroll();
    }
}

buttonAuth.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);

modalAuth.addEventListener('click', function (event) {
    if (event.target === modalAuth) {
        toggleModal();
    }
});

function createCard(data) {
    const card = document.createElement('a');
    card.className = 'card card-restaurant';
    card.href = 'restaurant.html';
    card.innerHTML = `
        <img src="${data.img}" alt="${data.title}" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title">${data.title}</h3>
                <span class="card-tag tag">${data.time}</span>
            </div>
            <div class="card-info">
                <div class="rating">${data.rating}</div>
                <div class="price">від ${data.price} ₴</div>
                <div class="category">${data.category}</div>
            </div>
        </div>
    `;

    card.addEventListener('click', function (event) {
        if (!isLoggedIn) {
            event.preventDefault();
            toggleModal();
        }
    });

    return card;
}

function generateCards(cardsData) {
    cardsContainer.innerHTML = '';
    cardsData.forEach((data) => {
        const card = createCard(data);
        cardsContainer.append(card);
    });
}

const sampleCardsData = [
    {
        img: 'img/pizza-plus/preview.jpg',
        title: 'Піца плюс',
        time: '50 хвилин',
        rating: '4.5',
        price: '200',
        category: 'Піца',
    },
    {
        img: 'img/tanuki/preview.jpg',
        title: 'Танукі',
        time: '60 хвилин',
        rating: '4.5',
        price: '1200',
        category: 'Суші, роли',
    },
    {
        img: 'img/food-band/preview.jpg',
        title: 'FoodBand',
        time: '40 хвилин',
        rating: '4.6',
        price: '150',
        category: 'Бургери',
    },
];

function logIn(event) {
    event.preventDefault();

    const login = document.querySelector('#login').value.trim();
    const password = document.querySelector('#password').value.trim();
    let hasError = false;

    if (login === "") {
        document.querySelector('#login').style.border = '2px solid red';
        hasError = true;
    } else {
        document.querySelector('#login').style.border = '1px solid black';
    }

    if (password === "") {
        document.querySelector('#password').style.border = '2px solid red';
        hasError = true;
    } else {
        document.querySelector('#password').style.border = '1px solid black';
    }

    if (hasError) {
        return;
    }

    localStorage.setItem('nameParametr', login);

    userName.textContent = login;
    userName.style.display = 'inline';
    buttonAuth.style.display = 'none';
    buttonLogout.style.display = 'inline-block';

    isLoggedIn = true;
    toggleModal();
    logInForm.reset();
}

logInForm.addEventListener('submit', logIn);

function logout() {
    localStorage.removeItem('nameParametr');
    userName.textContent = '';
    userName.style.display = 'none';

    buttonAuth.style.display = 'block';
    buttonLogout.style.display = 'none';

    isLoggedIn = false;
}

buttonLogout.addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function () {
    const savedLogin = localStorage.getItem('nameParametr');

    if (savedLogin) {
        userName.textContent = savedLogin;
        userName.style.display = 'inline';
        buttonAuth.style.display = 'none';
        buttonLogout.style.display = 'inline-block';

        isLoggedIn = true;
    } else {
        buttonAuth.style.display = 'block';
        buttonLogout.style.display = 'none';

        isLoggedIn = false;
    }

    generateCards(sampleCardsData);
});
