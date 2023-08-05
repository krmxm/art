import calcScroll from "./calcScroll";

const modals = (state) => {

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

    function bindModal (triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
    
        trigger.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
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
            if(e.target === modal && closeClickOverlay) {
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
            }
        }, time);
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close'); //???
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close'); //???

    showModalByTime('.popup-consultation', 3000);
};

export default modals;