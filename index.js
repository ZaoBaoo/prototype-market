import getDB from './modules/getDB';
import renderPage from './modules/renderPage';
import renderCart from './modules/renderCart'


window.addEventListener('DOMContentLoaded', async function() {
    await getDB();
    renderPage();

    const blockCard = document.querySelector('.main__cards'),
          basket = document.querySelector('.basket'),
          modal = document.querySelector('.modal'),
          body = document.querySelector('body');

    // Слушаем кнопку добавить
    blockCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__btn-add')) {
            const mainLink = e.target.parentNode.parentNode,
                  input = mainLink.querySelector('.input-counter').value,
                  index = mainLink.getAttribute('data-index'),
                  price =  mainLink.getAttribute('data-price'),
                  title = mainLink.querySelector('.card__text').textContent,
                  imgUrl = mainLink.querySelector('.img').getAttribute('src');
                  
            window.localStorage.setItem(index, JSON.stringify(
                {
                    id: index,
                    title,
                    price,
                    input,
                    imgUrl
                }
            ));

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

    // basket. Обновляем кол-во товаров на иконки корзины
    function updateCart() {
        if (localStorage.length > 1) { 
            basket.firstElementChild.classList.remove('cart');
            basket.firstElementChild.classList.add('cart__filled');
            basket.lastElementChild.textContent = localStorage.length - 1;
        } else {
            basket.firstElementChild.classList.remove('cart__filled');
            basket.firstElementChild.classList.add('cart');
            basket.lastElementChild.textContent = "";
        }
    }
    updateCart()

    // basket. Слушаем корзину о открываем модальное окно
    basket.addEventListener('click', (e) => {
        modal.style.display = 'block';
        body.classList.add('no-scroll');
        
        const upCart = () => {
            modal.querySelector('.modal__window-block').innerHTML = '';
        }
        upCart();
        renderCart() 
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == "block") { 
            modal.style.display = 'none';
            body.classList.remove('no-scroll');
        }
    });

    // Удаление позиции из корзины
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentNode.remove()
            const index = e.target.parentNode.getAttribute('index')
            localStorage.removeItem(index);
            updateCart()
            const recoveryCart = document.querySelector(`[data-index=${index}]`);
            recoveryCart.querySelector('.card__price-counter').style.display = 'block'
            recoveryCart.querySelector('.card__notification').style.display = 'none'
        }
    });
});


