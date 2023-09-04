const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector); // стрелка на странице
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1650) { // documentElement - html
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Scrolling with request animation frame

    let links = document.querySelectorAll('[href^="#"]'), // все ссылки, которые начинаются с #
        speed = 0.1; // скорость скролла

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let heightTop = document.documentElement.scrollTop, // определяет расстояние от верхней границы текущего видимого окна до элемента с указанным якорем (с помощью getBoundingClientRect().top). Это значение будет использоваться для вычисления, насколько нужно прокрутить страницу.
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top, // верхняя граница элемента, к которому скроллим (получить ограничивающий клиентский прямоугольник)
                start = null; // стартовая позиция

                console.log(hash);


                requestAnimationFrame(step); // запускает анимацию с использованием requestAnimationFrame. Это позволяет браузеру оптимизировать анимацию и выполнять ее наиболее плавно. Функция step будет вызываться браузером перед следующим отрисовыванием экрана.

                function step(time) {
                    if (start === null) { // узнаём первый раз ли запускается анимация
                        start = time;
                        console.log(time);
                    }

                    let progress = time - start, //  вычисляет, сколько времени прошло с начала анимации
                        r = (toBlock < 0 ? Math.max(heightTop - progress/speed, heightTop + toBlock) : Math.min(heightTop + progress/speed, heightTop + toBlock)); 

                    // progress/speed - значение, которое пользователь уже пролистал делим на скорость анимации

                    // r вычисляет новую позицию прокрутки страницы. Это делается с учетом скорости (speed) и направления скроллинга. Если toBlock (расстояние до элемента) отрицательное, то мы используем Math.max для увеличения heightTop или уменьшения toBlock, чтобы прокрутить страницу вверх. В противном случае, мы используем Math.min для увеличения heightTop или toBlock, чтобы прокрутить страницу вниз

                    document.documentElement.scrollTo(0, r); // устанавливает новую позицию прокрутки страницы

                    if(r != heightTop + toBlock) {
                        requestAnimationFrame(step); //  проверяет, достигли ли мы конечной позиции прокрутки. Если нет, мы продолжаем вызывать requestAnimationFrame(step) для продолжения анимации.
                    } else {
                        location.hash = hash; // В противном случае, если мы достигли конечной позиции, код устанавливает location.hash равным hash, что обновляет якорь в URL, чтобы страница была синхронизирована с текущим элементом. Это делается для обеспечения правильной навигации.
                    }
                }
        });
    });

    // реализация плавного скролла (pure js scrolling)

    // const element = document.documentElement,
    //       body = document.body; // в разных браузерах или в разных ситуациях мы можем использовать ту или иную структуру
        
    // // дальше идёт функция, которая будет заниматься подсчётом того, сколько нам надо пролистать
    // const calcScroll  = () => {
    //     upElem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); // в переменную записываем сколько уже пролистано

    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash), // получаем элмент, к которому ведёт ссылка(#someElem)
    //                 hashElementTop = 0; // переменная, которая обозначае сколько пикселей надо пролистать до родителя этого хэш 'ktvtynf

    //             while (hashElement.offsetParent) { // 1 body
    //                 hashElementTop = hashElement.offsetTop; // 1 содержат координаты y относительно верхнего левого угла offsetParent
    //                 hashElement = hashElement.offsetParent; // переменной присваивается body и цикл останавливается
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //             // 1.сколько пролистали 2.сколько пикселей этот элемент отстоит от родительского элемента 3.к какому элементу мы все это листаем
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1, // значение через которое будет проводиться анимация
    //         prevScrollTop, // предшествующее значение
    //         speed;

    //         if(to > from) {
    //             speed = 30;
    //         } else {
    //             speed = -30;
    //         }

    //         let move = setInterval(function() {
    //             let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //             if(
    //                 prevScrollTop === scrollTop ||
    //                 (to > from && scrollTop >= to) ||
    //                 (to < from && scrollTop <= to)
    //             ) {
    //                 clearInterval(move);
    //                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //             } else {
    //                 body.scrollTop += speed;
    //                 element.scrollTop += speed;
    //                 prevScrollTop = scrollTop;
    //             }
    //         }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;