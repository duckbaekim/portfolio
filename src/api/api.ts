import axios from './axios';
import SLACKURL from '../../slackurl.json';
// 이메일 중복 확인
// export const callApiCheckEmail = (email: string) =>
//   axios.post('/account/checkEmail', {email});

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

// // ERROR 리포트
export const callApiErrorReport = (error: any) => {
  const {common} = store.getState();
  const {name, contact, buyerId, list, ordered} = common;

  return axios.post(
    SLACKURL.shop,
    {
      channel: 'shopping_front_error_log',
      text: `
    ------------------------------------------------------
    [Error] ${process.env.NODE_ENV === 'production' ? '' : ' - [개발서버]'}
    - 발생일시: ${moment().format('YYYY-MM-DD HH:mm:SS')}
    - 사용자정보: 
    이름: ${name || '알수없음'}
    연락처: ${contact || '알수없음'}
    구매자ID: ${buyerId || '알수없음'}
    총 구매내역 수: ${list.length || '알수없음'}
    
    - 주문정보
    주문ID: ${ordered.id || '알수없음'}
    주문번호: ${ordered.orderNum || '알수없음'}
    총 가격: ${ordered.totalPrice || '알수없음'}
    배송비: ${ordered.deliveryFee || '알수없음'}
    상품ID: ${ordered.productId || '알수없음'}
  
    - 에러정보
    ${JSON.stringify(error) || '알수없음'}
    
    `,
      username: 'CaroomBot',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};
