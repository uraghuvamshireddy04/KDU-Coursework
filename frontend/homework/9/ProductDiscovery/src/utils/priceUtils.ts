export const calculateDiscountedPrice = ( price: number, discountPercentage: number): number => {
  if (discountPercentage > 0) {
    return +(price - (price * discountPercentage) / 100).toFixed(2);
  }
  return price;
};
