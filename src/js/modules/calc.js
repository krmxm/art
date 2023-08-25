import {getResourse} from '../services/requests';

const calc = (size, material, options, promocode, result, stateForForm, button) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result),
    buttonForm = document.querySelector(button);

    let sum = 0, sizeValue = '', materialValue = '', optionsValue = '';

    buttonForm.disabled = true; 

    function changePram(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                  select = target.id;
            function calcFunc(state) {
                console.log(state[select]); // объект из бд и select = название ключа внутри этого объекта (size, material и т.д.)
                for(let key in state[select]) {
                    if (key === elem.value){
                        switch(select) {
                            case "size":
                                sizeValue = state[select][key];
                                stateForForm.size = key;
                                // console.log(sizeValue);
                                // console.log(stateForForm);
                                break;
                            case "material":
                                materialValue = state[select][key];
                                stateForForm.material = key;
                                // console.log(materialValue);
                                break;
                            case "options":
                                optionsValue = state[select][key];
                                stateForForm.options = key;
                                // console.log(optionsValue);
                                break;
                        }
                    }
                    // console.log(state[select][key]);
                }
                sum = Math.round((+sizeValue) * (+materialValue)) + (+optionsValue);

                if(sizeBlock.value == '' || materialBlock.value == '') {
                    resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
                } else if(promocodeBlock.value == 'IWANTPOPART') {
                    resultBlock.textContent = Math.round(sum * 0.7);
                    buttonForm.disabled = false;
                    stateForForm.total = resultBlock.textContent;
                } else {
                    resultBlock.textContent = sum;
                    buttonForm.disabled = false;
                    stateForForm.total = resultBlock.textContent;
                }
            }

            getResourse('../../assets/calcPrice.json')
            .then(res => {
                calcFunc(res);
            })
            .catch(e => console.error(e));

            console.log(stateForForm);
        });
    }


    changePram('change', sizeBlock);
    changePram('change', materialBlock);
    changePram('change', optionsBlock);
    changePram('input', promocodeBlock);

    // console.log(sizeBlock.value); изменяется значение селекта
};

export default calc;