import debounce from '../debounce';
import moveMenusSlider from '../moveMenusSlider';

/**
 * @param  {Event} e
 * @returns {void}
 */
const handleMenusTouchMove = debounce((e) => {
  moveMenusSlider(e, true);
}, 50);
export default handleMenusTouchMove;
