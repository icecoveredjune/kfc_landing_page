/**
 * define if element width is overflown
 * @param  {Element} element
 * @returns {boolean}
 */
function isOverflownX(element) {
  return element.scrollWidth > element.clientWidth;
}
export default isOverflownX;
