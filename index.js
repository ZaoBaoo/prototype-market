import getDB from './modules/getDB';
import renderPage from './modules/renderPage';
import renderCart from './modules/renderCart';
import burger from './modules/burger'
import Inputmask from "inputmask";

window.addEventListener('DOMContentLoaded', async function() {
    await getDB();
    renderPage();
    burger();

    const blockCard = document.querySelector('.main__cards'),
        basket = document.querySelector('.basket'),
        modal = document.querySelector('.modal'),
        body = document.querySelector('body'),
        btnOrder = document.querySelector('#btn-order'),
        alert = document.querySelector('#alert'),
        basketBlock = modal.querySelector('.modal__window-block');
        

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
            hidenCart();
        }
    });

    // + Слушаем счётчик плюс
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('plus')) {
            movePlus();
            updataPrice(e.target);
        }

        function movePlus() {
            let elemInput = e.target.previousElementSibling;
            elemInput.value++;
            if (elemInput.value > 99) { elemInput.value = 99 } 
        }
    });

    // - Слушаем счётчик минус
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('minus')) {
            moveMinus();
            updataPrice(e.target);
        }

        function moveMinus() {
            let elem = e.target.nextElementSibling,
                value = (elem.value > 1) ? --elem.value : 1;
            elem.value = value;
        }
    });

    // input. Слушаем инпут количества
    window.addEventListener('input', (e) => {
        if (e.target.classList.contains('input-counter')) {
            if (e.target.value < 1) { e.target.value = 1 }
            if (e.target.value > 99) { e.target.value = 99 }
            updataPrice(e.target)
        }  
    });

    // Прячем или показываем корзину в зависимости от кол-во товаров в ней
    const hidenCart = () => {
        if (localStorage.length > 1) {
            basket.style.display = 'flex';
        } else {
            basket.style.display = 'none';
        }
    }
    hidenCart();

    // basket. Обновляем кол-во товаров на иконки корзины
    const updateCart = () => {
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

    // total. обновляет итог в корзине
    const calcTotal = () => {
        const totalBlock = modal.querySelector('.total span');
        const arrSum = Array.from(modal.querySelectorAll('.card__price-text span'));
        const totalSum = arrSum.reduce((accumulator, currentValue) => {
            return accumulator + (+currentValue.textContent);
        }, 0)
        totalBlock.textContent = totalSum;
        return totalBlock.textContent;
    }

    // Обновляем цену на товар при изменение кол-ва
    const updataPrice = (target) => {
        // Обрабатывет + - input со странице
        if (target.parentNode.parentNode.classList.contains('card__price')) {
            const path = target.parentNode.parentNode.parentNode,
                sumPrice = path.querySelector('.card__price-text span'),
                multiplier = path.querySelector('.input-counter').value,
                price = path.getAttribute('data-price');

            sumPrice.textContent = price * multiplier;
        }
        // Обрабатывет + - input с корзины
        if (target.parentNode.parentNode.classList.contains('modal__window-item')) {
            const path = target.parentNode.parentNode,
                id = path.getAttribute('index'),
                newInput = path.querySelector('.input-counter').value;
                    
            const updataInputLS = (id, newInput) => {
                const upObj = JSON.parse(localStorage.getItem(id));
                upObj.input = newInput;              
                localStorage.setItem(id, JSON.stringify(upObj))
            }
            updataInputLS(id, newInput);

            const sumPrice = path.querySelector('.card__price-text span'),
                multiplier = JSON.parse(localStorage.getItem(id)).input,
                price = JSON.parse(localStorage.getItem(id)).price;
            
            sumPrice.textContent = price * multiplier;
        }

        calcTotal();
    }

    // Удаляем все из корзины
    const delCart = () => {
        basketBlock.innerHTML = '';
    }   

    // basket. Слушаем и рендерим корзину. Открываем модальное окно
    basket.addEventListener('click', (e) => {      
        modal.style.display = 'block';
        body.classList.add('no-scroll');

        
        delCart();
        renderCart();
        calcTotal();
        alert.textContent = '';
        // console.log(basketBlock.childNodes.length);

        // без минимальной задержки анимация не проходит
        setTimeout(() => modal.lastElementChild.classList.add('active'), 0);
    });

    // Закрываем модальное окно на клавишу ESC
    window.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == "block") {
            modal.lastElementChild.classList.remove('active');
            body.classList.remove('no-scroll');
            setTimeout(() => modal.style.display = 'none', 750);
        }
        hidenCart();
    });

    // Обновляем позиции на странице после удаления из корзины
    const updateItemFromPage = (index) => {
            const recoveryCart = document.querySelector(`[data-index=${index}]`);
            recoveryCart.querySelector('.card__price-counter').style.display = 'block'
            recoveryCart.querySelector('.card__notification').style.display = 'none'
    }

    // Удаление позиции из корзины
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentNode.remove()
            const index = e.target.parentNode.getAttribute('index')
            localStorage.removeItem(index);
            updateCart();
            updateItemFromPage(index);
            // const recoveryCart = document.querySelector(`[data-index=${index}]`);
            // recoveryCart.querySelector('.card__price-counter').style.display = 'block'
            // recoveryCart.querySelector('.card__notification').style.display = 'none'
        }

        if (e.target.classList.contains('modal')) {
            e.target.style.display = "none";
            body.classList.remove('no-scroll');
            modal.lastElementChild.classList.remove('active')
        }
        
        calcTotal();
        hidenCart();
    });

    // Закрываем модальное окно по клику на exit
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('exit')) {
            modal.lastElementChild.classList.remove('active');
            body.classList.remove('no-scroll'); 
            setTimeout(() => modal.style.display = 'none', 750);   
        }
        hidenCart();
    });

    // Получаем данные для отправки на почту
    const getDataToSendToMail = () => {
        const contactsName = document.querySelector('#name').value,
              contactsSurname = document.querySelector('#surname').value,
              contactsEmail = document.querySelector('#email').value,
              contactsTel = document.querySelector('#tel').value;
              
        
        const getPurchase = () => {
            const keysLC = Object.keys(localStorage);
            const arrKeysLC = keysLC.filter(item => {
                if (item != 'items') { return item }
            });

            return arrKeysLC.map(item => {
                const {id, title, price, input} = JSON.parse(localStorage.getItem(item));
                return {
                    'id': id,
                    'title': title,
                    'price': price,
                    'quantity': input
                }
            });   
        }

        const dataObj = {
            'contacts': {
                'name': contactsName,
                'surname': contactsSurname,
                'email': contactsEmail,
                'tel': contactsTel,
            },
            'amount': calcTotal(),
            'purchase': getPurchase()
        };

        return dataObj;
    }
    
    // Ключи от локального хранилища
    const getKeysLC = () => {
        const keysLC = Object.keys(localStorage);
        const arrKeysLC = keysLC.filter(item => {
            if (item != 'items') { return item }
        });
        return arrKeysLC;
    }

    // Валидация инпутов
    const validationСheck = () => {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        formReq.forEach(input => {
            if (input.classList.contains('_name')) {
                const regex = new RegExp(/^[а-яА-Я]{3,16}$/);
                if (!regex.test(input.value.trim())) { 
                    error++;
                    input.classList.add('err');
                }
                
            }

            if (input.classList.contains('_surname')) {
                const regex = new RegExp(/^[а-яА-Я]{3,16}$/);
                if (!regex.test(input.value.trim())) { 
                    error++; 
                    input.classList.add('err');
                }
                
            }

            if (input.classList.contains('_email')) {
                const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i);
                if (!regex.test(input.value.trim())) { 
                    error++; 
                    input.classList.add('err');
                }
                
            }

            if (input.classList.contains('_tel')) {
                const regex = new RegExp(/[\d]{3,3}[\s]{1,1}[\d]{2,2}[\s]{1,1}[\d]{2,2}/);
                if (!regex.test(input.value.trim())) { 
                    error++; 
                    input.classList.add('err');
                }
              
            }
        });
        
        if (error == 0) {
            console.log("true");
            return true;
            
        } else {
            console.log("false");
            return false;
            
        }
    }

    // Слушаем кнопку заказать
    btnOrder.addEventListener('click', (e) => {
        if (validationСheck()) {
            console.log("Отправлено");
            const switchBlock = modal.lastElementChild,
                  inputForm = document.querySelectorAll('.form__input');
            switchBlock.lastElementChild.style.display = 'none';
            switchBlock.firstElementChild.style.display = 'block';

            const dataObj = getDataToSendToMail(),
                    url = 'http://localhost:3001/order';

            console.log(dataObj);
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(dataObj),
                headers: {
                    'Content-Type': 'application/json'
                }
                
            })
            .then(data => {
                if(data.status == 200) {
                    switchBlock.lastElementChild.style.display = 'block';
                    switchBlock.firstElementChild.style.display = 'none';

                    inputForm.forEach(input => input.classList.remove('err'));
                    document.forms[0].reset();
                    getKeysLC().forEach(item => {
                        localStorage.removeItem(item);
                        updateItemFromPage(item);
                    });
                    updateCart();
                    basketBlock.querySelectorAll('*').forEach(item => {
                        if (!item.classList.contains('total')) { item.remove() }
                    })
                    alert.textContent = 'Спасибо, заказ оформлен. Скоро мы с вами свяжемся!'
                    
                }
            })
            .catch(() => {
                switchBlock.lastElementChild.style.display = 'block';
                switchBlock.firstElementChild.style.display = 'none';
            })
            .finally(() => {
                console.log('finally');
            }); 
            
        }
    });

    // Устанавливаем маску для инпута tel
    (function() {
        const tel = document.querySelector('#tel');
    const im = new Inputmask("+7 (999) 999 99 99", { showMaskOnHover: false });
    im.mask(tel);
    })()  
});





