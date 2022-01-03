/**
 * @param  {Event} e
 * @returns {void}
 */

let xStart = null;
function handleMenusTouchStart(e) {
  const firstTouch = e.touches[0];
  xStart = firstTouch.clientX;
}
export default handleMenusTouchStart;
export { xStart };
