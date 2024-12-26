const modalAuth = document.querySelector('.modal-auth');
const buttonAuth = document.querySelector('.button-auth');
const buttonLogout = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');
const logInForm = document.querySelector('#logInForm');
const closeModalButton = document.querySelector('.close-auth');
const cardsContainer = document.querySelector('.cards-restaurants');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantHeader = document.querySelector('.restaurant-header');
const search = document.querySelector('.input-search');
const restaurantCardsContainer = document.querySelector('.cards-restaurants');
const sectionTitle = document.querySelector('.section-title');
const modalWindowCart = document.querySelector('.modal-cart');
const shoppingCartButton = document.getElementById('cart-button');
const closeCartModalBtn = document.querySelector('.modal-cart .close');
const clearCartButton = document.querySelector('.clear-cart');
const itemsContainer = document.querySelector('.modal-body');
const totalPriceTag = document.querySelector('.modal-pricetag');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

function closeCartModal() {
    modalWindowCart.style.display = 'none';
    enableScroll();
}

function openCartModal() {
    modalWindowCart.style.display = 'flex';
    disableScroll();
    refreshCart();
}

function refreshCart() {
    itemsContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'food-row';
        itemRow.innerHTML = `
            <span class="food-name">${item.name}</span>
            <strong class="food-price">${item.price} ₴</strong>
            <div class="food-counter">
                <button class="counter-button decrease">-</button>
                <span class="counter">${item.quantity}</span>
                <button class="counter-button increase">+</button>
            </div>
        `;
        itemsContainer.append(itemRow);

        totalAmount += item.price * item.quantity;
    });

    totalPriceTag.textContent = `${totalAmount} ₴`;
}

function addItemToCart(item) {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    refreshCart();
}

document.addEventListener('click', (event) => {
    const addToCartButton = event.target.closest('.button-add-cart');
    
    if (addToCartButton) {
        const card = addToCartButton.closest('.card');
        const name = card.querySelector('.card-title-reg').textContent;
        const price = parseInt(card.querySelector('.card-price-bold').textContent.replace(' ₴', ''));
        const description = card.querySelector('.ingredients').textContent;
        const image = card.querySelector('.card-image').src;

        const item = { name, price, description, image };

        addItemToCart(item);
    }
});

function emptyCart() {
    localStorage.removeItem('cart');
    cart = [];
    refreshCart();
    setTimeout(closeCartModal, 500);
}

shoppingCartButton.addEventListener('click', () => {
    openCartModal();
});

closeCartModalBtn.addEventListener('click', closeCartModal);

modalWindowCart.addEventListener('click', (event) => {
    if (event.target === modalWindowCart) {
        closeCartModal();
    }
});

clearCartButton.addEventListener('click', emptyCart);

itemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('increase')) {
        const itemRow = event.target.closest('.food-row');
        const itemName = itemRow.querySelector('.food-name').textContent;
        const cartItem = cart.find(item => item.name === itemName);

        cartItem.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
    }

    if (event.target.classList.contains('decrease')) {
        const itemRow = event.target.closest('.food-row');
        const itemName = itemRow.querySelector('.food-name').textContent;
        const cartItem = cart.find(item => item.name === itemName);

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            refreshCart();
        }
    }
});

let isLoggedIn = false;

