const store = {
  pageIsVisible: true,
  currentPromoSliderItemIndex: 0, // current active promo slider item
  currentSliderItemIndex: 0, // current active menu slider item
  isPageNotActive: false,
};
function set(obj) {
  store[obj.prop] = obj.value;
}
function get(prop) {
  return store[prop];
}
export { set };
export { get };
