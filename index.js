import getDB from './modules/getDB';
import renderPage from './modules/renderPage';


window.addEventListener('DOMContentLoaded', async function() {
    await getDB();
    renderPage();

    const blockCard = document.querySelector('.main__cards');

    // Слушаем кнопку добавить
    blockCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__btn-add')) {
            const mainLink = e.target.parentNode.parentNode,
                  input = mainLink.querySelector('.input-counter').value,
                  index = mainLink.getAttribute('data-index'),
                  price =  mainLink.getAttribute('data-price');
                       
            window.localStorage.setItem(index, [input, price]);
            const switchCounter = () => {
                mainLink.querySelector('.card__price-counter').style.display = 'none'
                mainLink.querySelector('.card__notification').style.display = 'block'
            }
            switchCounter();
            updateCart();
        }
    });

    // + Слушаем счётчик плюс
    blockCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('plus')) {
            movePlus();
        }

        function movePlus() {
            let elemInput = e.target.previousElementSibling;
            elemInput.value++;
            if (elemInput.value > 99) { elemInput.value = 99 } 
        }
    });

    // - Слушаем счётчик минус
    blockCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('minus')) {
            moveMinus();
        }

        function moveMinus() {
            let elem = e.target.nextElementSibling,
                value = (elem.value > 1) ? --elem.value : 1;
            elem.value = value;
        }
    });

    // input. Слушаем инпут количества
    blockCard.addEventListener('input', (e) => {
        if (e.target.classList.contains('input-counter')) {
            if (e.target.value < 1) { e.target.value = 1 }
            if (e.target.value > 99) { e.target.value = 99 }
        }
    });

    function updateCart() {
        if (localStorage.length > 1) { console.log('В корзине что-то есть!') }
    }
    updateCart()
});


