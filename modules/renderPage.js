function renderPage() {
    class creatCard {
        constructor(title, price, id, imgUrl) {
            this.title = title;
            this.price = price;
            this.id = id;
            this.imgUrl = imgUrl;
        }
    
        render() {
            const element = document.createElement('div');

            // Проверям есть ли в корзине элементы чтобы после перезагрузки было поле "Добавлено"
            const keysLC = Object.keys(localStorage);
            const arrKeysLC = keysLC.filter(item => {
                if (item != 'items') { return item }
            });
            const dis = arrKeysLC.find(item => item === this.id);

            element.innerHTML = `
                <div class="card" data-index="${this.id}" data-price="${this.price}">
                <div class="card__head">
                    <img class="img" src="${this.imgUrl}" alt="">
                </div>
                <div class="card__text">${this.title}</div>
                <div class="card__price">
                    <div class="card__price-text">${this.price} тг.</div>
                    <div style="display: ${dis === undefined ? 'block' : 'none'};" class="card__price-counter">
                        <span class="minus">&#8722;</span>
                        <input class="input-counter" type="number" min="1" max="10" step="1" value="1">
                        <span class="plus">&#43;</span>
                    </div>
                    <div style="display: ${dis === undefined ? 'none' : 'block'};" class="card__notification">Добавлено</div>
                </div>
                <div class="card__btn">
                    <div class="card__btn-add">Добавить товар</div>
                </div>
            `;
            element.classList.add('test');
            document.querySelector('.main__cards').append(element);
        }
    }

    JSON.parse(localStorage.getItem("items")).forEach(item => {
        const {title, price, id, imgUrl} = item;
        new creatCard(title, price, id, imgUrl).render();
    })
}

export default renderPage;