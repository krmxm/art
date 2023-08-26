/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const calc = (size, material, options, promocode, result, stateForForm, button) => {
  const sizeBlock = document.querySelector(size);
  const materialBlock = document.querySelector(material);
  const optionsBlock = document.querySelector(options);
  const promocodeBlock = document.querySelector(promocode);
  const resultBlock = document.querySelector(result),
    buttonForm = document.querySelector(button);
  let sum = 0,
    sizeValue = '',
    materialValue = '',
    optionsValue = '';
  buttonForm.disabled = true;
  function changePram(event, elem) {
    elem.addEventListener(event, e => {
      const target = e.target,
        select = target.id;
      function calcFunc(state) {
        console.log(state[select]); // объект из бд и select = название ключа внутри этого объекта (size, material и т.д.)
        for (let key in state[select]) {
          if (key === elem.value) {
            switch (select) {
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

        sum = Math.round(+sizeValue * +materialValue) + +optionsValue;
        if (sizeBlock.value == '' || materialBlock.value == '') {
          resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else if (promocodeBlock.value == 'IWANTPOPART') {
          resultBlock.textContent = Math.round(sum * 0.7);
          buttonForm.disabled = false;
          stateForForm.total = resultBlock.textContent;
        } else {
          resultBlock.textContent = sum;
          buttonForm.disabled = false;
          stateForForm.total = resultBlock.textContent;
        }
      }
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResourse)('../../assets/calcPrice.json').then(res => {
        calcFunc(res);
      }).catch(e => console.error(e));
      console.log(stateForForm);
    });
  }
  changePram('change', sizeBlock);
  changePram('change', materialBlock);
  changePram('change', optionsBlock);
  changePram('input', promocodeBlock);

  // console.log(sizeBlock.value); изменяется значение селекта
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/calcScroll.js":
/*!**************************************!*\
  !*** ./src/js/modules/calcScroll.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calcScroll = () => {
  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflow = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcScroll);

/***/ }),

/***/ "./src/js/modules/checkTextInputs.js":
/*!*******************************************!*\
  !*** ./src/js/modules/checkTextInputs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkTextInputs = selector => {
  const txtinputs = document.querySelectorAll(selector);
  txtinputs.forEach(input => {
    input.addEventListener('keypress', function (e) {
      if (e.key.match(/[^а-яё 0-9]/ig)) {
        e.preventDefault();
      }
    });
    input.addEventListener('input', () => {
      input.value = input.value.raplace(/[^а-яё 0-9]/ig, '');
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkTextInputs);

/***/ }),

/***/ "./src/js/modules/filter.js":
/*!**********************************!*\
  !*** ./src/js/modules/filter.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    if (mark) {
      mark.forEach(item => {
        item.style.display = 'block';
        item.classList.add('animated', 'fadeIn');
      });
    }
    if (mark.length < 1) {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
    console.log(mark);
  }
  menu.addEventListener('click', e => {
    const target = e.target;
    if (target && target.tagName === "LI") {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (filter);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const forms = stateForForm => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input'),
    textareas = document.querySelectorAll('textarea'),
    upload = document.querySelectorAll('[name="upload"]'),
    selects = document.querySelectorAll('select'),
    price = document.querySelector('.calc-price');

  // checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Скоро мы с вами свяжемся!',
    failure: 'Ошибка',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };
  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран';
    });
    textareas.forEach(item => {
      item.value = '';
    });
    selects.forEach(item => {
      item.value = '';
    });
    price.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
  };
  upload.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const arr = item.files[0].name.split('.');
      arr[0].length > 5 ? dots = "..." : dots = ".";
      const name = arr[0].substring(0, 5) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.appendChild(statusMessage);
      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.appendChild(statusImg);
      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);
      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'parm') {
        for (let key in stateForForm) {
          formData.append(key, stateForForm[key]);
        }
      }
      let api;
      item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
      console.log(api);
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        textMessage.textContent = message.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          item.style.display = 'block';
          item.classList.remove('fadeOutUp');
          item.classList.add('fadeInUp');
        }, 5000);
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/mask.js":
/*!********************************!*\
  !*** ./src/js/modules/mask.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const mask = selector => {
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
      def = matrix.replace(/\D/g, ''),
      // 7
      val = this.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    console.log(def);
    // console.log(this.value);

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && val.length > i ? val.charAt(i++) : i >= val.length ? '' : a;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mask);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _calcScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcScroll */ "./src/js/modules/calcScroll.js");

