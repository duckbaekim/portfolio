import { callApiCheckBuyerId,callApiErrorReport, callApiOrder, callApiOrderList, callApiPayment } from '@api/api';
import openGlobalAlert from '@utils/openGlobalAlert';
import {
  call,
  delay,
  put,
  throttle,
  select, takeLatest,
  takeEvery
} from 'redux-saga/effects';
import store from '../store';
import { actions, types } from './state';

  

  interface AlertPayload {
    open: boolean;
    content: string;
    bottom?: number;
  }
  interface AlertAction {
    type: string;
    payload: AlertPayload;
  }

  export function* requestAlert(action: AlertAction) {
    const {open, content, bottom} = action.payload;
    try {
      yield put(actions.setAlert({open, content, bottom}));
      const {open: opened} = yield select((state) => state.common.alert);
      if (opened) {
        yield delay(4000);
        yield put(actions.setAlert({open: false, content: ''}));
      }
    } catch (err) {
      yield put(actions.errorReport(`requestAlert ${err}`));
    }
  }
  
  export function* requestBuyerId(action: any) {
    const {name, contact} = action.payload;
    try {
      const {data} = yield call(callApiCheckBuyerId, name, contact);
      if (data.success) {
        yield put(actions.setBuyerId(data.id));
        yield put(actions.setName(name))
        yield put(actions.setContact(contact));
      } else {
        openGlobalAlert(data.message || "이름과 전화번호를 다시 확인해주세요.");
      }
    } catch(err) {
      openGlobalAlert("주문 조회에 실패했습니다.");
      yield put(actions.errorReport(`requestBuyerId ${err}`));
    }
  }

  export function* requestOrderList(action: any) {
    const buyerId = action.payload;
    try {
      const {data} = yield call(callApiOrderList, buyerId);
      if (data.success) {
        yield put(actions.setOrderList(data.order));
      } else {
        openGlobalAlert(data.message || "주문 목록 조회에 실패했습니다.");
      }
    } catch(err) {
      openGlobalAlert("주문 목록 조회에 실패했습니다.");
      yield put(actions.errorReport(`requestOrderList ${err}`));
    }
  }

  export function* requestOrder(action: any) {
    const payload = action.payload;
    const {paymentIFrame, ...formData} = payload;
    try {
      const {data} = yield call(callApiOrder, formData);
      if (data.success) {
        yield put(actions.setOrderedData(data.order));
        const {id, buyerId} = data.order;
        yield put(actions.setBuyerId(buyerId));
        const response = yield call(callApiPayment, id, buyerId);

        paymentIFrame.contentWindow.document.write(response.data);
      } else {
        openGlobalAlert(data.message || "주문에 실패했습니다.");
      }
    } catch(err) {
      openGlobalAlert("주문에 실패했습니다.");
      yield put(actions.errorReport(`requestOrder ${err}`));
    }
  }

  export function* retryOrder(action: any) {
    const {paymentIFrame} = action.payload;
    try {
      const {id, buyerId} = yield select(state => state.common.ordered);
      const response = yield call(callApiPayment, id, buyerId);
      paymentIFrame.contentWindow.document.write(response.data);
    } catch(err) {
      openGlobalAlert("주문에 실패했습니다.");
      yield put(actions.errorReport(`retryOrder ${err}`));
    }
  }

  export function* errorReport(action: any) {
    const error = action.payload;
    try {
      if (
        (typeof error === 'string' && error.includes('400')) ||
        (typeof error === 'string' && error.includes('401')) ||
        (typeof error === 'string' && error.includes('404'))
      ) {
        console.log('no report, one of 400, 401, 404');
        return;
      }
      yield call(callApiErrorReport, error);
    } catch (err) {
      console.log(err);
    }
  }

  export default function* watcher() {
    yield takeLatest(types.REQUEST_ALERT, requestAlert);
    yield takeLatest(types.REQUEST_BUYERID, requestBuyerId);
    yield takeLatest(types.REQUEST_ORDER_LIST, requestOrderList);
    yield takeLatest(types.REQUEST_ORDER, requestOrder);
    yield takeLatest(types.RETRY_ORDER, retryOrder);
    yield takeEvery(types.ERROR_REPORT, errorReport);
  }
  