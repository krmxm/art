const slider = (slides, dir, prev, next) => {
    let slideIndex = 1;
    let paused = false;

    const items = document.querySelectorAll(slides);

    function showSlides(i) {
        if(i > items.length) {
            slideIndex = 1;
        }
        if(i < 1) {
            slideIndex = items.length;
        }

        items.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.add('animated');
        });
        items[slideIndex - 1].style.display = 'block';
    }
    showSlides(slideIndex - 1);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    }
    catch(e){}

    function activateAnimation() {
        if(dir === 'vertical') {
            paused = setInterval(()=>{
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(()=>{
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }

    activateAnimation();
    
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default slider;