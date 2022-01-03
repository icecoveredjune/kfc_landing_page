/**
 * @param {void}
 * @returns {void}
 */
function closeMenuClickHandler() {
  const menuHamburger = document.getElementsByClassName('menuHamburger')[0];

  menuHamburger.style.left = '-110%';
  document.body.style.overflow = 'auto';
}
export default closeMenuClickHandler;
