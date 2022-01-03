function clonePromoSliderItems() {
  const promoSlider = document.getElementsByClassName('slider')[0];
  const promoSliderItems = document.querySelectorAll('.slider > div');
  const promoSliderLength = promoSliderItems.length;
  const firstSlide = promoSliderItems[0];
  const lastSlide = promoSliderItems[promoSliderLength - 1];
  const cloneFirst = firstSlide.cloneNode(true);
  const cloneLast = lastSlide.cloneNode(true);

  promoSlider.appendChild(cloneFirst);
  promoSlider.insertBefore(cloneLast, firstSlide);
}
export default clonePromoSliderItems;
