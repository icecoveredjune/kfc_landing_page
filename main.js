/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./src/js/isOverflownX.js
/**
 * define if element width is overflown
 * @param  {Element} element
 * @returns {boolean}
 */
function isOverflownX(element) {
  return element.scrollWidth > element.clientWidth;
}

/* harmony default export */ const js_isOverflownX = (isOverflownX);
;// CONCATENATED MODULE: ./src/js/menuNavVisibilityToggle.js


/**
 * check if slider menu width is overflown
 * @returns {void}
 */

function menuNavVisibilityToggle() {
  var menuSlider = document.getElementsByClassName('menuSlider')[0];
  var menuSliderNavs = document.getElementsByClassName('nav');
  var style = window.getComputedStyle(menuSlider);
  var matrix = new WebKitCSSMatrix(style.transform);
  var shiftAmount = matrix.m41;
  var navLeft = document.querySelector('main .nav-left');

  if (js_isOverflownX(menuSlider)) {
    _toConsumableArray(menuSliderNavs).forEach(function (nav) {
      var el = nav;
      el.classList.remove('hidden');
    });

    if (!shiftAmount) {
      navLeft.classList.add('hidden');
    }
  } else {
    _toConsumableArray(menuSliderNavs).forEach(function (nav) {
      var el = nav;
      el.classList.add('hidden');
    });
  }
}

/* harmony default export */ const js_menuNavVisibilityToggle = (menuNavVisibilityToggle);
;// CONCATENATED MODULE: ./src/js/clonePromoSliderItems.js
function clonePromoSliderItems() {
  var promoSlider = document.getElementsByClassName('slider')[0];
  var promoSliderItems = document.querySelectorAll('.slider > div');
  var promoSliderLength = promoSliderItems.length;
  var firstSlide = promoSliderItems[0];
  var lastSlide = promoSliderItems[promoSliderLength - 1];
  var cloneFirst = firstSlide.cloneNode(true);
  var cloneLast = lastSlide.cloneNode(true);
  promoSlider.appendChild(cloneFirst);
  promoSlider.insertBefore(cloneLast, firstSlide);
}

/* harmony default export */ const js_clonePromoSliderItems = (clonePromoSliderItems);
;// CONCATENATED MODULE: ./src/js/store.js
var store = {
  pageIsVisible: true,
  currentPromoSliderItemIndex: 0,
  // current active promo slider item
  currentSliderItemIndex: 0,
  // current active menu slider item
  isPageNotActive: false
};

function set(obj) {
  store[obj.prop] = obj.value;
}

function get(prop) {
  return store[prop];
}



;// CONCATENATED MODULE: ./src/js/handlers/windowResizeHandler.js


var resizeTimeout = null;
/**
 * @returns  {void}
 */

function windowResizeHandler() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    var menuSlider = document.getElementsByClassName('menuSlider')[0];
    var navLeft = document.querySelector('main .nav-left');
    js_menuNavVisibilityToggle();
    set({
      prop: 'currentSliderItemIndex',
      value: 0
    });
    menuSlider.style.transform = "translateX(0)";
    navLeft.classList.add('hidden');
  }, 100);
}

/* harmony default export */ const handlers_windowResizeHandler = (windowResizeHandler);
;// CONCATENATED MODULE: ./src/js/handlers/handleMenusTouchStart.js
/**
 * @param  {Event} e
 * @returns {void}
 */
var xStart = null;

function handleMenusTouchStart(e) {
  var firstTouch = e.touches[0];
  xStart = firstTouch.clientX;
}

/* harmony default export */ const handlers_handleMenusTouchStart = (handleMenusTouchStart);

;// CONCATENATED MODULE: ./src/js/moveMenusSlider.js




