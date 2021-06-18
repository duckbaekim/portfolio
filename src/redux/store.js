import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducer";
import rootSaga from "./saga";
// 개발모드에서 크롬 익스텐션으로 dev tool사용
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" ?
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
    :
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;