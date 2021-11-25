function renderCart() {
    class creatCart {
        constructor(title, price, id, imgUrl, input) {
            this.title = title;
            this.price = price;
            this.id = id;
            this.imgUrl = imgUrl;
            this.input = input;
        }
    
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <img class="prev-img" src="${this.imgUrl}" alt="">
                <div class="modal__window-text">${this.title}</div>
                <div class="card__price-counter">
                    <span class="minus">&#8722;</span>
                    <input class="input-counter" type="number" min="1" max="10" step="1" value="${this.input}">
                    <span class="plus">&#43;</span>
                </div>
                <div class="card__price-text"><span>${this.price}</span> тг.</div>
                <img class="delete" src="img/delete.svg" alt="">
            `;
            element.setAttribute('index', this.id);
            element.classList.add('modal__window-item');
            document.querySelector('.modal__window-block').append(element);
        }
    }

    const keysLC = Object.keys(localStorage);
    const arrKeysLC = keysLC.filter(item => {
        if (item != 'items') { return item }
    });

    arrKeysLC.forEach(item => {
        const obj = JSON.parse(localStorage.getItem(item)),
        {title, price, id, imgUrl, input} = obj;
        new creatCart(title, price, id, imgUrl, input).render();
    });
}

export default renderCart;