function moveMenusSlider(e) {
  var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var target = e.target;
  var menuSlider = document.getElementsByClassName('menuSlider')[0];
  var menuSliderItem = document.querySelector('.menuSlider .item');
  var itemSliderWidth = +menuSliderItem.getBoundingClientRect().width;
  var navLeft = document.querySelector('main .nav-left');
  var navRight = document.querySelector('main .nav-right');
  var menuSliderFullWidth = menuSlider.scrollWidth;
  var menuSliderwVisiblewidth = menuSlider.clientWidth; // amount of items that currently not visible

  var hiddenItemsCount = Math.round((menuSliderFullWidth - menuSliderwVisiblewidth) / itemSliderWidth);
  var moveTouch = null;
  var xMove = null;
  var xDiff = null; // number of px that we need to move slider

  var shiftAmount = null;
  var currentSliderItemIndex = get('currentSliderItemIndex'); // if menu has swiped

  if (touch) {
    moveTouch = e.touches[0];
    xMove = moveTouch.clientX;
    xDiff = xStart - xMove;

    if (!xStart) {
      return;
    } // if we achieve last slider item


    if (currentSliderItemIndex === hiddenItemsCount && xDiff > 0) {
      return;
    } // if we achieve first slider item


    if (!currentSliderItemIndex && xDiff < 0) {
      return;
    }
  } // if direction from left to right


  if (touch && xDiff > 0 || target.classList.contains('nav-right') || target.closest('.nav-right')) {
    set({
      prop: 'currentSliderItemIndex',
      value: ++currentSliderItemIndex
    });
    navLeft.classList.remove('hidden');
  } // if direction from right to left


  if (touch && xDiff < 0 || target.classList.contains('nav-left') || target.closest('.nav-left')) {
    set({
      prop: 'currentSliderItemIndex',
      value: --currentSliderItemIndex
    });
    navRight.classList.remove('hidden');
  }

  shiftAmount = -currentSliderItemIndex * Math.round(itemSliderWidth);
  menuSlider.style.transform = "translateX(".concat(shiftAmount, "px)");

  if (currentSliderItemIndex === hiddenItemsCount) {
    navRight.classList.add('hidden');
  }

  if (!currentSliderItemIndex) {
    navLeft.classList.add('hidden');
  }
}

/* harmony default export */ const js_moveMenusSlider = (moveMenusSlider);
;// CONCATENATED MODULE: ./src/js/handlers/navClickHandler.js

/**
 * @returns  {void}
 */

function navClickHandler(e) {
  js_moveMenusSlider(e);
}

/* harmony default export */ const handlers_navClickHandler = (navClickHandler);
;// CONCATENATED MODULE: ./src/js/handlers/sliderDotsClickHandler.js
function sliderDotsClickHandler(e) {}

/* harmony default export */ const handlers_sliderDotsClickHandler = (sliderDotsClickHandler);
;// CONCATENATED MODULE: ./src/js/handlers/menuHamburgerClickHandler.js
function menuHamburgerClickHandler() {
  var menuHamburger = document.getElementsByClassName('menuHamburger')[0];
  menuHamburger.style.left = 0;
  document.body.style.overflow = 'hidden';
}

/* harmony default export */ const handlers_menuHamburgerClickHandler = (menuHamburgerClickHandler);
;// CONCATENATED MODULE: ./src/js/handlers/closeMenuClickHandler.js
/**
 * @param {void}
 * @returns {void}
 */
function closeMenuClickHandler() {
  var menuHamburger = document.getElementsByClassName('menuHamburger')[0];
  menuHamburger.style.left = '-110%';
  document.body.style.overflow = 'auto';
}

/* harmony default export */ const handlers_closeMenuClickHandler = (closeMenuClickHandler);
;// CONCATENATED MODULE: ./src/js/handlers/documentClickHandler.js





function documentClickHandler(e) {
  var target = e.target;

  if (target.classList.contains('nav') || target.closest('.nav')) {
    handlers_navClickHandler(e);
    return;
  }

  if (target.classList.contains('slider__dots')) {
    handlers_sliderDotsClickHandler(e);
    return;
  }

  if (target.classList.contains('hamburger') || target.closest('.hamburger')) {
    handlers_menuHamburgerClickHandler(e);
    return;
  }

  if (target.classList.contains('close') || target.closest('.close')) {
    handlers_closeMenuClickHandler(e);
    return;
  }
}

/* harmony default export */ const handlers_documentClickHandler = (documentClickHandler);
;// CONCATENATED MODULE: ./src/js/handlers/visibilityChangeHandler.js

/**
 * @param {void}
 * @returns {void}
 */

function visibilityChangeHandler() {
  if (document.visibilityState === 'hidden') {
    set({
      prop: 'isPageNotActive',
      value: true
    });
  } else {
    set({
      prop: 'isPageNotActive',
      value: false
    });
  }
}

/* harmony default export */ const handlers_visibilityChangeHandler = (visibilityChangeHandler);
;// CONCATENATED MODULE: ./src/js/debounce.js
/**
 * @param  {Function} f
 * @param  {milliseconds} ms
 * @returns {void}
 */