const modals = state => {
  let btnPressed = false;
  const scroll = (0,_calcScroll__WEBPACK_IMPORTED_MODULE_0__["default"])();
  function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;
  }
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
  }
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    let destroy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]');
    trigger.forEach(btn => {
      btn.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }
        btnPressed = true;
        if (destroy) {
          btn.remove();
        }
        if (modal.classList.contains('popup_calc_profile')) {
          if (!state.form || !state.width || !state.height) {
            e.removeEventListener();
          }
        }
        if (modal.classList.contains('popup_calc_end')) {
          if (!state.type || !state.profile) {
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
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        windows.forEach(item => {
          closeModal(item);
        });
        closeModal(modal);
      }
    });
  }
  function showModalByTime(selector, time) {
    setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal]').forEach(item => {
        // почему windows не доступна
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });
      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        // const scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`; // есть доступ к scroll?
      }
    }, time);
  }
  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/showMoreCards.js":
/*!*****************************************!*\
  !*** ./src/js/modules/showMoreCards.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const showMoreCards = (trigger, wrapper) => {
  const btn = document.querySelector(trigger);

  // cards.forEach(item => {
  //     item.classList.add('animated', 'fadeInUp');
  // });

  // btn.addEventListener('click', () => {
  //     cards.forEach(item => {
  //         item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
  //         item.classList.add('col-sm-3', 'col-sm-offset-0', '.col-xs-10', 'col-xs-offset-1');
  //     });

  //     btn.remove();
  // });

  btn.addEventListener('click', function () {
    (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/styles').then(res => {
      createCards(res);
    }).catch(error => console.log(error));
    this.remove();
  });
  function createCards(response) {
    response.forEach(_ref => {
      let {
        src,
        title,
        link
      } = _ref;
      let card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
            <div class=styles-block>
                <img src=${src} alt="style">
                <h4>${title}</h4>
                <a href="${link}">Подробнее</a>
            </div>
            `;
      document.querySelector(wrapper).appendChild(card);
    });
  }

  // <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
  //     <div class=styles-block>
  //         <img src=assets/img/styles-5.jpg alt>
  //         <h4>Пастелью</h4>
  //         <a href="#">Подробнее</a>
  //     </div>
  // </div>
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showMoreCards);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const slider = (slides, dir, prev, next) => {
  let slideIndex = 1;
  let paused = false;
  const items = document.querySelectorAll(slides);
  function showSlides(i) {
    if (i > items.length) {
      slideIndex = 1;
    }
    if (i < 1) {
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
  } catch (e) {}
  function activateAnimation() {
    if (dir === 'vertical') {
      paused = setInterval(() => {
        plusSlides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 3000);
    } else {
      paused = setInterval(() => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResourse: () => (/* binding */ getResourse),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await res.text();
};
const getResourse = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/mask */ "./src/js/modules/mask.js");
/* harmony import */ var _modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/checkTextInputs */ "./src/js/modules/checkTextInputs.js");
/* harmony import */ var _modules_showMoreCards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showMoreCards */ "./src/js/modules/showMoreCards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/filter */ "./src/js/modules/filter.js");








window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let state = {};
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(state);
  (0,_modules_mask__WEBPACK_IMPORTED_MODULE_3__["default"])('[name="phone"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="name"]');
  (0,_modules_checkTextInputs__WEBPACK_IMPORTED_MODULE_4__["default"])('[name="message"]');
  (0,_modules_showMoreCards__WEBPACK_IMPORTED_MODULE_5__["default"])('.button-styles', '#styles .row');
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])('#size', '#material', '#options', '.promocode', '.calc-price', state, '#button-calc');
  (0,_modules_filter__WEBPACK_IMPORTED_MODULE_7__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map