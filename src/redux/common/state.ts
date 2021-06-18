import createReducer from '@utils/createReducer';

export const types = {
  // 알림 창
  REQUEST_ALERT: 'common/REQUEST_ALERT',
  SET_ALERT: 'common/SET_ALERT',
  
  // 로그인 상태
  SET_ISLOGGEDIN: 'common/SET_ISLOGGEDIN',

  // 주문자 정보
  REQUEST_BUYERID: "common/REQUEST_BUYERID",
  SET_NAME: "common/SET_NAME",
  SET_CONTACT: "common/SET_CONTACT",
  SET_BUYERID: "common/SET_BUYERID",

  // 주문 정보
  REQUEST_ORDER_LIST: "common/REQUEST_ORDER_LIST",
  SET_ORDER_LIST: "common/SET_ORDER_LIST",

  // 주문하기
  REQUEST_ORDER: 'common/REQUEST_ORDER',
  RETRY_ORDER: 'common/RETRY_ORDER',
  SET_ORDERED_DATA: 'common/SET_ORDERED_DATA',

  // ERROR_REPORT
  ERROR_REPORT: 'common/ERROR_REPORT',
};

interface AlertPayload {
  open: boolean;
  content: string;
  bottom?: number;
}
export const actions = {
  requestAlert: (payload: AlertPayload) => ({
    type: types.SET_ALERT,
    payload,
  }),
  setAlert: (payload: AlertPayload) => ({
    type: types.SET_ALERT,
    payload,
  }),
  requestBuyerId: (payload: any) => ({
    type: types.REQUEST_BUYERID,
    payload,
  }),
  setName: (payload: any) => ({
    type: types.SET_NAME,
    payload,
  }),
  setContact: (payload: any) => ({
    type: types.SET_CONTACT,
    payload,
  }),
  setBuyerId: (payload: any) => ({
    type: types.SET_BUYERID,
    payload,
  }),
  requestOrderList: (payload: any) => ({
    type: types.REQUEST_ORDER_LIST,
    payload,
  }),
  setOrderList: (payload: any) => ({
    type: types.SET_ORDER_LIST,
    payload,
  }),
  requestOrder: (payload: any) => ({
    type: types.REQUEST_ORDER,
    payload,
  }),
  setOrderedData: (payload: any) => ({
    type: types.SET_ORDERED_DATA,
    payload,
  }),
  retryOrder: (payload: any) => ({
    type: types.RETRY_ORDER,
    payload,
  }),
  errorReport: (payload: any) => ({
    type: types.ERROR_REPORT,
    payload,
  }),
};
export const INITIAL_STATE = {
  name: "",
  contact: "",
  buyerId: "",
  alert: {
    open: false,
    content: '',
  },
  list: [],
  ordered: {
    orderNum: "",
    buyerId: 0,
    addressId: 0,
    productId: 0,
    productNum: 0,
    deliveryFee: 0,
    totalPrice: 0,
    payStatus: "",
    id: 0
  },
};

interface AlertAction {
  type: string;
  payload: AlertPayload;
}

const reducer = createReducer(INITIAL_STATE, {
  [types.SET_ALERT]: (state: any, action: AlertAction) => {
    state.alert = action.payload;
  },
  [types.SET_NAME]: (state: any, action: any) => {
    state.name = action.payload;
  },
  [types.SET_CONTACT]: (state: any, action: any) => {
    state.contact = action.payload;
  },
  [types.SET_BUYERID]: (state: any, action: any) => {
    state.buyerId = action.payload;
  },
  [types.SET_ORDER_LIST]: (state: any, action: any) => {
    state.list = action.payload;
  },
  [types.SET_ORDERED_DATA]: (state: any, action: any) => {
    state.ordered = action.payload;
  },
});

export default reducer;
