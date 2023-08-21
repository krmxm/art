const mask = (selector) => {

    let setCursorPosition = (pos, elem) => {
         elem.focus();
         
         if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
         } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
         }

        // elem.addEventListener('click', () => {
        //     if (pos <= 2) {
        //         elem.setSelectionRange(pos, pos);
        //     }
        // }); // переносит курсор посел +7
    };

    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''), // 7
            val = this.value.replace(/\D/g, '');
        
        if (def.length >= val.length) {
            val = def;
        }


        console.log(def);
        // console.log(this.value);

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && val.length > i  ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
        
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('keypress', createMask); // переносит курсор после +7
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

};

export default mask;
