// 사용자와의 인터렉션에 따른 Alert
// 하단에 표시됨

import store from '@redux/store';
import {actions as commonActions} from '@redux/common/state';

export default function openGlobalAlert(message: string) {
  store.dispatch(
    commonActions.requestAlert({open: true, content: message}),
  );
}
