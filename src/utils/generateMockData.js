import moment from 'moment';

const counseilingData = {
  name: '홍길동',
  phone: '010-1234-1234',
  dateString: moment(new Date()).format('yyyy.MM.DD'),
};
const paymentMethods = ['CASH', 'LEASE', 'INSTALLMENT', 'RENT'];
const resionNames = ['수도권', '서울특별시', '강원도', '김포'];
function getRandomStep() {
  return Math.round(Math.random() * 3);
}
function getRandomOpened() {
  return Math.random() > 0.5 ? true : false;
}
function makeGenerateCounselingData() {
  let a = 20;
  return function generateCounselingData() {
    const arr = new Array(20).fill('').map((_) => ({
      ...counseilingData,
      id: a++,
      step: getRandomStep(),
      isComplete: getRandomOpened(),
      paymentMethod: paymentMethods[getRandomStep()],
      region: resionNames[getRandomStep()],
      brandName: 'BMW',
      modelName: '3Series',
      className: '320i Luxury',
    }));
    return arr;
  };
}

export const counseilingMockData = makeGenerateCounselingData();
