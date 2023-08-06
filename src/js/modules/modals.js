import calcScroll from "./calcScroll";

const modals = (state) => {
    let btnPressed = false;

    const scroll = calcScroll();

    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
    }

    function bindModal (triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
    
        trigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if(destroy) {
                    btn.remove();
                }

                if(modal.classList.contains('popup_calc_profile')) {
                    if(!state.form || !state.width || !state.height) {
                        e.removeEventListener();
                    }
                }

                if(modal.classList.contains('popup_calc_end')) {
                    if(!state.type || !state.profile) {
                        e.removeEventListener();
                    }
                }

                windows.forEach(item => {
                    closeModal(item);
                    item.classList.add('animated', 'fadeIn');
                });
    
                openModal(modal);
                
            }); 
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                closeModal(item);
            });
            closeModal(modal);
        });
    
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                windows.forEach(item => {
                    closeModal(item);
                });
                closeModal(modal);
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => { // почему windows не доступна
                if(getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            if(!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                // const scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`; // есть доступ к scroll?
            }
        }, time);
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close'); //???
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close'); //???
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;