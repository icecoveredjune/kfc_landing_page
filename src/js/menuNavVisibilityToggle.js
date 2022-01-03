import isOverflownX from './isOverflownX';
/**
 * check if slider menu width is overflown
 * @returns {void}
 */
function menuNavVisibilityToggle() {
  const menuSlider = document.getElementsByClassName('menuSlider')[0];
  const menuSliderNavs = document.getElementsByClassName('nav');
  const style = window.getComputedStyle(menuSlider);
  const matrix = new WebKitCSSMatrix(style.transform);
  const shiftAmount = matrix.m41;
  const navLeft = document.querySelector('main .nav-left');

  if (isOverflownX(menuSlider)) {
    [...menuSliderNavs].forEach((nav) => {
      const el = nav;

      el.classList.remove('hidden');
    });
    if (!shiftAmount) {
      navLeft.classList.add('hidden');
    }
  } else {
    [...menuSliderNavs].forEach((nav) => {
      const el = nav;

      el.classList.add('hidden');
    });
  }
}
export default menuNavVisibilityToggle;
