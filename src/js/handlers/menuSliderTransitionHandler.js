function menuSliderTransitionHandler(e) {
  const menuSlider = document.getElementsByClassName('menuSlider')[0];
  const menuSliderLength =
    document.querySelectorAll('.menuSlider .item').length;
  const firstSliderItem = document.querySelector('.menuSlider .item');
  const lastSliderItem =
    document.querySelectorAll('.menuSlider .item')[menuSliderLength - 1];
  const navLeft = document.querySelector('main .nav-left');
  const navRight = document.querySelector('main .nav-right');
  const menuSliderWidth = menuSlider.getBoundingClientRect().width;
  const firstItemXCoord = firstSliderItem.getBoundingClientRect().x;
  const lastItemXCoord = lastSliderItem.getBoundingClientRect().x;
  const style = window.getComputedStyle(menuSlider);
  const matrix = new WebKitCSSMatrix(style.transform);
  let direction = null;

  if (lastItemXCoord < menuSliderWidth) {
    navRight.classList.add('hidden');
  }
  if (firstItemXCoord === menuSlider.getBoundingClientRect().x) {
    navLeft.classList.add('hidden');
  }
  if (+matrix.m41 < 0) {
    direction = 'right';
  } else {
    direction = 'left';
  }
  if (direction === 'left') {
    navRight.classList.remove('hidden');
  } else {
    navLeft.classList.remove('hidden');
  }
}
export default menuSliderTransitionHandler;
