import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreCards from "./modules/showMoreCards";
import calc from "./modules/calc";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";


window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let state= {};

    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
    forms(state);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreCards('.button-styles', '#styles .row');
    calc('#size', '#material', '#options', '.promocode', '.calc-price', state, '#button-calc');
    filter();
    pictureSize('.sizes-block');
});