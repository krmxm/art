import {getResourse} from '../services/requests';

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);

    let sum = 0, sizeValue = '', materialValue = '', optionsValue = '';

    function changePram(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                  select = target.id;
            function calcFunc(state) {
                console.log(state[select]);
                for(let key in state[select]) {
                    if (key === elem.value){
                        switch(select) {
                            case "size":
                                sizeValue = state[select][key];
                                break;
                            case "material":
                                materialValue = state[select][key];
                                break;
                            case "options":
                                optionsValue = state[select][key];
                                break;
                        }
                    }
                    console.log(state[select][key]);
                }
                sum = Math.round((+sizeValue) * (+materialValue)) + (+optionsValue);

                if(sizeBlock.value == '' || materialBlock.value == '') {
                    resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
                } else if(promocodeBlock.value == 'IWANTPOPART') {
                    resultBlock.textContent = Math.round(sum * 0.7);
                } else {
                    resultBlock.textContent = sum;
                }
            }

            getResourse('../../assets/calcPrice.json')
            .then(res => {
                calcFunc(res);
            })
            .catch(e => console.error(e));
        });
    }


    changePram('change', sizeBlock);
    changePram('change', materialBlock);
    changePram('change', optionsBlock);
    changePram('input', promocodeBlock);
};

export default calc;