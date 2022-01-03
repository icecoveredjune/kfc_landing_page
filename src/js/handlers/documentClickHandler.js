import navClickHandler from './navClickHandler';
import sliderDotsClickHandler from './sliderDotsClickHandler';
import menuHamburgerClickHandler from './menuHamburgerClickHandler';
import closeMenuClickHandler from './closeMenuClickHandler';

function documentClickHandler(e) {
  const target = e.target;

  if (target.classList.contains('nav') || target.closest('.nav')) {
    navClickHandler(e);
    return;
  }
  if (target.classList.contains('slider__dots')) {
    sliderDotsClickHandler(e);
    return;
  }

  if (target.classList.contains('hamburger') || target.closest('.hamburger')) {
    menuHamburgerClickHandler(e);
    return;
  }
  if (target.classList.contains('close') || target.closest('.close')) {
    closeMenuClickHandler(e);
    return;
  }
}
export default documentClickHandler;
