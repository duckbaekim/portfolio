import axios from 'axios';
import actions from '@redux/common/state';
import store from '~/redux/store';

// const state = store.getState();

// const url = 'https://apinodev2.caroom.co.kr';
// const url = 'https://node.dev.caroom.co.kr/v2';
// console.log(__DEV__ ? 'development mode' : 'production mode');
// const url = __DEV__
//   ? 'http://10.10.11.228:5001'
//   : 'https://apinodev2.caroom.co.kr';
const url = 'https://apinodev2.caroom.co.kr';
//
// const url = 'http://10.10.11.228:5001';
const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(async (request) => {
  // console.log(request);
  // token 체크
  const access_token = window.localStorage.getItem('access_token');
  // fcmKey 설정
  // request.headers['access-control-allow-origin'] = '*';
  if (access_token) {
    request.headers.Authorization = `Bearer ${access_token}`;
  }
  return request;
});
// instance.defaults.validateStatus = () => true;
instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const errorAPI = error.config;
    const {url, status} = errorAPI;
    const {message} = error;

    // console.log(
    //   errorAPI,
    //   url,
    //   status,
    //   error.status,
    //   error.response?.data.statusCode,
    //   message,
    //   'interceptor error',
    // );
    if (
      (error.response?.data.statusCode === 401 ||
        message === 'Request failed with status code 401') &&
      errorAPI.retry === undefined &&
      url !== '/account/login'
    ) {
      errorAPI.retry = true;
      const access_token = await refreshToken();
      if (access_token) {
        // console.log('access_token 재발급 성공');
        errorAPI.headers.Authorization = `Bearer ${access_token}`;
        // store.dispatch(actions.setIsLoggedIn(true));
        errorAPI.retry = undefined;
      } else {
        // store.dispatch(actions.setIsLoggedIn(false));
      }
      return await instance(errorAPI);
    }
    return Promise.reject(error);
  },
);

const refreshToken = async () => {
  // console.log('refreshToken');
  const refresh_token = window.localStorage.getItem('refresh_token');
  const id = window.localStorage.getItem('id');
  try {
    if (refresh_token && id) {
      const params = {
        id,
        refresh_token,
      };
      // console.log(instance, 'instance');
      const resData = await instance.post('/account/refreshToken', params);
      // console.log(resData.status, ' ************************** resData.status');
      if (resData.status === 201) {
        const {data} = resData;
        // console.log(data, '****************************** data retoken');
        // store.dispatch(actions.setIsLoggedIn(true));
        window.localStorage.setItem('access_token', data.access_token);
        window.localStorage.setItem('id', String(id));
        // console.log(data.access_token, 'access_token 갱신');
        return data.access_token;
      }
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('refresh_token');
      window.localStorage.removeItem('id');
      return null;
    }
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('id');
    return null;
  } catch (err) {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('id');
    return null;
  }
};

export default instance;
