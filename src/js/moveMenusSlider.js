import { set } from './store';
import { get } from './store';
import { xStart } from './handlers/handleMenusTouchStart';

function moveMenusSlider(e, touch = false) {
  const target = e.target;
  const menuSlider = document.getElementsByClassName('menuSlider')[0];
  const menuSliderItem = document.querySelector('.menuSlider .item');
  const itemSliderWidth = +menuSliderItem.getBoundingClientRect().width;
  const navLeft = document.querySelector('main .nav-left');
  const navRight = document.querySelector('main .nav-right');
  const menuSliderFullWidth = menuSlider.scrollWidth;
  const menuSliderwVisiblewidth = menuSlider.clientWidth;
  // amount of items that currently not visible
  const hiddenItemsCount = Math.round(
    (menuSliderFullWidth - menuSliderwVisiblewidth) / itemSliderWidth,
  );
  let moveTouch = null;
  let xMove = null;
  let xDiff = null;
  // number of px that we need to move slider
  let shiftAmount = null;
  let currentSliderItemIndex = get('currentSliderItemIndex');

  // if menu has swiped
  if (touch) {
    moveTouch = e.touches[0];
    xMove = moveTouch.clientX;
    xDiff = xStart - xMove;

    if (!xStart) {
      return;
    }
    // if we achieve last slider item
    if (currentSliderItemIndex === hiddenItemsCount && xDiff > 0) {
      return;
    }
    // if we achieve first slider item
    if (!currentSliderItemIndex && xDiff < 0) {
      return;
    }
  }
  // if direction from left to right
  if (
    (touch && xDiff > 0) ||
    target.classList.contains('nav-right') ||
    target.closest('.nav-right')
  ) {
    set({
      prop: 'currentSliderItemIndex',
      value: ++currentSliderItemIndex,
    });
    navLeft.classList.remove('hidden');
  }
  // if direction from right to left
  if (
    (touch && xDiff < 0) ||
    target.classList.contains('nav-left') ||
    target.closest('.nav-left')
  ) {
    set({
      prop: 'currentSliderItemIndex',
      value: --currentSliderItemIndex,
    });
    navRight.classList.remove('hidden');
  }
  shiftAmount = -currentSliderItemIndex * Math.round(itemSliderWidth);
  menuSlider.style.transform = `translateX(${shiftAmount}px)`;
  if (currentSliderItemIndex === hiddenItemsCount) {
    navRight.classList.add('hidden');
  }
  if (!currentSliderItemIndex) {
    navLeft.classList.add('hidden');
  }
}
export default moveMenusSlider;
