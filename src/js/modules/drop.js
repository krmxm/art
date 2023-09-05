import {postData} from "../services/requests";

const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - срабатывает сотни милисекунд, объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    // * - срабатывает на элементе, который мы перетаскиваем

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighLight(item) {
        item.closest('.file_upload').style.border = "none";
        if(item.closest('.calc_form')){
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighLight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            if (input.getAttribute('data-upload') === 'onlyImg') { // сразу отправка файла на сервер при drop
                e.preventDefault();
                e.stopPropagation();
                let formData = new FormData();
                [...input.files].forEach(file => {
                    formData.append('image', file);
                    postData('assets/server.php', formData)
                        .then(res => {
                            console.log(res);
                        }); 
                });
            }


            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 5 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 5) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;