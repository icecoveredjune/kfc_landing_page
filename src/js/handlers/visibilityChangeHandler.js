import { set } from '../store';

/**
 * @param {void}
 * @returns {void}
 */
function visibilityChangeHandler() {
  if (document.visibilityState === 'hidden') {
    set({
      prop: 'isPageNotActive',
      value: true,
    });
  } else {
    set({
      prop: 'isPageNotActive',
      value: false,
    });
  }
}
export default visibilityChangeHandler;
