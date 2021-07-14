export function getDiscountRate(originPrice, promotionPrice) {
  if (!originPrice || !promotionPrice) return 0;
  const diff = originPrice - promotionPrice;
  return Math.floor((diff / originPrice) * 100);
}
