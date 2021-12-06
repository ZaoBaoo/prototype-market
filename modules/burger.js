function burger() {
    const headerBurger = document.querySelector('.header__burger'),
          headerMenu = document.querySelector('.header__menu'),
          body = document.querySelector('body');
    
    headerBurger.addEventListener('click', (e) => {
        headerBurger.classList.toggle('active');
        headerMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');       
    });
}

export default burger;