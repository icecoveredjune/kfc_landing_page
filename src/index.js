import './css/index.css';
import menuNavVisibilityToggle from './js/menuNavVisibilityToggle';
import clonePromoSliderItems from './js/clonePromoSliderItems';
import windowResizeHandler from './js/handlers/windowResizeHandler';
import documentClickHandler from './js/handlers/documentClickHandler';
import visibilityChangeHandler from './js/handlers/visibilityChangeHandler';
import handleMenusTouchStart from './js/handlers/handleMenusTouchStart';
import handleMenusTouchMove from './js/handlers/handleMenusTouchMove';
import movePromoSlider from './js/movePromoSlider';

document.addEventListener('DOMContentLoaded', () => {
  const menuSlider = document.getElementsByClassName('menuSlider')[0];

  document.addEventListener('click', documentClickHandler, false);
  document.addEventListener('visibilitychange', visibilityChangeHandler, false);
  window.addEventListener('resize', windowResizeHandler, false);
  menuSlider.addEventListener('touchstart', handleMenusTouchStart, false);
  menuSlider.addEventListener('touchmove', handleMenusTouchMove, false);
  menuNavVisibilityToggle();
  clonePromoSliderItems();
  movePromoSlider(5000);
});