function toggleModal() {
    modalAuth.classList.toggle('is-open');

    if (modalAuth.classList.contains('is-open')) {
        disableScroll();
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

    localStorage.setItem('user', login);

    userName.textContent = login;
    userName.style.display = 'inline';
    buttonAuth.style.display = 'none';
    buttonLogout.style.display = 'inline-block';

    isLoggedIn = true;
    toggleModal();
    logInForm.reset();
}

document.addEventListener('DOMContentLoaded', async function () {
    const savedLogin = localStorage.getItem('user');

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

    const swiper = new Swiper('.promo-slider', {
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

function createPartnerCard(restaurant) {
    const { name, image, stars, price, kitchen, products, time_of_delivery } = restaurant;

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.products = products;

    card.insertAdjacentHTML('beforeend', `
        <a href="#" class="card-link">
            <img src="${image}" alt="${name}" class="card-image" />
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">${time_of_delivery} хвилин</span>
                </div>
                <div class="card-info">
                    <div class="rating">${stars}</div>
                    <div class="price">От ${price} ₴</div>
                    <div class="category">${kitchen}</div>
                </div>
            </div>
        </a>
    `);
    return card;
}

async function getRestaurants() {
    try {
        const response = await fetch('./json/partners.json');
        if (!response.ok) throw new Error('Не вдалося завантажити дані ресторанів');
        const restaurants = await response.json();
        cardsContainer.innerHTML = '';
        restaurants.forEach(restaurant => {
            const card = createPartnerCard(restaurant);
            cardsContainer.append(card);
        });
    } catch (error) {
        console.error('Помилка:', error);
    }
}

function createMenuCard(item) {
    const { name, description, price, image } = item;

    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">${description}</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">У кошик</span>
                </button>
                <strong class="card-price-bold">${price} ₴</strong>
            </div>
        </div>
    `);
    return card;
}

async function displayMenu(menuPath) {
    try {
        const response = await fetch(`./json/${menuPath}`);
        if (!response.ok) throw new Error('Не вдалося завантажити меню');
        const menu = await response.json();
        menuList.innerHTML = '';
        menu.forEach(item => {
            const card = createMenuCard(item);
            menuList.append(card);
        });
    } catch (error) {
        console.error('Помилка:', error);
    }
}

function readQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        menu: params.get('menu'),
        stars: params.get('stars'),
        price: params.get('price'),
        category: params.get('category'),
    };
}

async function loadMenu() {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const rating = document.querySelector('.rating');
    const price = document.querySelector('.price');
    const category = document.querySelector('.category');
    const cardsMenu = document.querySelector('.cards-menu');

    if (!restaurantTitle || !rating || !price || !category || !cardsMenu) {
        console.warn('Ця функція працює лише на сторінці restaurant.html');
        return;
    }

    const { name, menu, stars, price: menuPrice, category: menuCategory } = readQueryParams();

    restaurantTitle.textContent = name;
    rating.textContent = stars;
    price.textContent = `${menuPrice}`;
    category.textContent = menuCategory;

    try {
        const response = await fetch(`./json/${menu}`);
        if (!response.ok) throw new Error('Не вдалося завантажити меню');
        const menuItems = await response.json();

        cardsMenu.innerHTML = '';
        menuItems.forEach((item) => {
            const menuCard = createMenuCard(item);
            cardsMenu.append(menuCard);
        });
    } catch (error) {
        console.error('Помилка при завантаженні меню:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMenu)

cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    
    if (card) {
        if (!isLoggedIn) {
            toggleModal();
            return;
        }

        const menuPath = card.dataset.products;
        const restaurantName = card.querySelector('.card-title').textContent;
        const stars = card.querySelector('.rating').textContent;
        const price = card.querySelector('.price').textContent;
        const category = card.querySelector('.category').textContent;

        window.location.href = `restaurant.html?name=${restaurantName}&menu=${menuPath}&stars=${stars}&price=${price}&category=${category}`;
    }
});

getRestaurants();

logInForm.addEventListener('submit', logIn);

function logout() {
    localStorage.removeItem('user');
    userName.textContent = '';
    userName.style.display = 'none';

    buttonAuth.style.display = 'block';
    buttonLogout.style.display = 'none';

    isLoggedIn = false;
}

buttonLogout.addEventListener('click', logout);

let restaurantsData = [];

async function loadRestaurantsAndMenus() {
    try {
        const response = await fetch('./json/partners.json');
        if (!response.ok) throw new Error('Не вдалося завантажити дані ресторанів');
        const restaurants = await response.json();

        restaurantsData = await Promise.all(restaurants.map(async restaurant => {
            const menuResponse = await fetch(`./json/${restaurant.products}`);
            if (!menuResponse.ok) throw new Error(`Не вдалося завантажити меню для ${restaurant.name}`);
            const menu = await menuResponse.json();
            return { ...restaurant, menu };
        }));

        renderRestaurants(restaurantsData);
    } catch (error) {
        console.error('Помилка:', error);
    }
}

function renderRestaurants(data) {
    restaurantCardsContainer.innerHTML = '';
    data.forEach(restaurant => {
        const card = createPartnerCard(restaurant);
        restaurantCardsContainer.append(card);
    });
}

function filterRestaurants(query) {
    const filteredRestaurants = restaurantsData.filter(restaurant => {
        const restaurantName = restaurant.name.toLowerCase();
        const menuItems = restaurant.menu.map(item => item.name.toLowerCase());

        return (
            restaurantName.includes(query) || 
            menuItems.some(itemName => itemName.includes(query))
        );
    });

    renderRestaurants(filteredRestaurants);

    sectionTitle.textContent = filteredRestaurants.length
        ? 'Результат пошуку'
        : 'Ресторани не знайдено';
}

search.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value.trim().toLowerCase();

        if (!query) {
            sectionTitle.textContent = 'Ресторани';

            search.classList.add('input-error');
            setTimeout(() => search.classList.remove('input-error'), 1500);

            search.value = '';
            renderRestaurants(restaurantsData);
        } else {
            filterRestaurants(query);
        }

        search.blur();
        search.value = '';
    }
});

document.addEventListener('DOMContentLoaded', loadRestaurantsAndMenus);
