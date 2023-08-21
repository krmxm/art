const checkTextInputs = (selector) => {
    const txtinputs = document.querySelectorAll(selector);

    txtinputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
        input.addEventListener('input', () => {
            input.value = input.value.raplace(/[^а-яё 0-9]/ig, '');
        });
    });
};

export default checkTextInputs;