function debounce(f, ms) {
  var isCooldown = false;
  return function () {
    if (isCooldown) {
      return;
    }

    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(function () {
      return isCooldown = false;
    }, ms);
  };
}

/* harmony default export */ const js_debounce = (debounce);
;// CONCATENATED MODULE: ./src/js/handlers/handleMenusTouchMove.js


/**
 * @param  {Event} e
 * @returns {void}
 */

var handleMenusTouchMove = js_debounce(function (e) {
  js_moveMenusSlider(e, true);
}, 50);
/* harmony default export */ const handlers_handleMenusTouchMove = (handleMenusTouchMove);
;// CONCATENATED MODULE: ./src/js/changePromoSliderActiveDot.js


/**
 * @param {Int} index
 * @returns {void}
 */
function changePromoSliderActiveDot(index) {
  var promoSliderDots = document.querySelectorAll('.slider__dots > div');
  var promoSliderDotsLength = promoSliderDots.length;

  _toConsumableArray(promoSliderDots).forEach(function (dot) {
    var dot_ = dot;

    if (dot_.classList.contains('active')) {
      dot_.classList.remove('active');
    }
  });

  if (index <= promoSliderDotsLength - 1) {
    promoSliderDots[index].classList.add('active');
  } else {
    promoSliderDots[0].classList.add('active');
  }
}

/* harmony default export */ const js_changePromoSliderActiveDot = (changePromoSliderActiveDot);
;// CONCATENATED MODULE: ./src/js/delay.js
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/* harmony default export */ const js_delay = (delay);
;// CONCATENATED MODULE: ./src/js/movePromoSlider.js




var isUserInteractWithSlider = false;
/**
 * @param  {Int} interval
 * @returns {void}
 */

function movePromoSlider(interval) {
  var currentPromoSliderItemIndex = get('currentPromoSliderItemIndex');
  var shiftAmount = null;
  var promoSlider = document.getElementsByClassName('slider')[0];
  var promoSliderLength = document.querySelectorAll('.slider > div').length - 2;
  var transitionDuration = 500;

  var handleMouseEnter = function handleMouseEnter() {
    isUserInteractWithSlider = true;
  };

  var handleMouseLeave = function handleMouseLeave() {
    isUserInteractWithSlider = false;
  };

  var isPageNotActive = get('isPageNotActive');
  promoSlider.addEventListener('mouseenter', handleMouseEnter, false);
  promoSlider.addEventListener('mouseleave', handleMouseLeave, false);
  js_delay(interval).then(function () {
    if (isUserInteractWithSlider || isPageNotActive) {
      throw new Error('');
    }

    promoSlider.classList.add('shifting');
    set({
      prop: 'currentPromoSliderItemIndex',
      value: ++currentPromoSliderItemIndex
    });
    js_changePromoSliderActiveDot(currentPromoSliderItemIndex);
    shiftAmount = -100 - currentPromoSliderItemIndex * 100;
    promoSlider.style.transform = "translate(".concat(shiftAmount, "%)");
    return js_delay(transitionDuration);
  }).then(function () {
    promoSlider.classList.remove('shifting');

    if (currentPromoSliderItemIndex === promoSliderLength) {
      currentPromoSliderItemIndex = 0;
      set({
        prop: 'currentPromoSliderItemIndex',
        value: 0
      });
      promoSlider.style.transform = "translate(-100%)";
    }
  })["catch"](function (e) {})["finally"](function () {
    promoSlider.removeEventListener('mouseenter', handleMouseEnter, false);
    promoSlider.removeEventListener('mouseleave', handleMouseLeave, false);
    movePromoSlider(interval);
  });
}

/* harmony default export */ const js_movePromoSlider = (movePromoSlider);
;// CONCATENATED MODULE: ./src/index.js









document.addEventListener('DOMContentLoaded', function () {
  var menuSlider = document.getElementsByClassName('menuSlider')[0];
  document.addEventListener('click', handlers_documentClickHandler, false);
  document.addEventListener('visibilitychange', handlers_visibilityChangeHandler, false);
  window.addEventListener('resize', handlers_windowResizeHandler, false);
  menuSlider.addEventListener('touchstart', handlers_handleMenusTouchStart, false);
  menuSlider.addEventListener('touchmove', handlers_handleMenusTouchMove, false);
  js_menuNavVisibilityToggle();
  js_clonePromoSliderItems();
  js_movePromoSlider(2000);
});
/******/ })()
;