function renderPage(data) {
    class creatCard {
        constructor(title, price, id, imgUrl) {
            this.title = title;
            this.price = price;
            this.id = id;
            this.imgUrl = imgUrl;
        }
    
        render() {
            const element = document.createElement('div');
    
            element.innerHTML = `
                <div class="card" data-index="${this.id}" data-price="${this.price}">
                <div class="card__head">
                    <img class="img" src="${this.imgUrl}" alt="">
                </div>
                <div class="card__text">${this.title}</div>
                <div class="card__price">
                    <div class="card__price-text">${this.price} тг.</div>
                    <div class="card__price-counter">
                        <span class="minus">&#8722;</span>
                        <input class="input-counter" type="number" min="1" max="10" step="1" value="1">
                        <span class="plus">&#43;</span>
                    </div>
                </div>
                <div class="card__btn">
                    <div class="card__btn-add">Добавить товар</div>
                </div>
            `;
            element.classList.add('test');
            document.querySelector('.main__cards').append(element);
        }
    }
    data.then(dataReady => dataReady.forEach(item => {
            const {title, price, id, imgUrl} = item;
            new creatCard(title, price, id, imgUrl).render();
    }));
}


export default renderPage;

