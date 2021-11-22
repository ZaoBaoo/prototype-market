import getDB from './modules/getDB';
import renderPage from './modules/renderPage';

const promise = getDB();
renderPage(promise);


window.addEventListener('DOMContentLoaded', function() {
    const blockCard = document.querySelector('.main__cards');

    // Слушаем кнопку добавить
    blockCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__btn-add')) {
            const input = e.target.parentNode.previousElementSibling.lastElementChild.lastElementChild.previousElementSibling.value,
                  index = e.target.parentNode.parentNode.getAttribute('data-index'),
                  price = e.target.parentNode.parentNode.getAttribute('data-price'),
                  storage = window.localStorage;

            // switchCounter();
    
        }

        // function switchCounter() {
            
        // }
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

});



