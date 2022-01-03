/**
 * @param  {Function} f
 * @param  {milliseconds} ms
 * @returns {void}
 */
function debounce(f, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) {
      return;
    }
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}
export default debounce;
