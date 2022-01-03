import { set } from './store';
import { get } from './store';
import changePromoSliderActiveDot from './changePromoSliderActiveDot';
import delay from './delay';

let isUserInteractWithSlider = false;
/**
 * @param  {Int} interval
 * @returns {void}
 */
function movePromoSlider(interval) {
  let currentPromoSliderItemIndex = get('currentPromoSliderItemIndex');
  let shiftAmount = null;
  const promoSlider = document.getElementsByClassName('slider')[0];
  const promoSliderLength =
    document.querySelectorAll('.slider > div').length - 2;
  const transitionDuration = 500;
  const handleMouseEnter = () => {
    isUserInteractWithSlider = true;
  };
  const handleMouseLeave = () => {
    isUserInteractWithSlider = false;
  };
  const isPageNotActive = get('isPageNotActive');

  promoSlider.addEventListener('mouseenter', handleMouseEnter, false);
  promoSlider.addEventListener('mouseleave', handleMouseLeave, false);
  delay(interval)
    .then(() => {
      if (isUserInteractWithSlider || isPageNotActive) {
        throw new Error('');
      }
      promoSlider.classList.add('shifting');
      set({
        prop: 'currentPromoSliderItemIndex',
        value: ++currentPromoSliderItemIndex,
      });
      changePromoSliderActiveDot(currentPromoSliderItemIndex);
      shiftAmount = -100 - currentPromoSliderItemIndex * 100;
      promoSlider.style.transform = `translate(${shiftAmount}%)`;
      return delay(transitionDuration);
    })
    .then(() => {
      promoSlider.classList.remove('shifting');
      if (currentPromoSliderItemIndex === promoSliderLength) {
        currentPromoSliderItemIndex = 0;
        set({
          prop: 'currentPromoSliderItemIndex',
          value: 0,
        });
        promoSlider.style.transform = `translate(-100%)`;
      }
    })
    .catch((e) => {})
    .finally(() => {
      promoSlider.removeEventListener('mouseenter', handleMouseEnter, false);
      promoSlider.removeEventListener('mouseleave', handleMouseLeave, false);
      movePromoSlider(interval);
    });
}

export default movePromoSlider;
