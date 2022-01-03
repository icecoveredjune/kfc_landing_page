/**
 * @param {Int} index
 * @returns {void}
 */
function changePromoSliderActiveDot(index) {
  const promoSliderDots = document.querySelectorAll('.slider__dots > div');
  const promoSliderDotsLength = promoSliderDots.length;

  [...promoSliderDots].forEach((dot) => {
    const dot_ = dot;

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
export default changePromoSliderActiveDot;
