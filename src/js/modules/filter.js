const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = document.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          allMark = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    function typeFilter(mark) {
        allMark.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('animated', 'fadeIn'); 
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn'); 

        if(mark) {
            mark.forEach(item => {
                item.style.display = 'block';
                item.classList.add('animated', 'fadeIn');
            });
        }
        if(mark.length < 1){
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
        console.log(mark);
    }

    menu.addEventListener('click', (e) => {
        const target = e.target;
        if(target && target.tagName === "LI") {
            items.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
        }

        const selectClass = target.classList[0],
              showElems = wrapper.querySelectorAll(`.${selectClass}`);
        typeFilter(showElems);
    });
};

export default filter;