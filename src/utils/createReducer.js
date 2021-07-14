import produce, {enableES5} from 'immer';
// createReducer는 reducer 생성자 함수
// reducer를 리턴한다.
// reducer는 immer패키지의 produce메서드를 이용해서
// action에 따라 store의 상태를 불변객체로 변경한다.
export default function createReducer(initialState: any, handlerMap: any) {
  enableES5();
  return function (state = initialState, action: any) {
    return produce(state, (draft: any) => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}
