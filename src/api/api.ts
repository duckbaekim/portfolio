import BASEURL from '@api/axios';
import axios from './axios';
// 이메일 중복 확인
// export const callApiCheckEmail = (email: string) =>
//   axios.post('/account/checkEmail', {email});

// buyId 요청, 주문조회 시
export const callApiCheckBuyerId = (name: string, contact: string) =>
  axios.post('/buyer/confirm', {name, phone: contact});

// 인증번호 발송
export const callApiSendCert = (contact: string) =>
  axios.post('/cert', {contact});
// 인증번호 확인
export const callApiConfirmCert = (contact: string, certCode: string) =>
  axios.post('/cert/confirm', {contact, certCode});
// 상품 주문내역
export const callApiOrderList = (buyerId: number) =>
  axios.post('/order/getAll', {buyerId});

// 상품 주문상세
export const callApiOrderDetail = (orderId: number, buyerId: number) =>
  axios.post('/order/getOne', {orderId, buyerId});

// 주문하기
export const callApiOrder = (formData: any) => axios.post('/order', formData);

// 결제하기
export const callApiPayment = (orderId: number, buyerId: number) =>
  axios.get(`${BASEURL}/order/shop`, {params: {orderId, buyerId}});

// 환불신청
export const callApiPayCancel = (payId: number, buyerId: number) =>
  axios.post('/pay/cancel', {payId, buyerId});
