export const numberWithCommas = (number: number) => {
  const _number = Math.floor(number);
  if (isNaN(_number)) {
    return number;
  }
  // const result = _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // if (result === '0') {
  //   return '';
  // }
  return _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getRate = (
  originPrice: number | string,
  promotionPrice: number | string,
) => {
  if (!originPrice || !promotionPrice) return 0;
  const diff = Number(originPrice) - Number(promotionPrice);
  return Math.floor((diff / Number(originPrice)) * 100);
};

export const phoneNumberhipun = (number: number | string) => {
  return number
    .toString()
    .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
};
