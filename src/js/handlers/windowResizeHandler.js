import menuNavVisibilityToggle from './../menuNavVisibilityToggle';
import { set } from '../store';

let resizeTimeout = null;
/**
 * @returns  {void}
 */
function windowResizeHandler() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const menuSlider = document.getElementsByClassName('menuSlider')[0];
    const navLeft = document.querySelector('main .nav-left');

    menuNavVisibilityToggle();
    set({
      prop: 'currentSliderItemIndex',
      value: 0,
    });
    menuSlider.style.transform = `translateX(0)`;
    navLeft.classList.add('hidden');
  }, 100);
}
export default windowResizeHandler;
