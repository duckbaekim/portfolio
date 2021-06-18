import React, { useEffect } from 'react';
import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from 'history';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { actions as commonActions } from '@redux/common/state';
import Header from '@components/Header';
import fontcss from "@assets/font/font.css";
import DetailContainer from './detail/Container';
import OrderListContainer from './orderList/Container';

const GlobalFontStyle = createGlobalStyle`
  * {
    text-decoration: none;
  }
  body {
    font-family: "Noto Sans KR", "Malgun Gothic" !important;
    font-weight: 300;
  }
`;
const GlobalStyle = createGlobalStyle`
  ${reset};
  ${fontcss};
  * {
    box-sizing : border-box;
  }
  section {
    padding-top: 80px;
  }
  .MuiMobileStepper-dotActive {
      background-color: rgb(255, 225, 0) !important;
  }
  .MuiMobileStepper-dot {
    margin: 0 6px !important;
  }
  .MuiMobileStepper-root {
    background: transparent !important;
  }
`;
// max-width: 768까지 지원
const AppContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  position: relative;
`;

// useHistory 훅을 사용하기위해 createBrowserHistory로 생성한 객체를 Router객체에 삽입
const history = createBrowserHistory();
function App() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state:RootStateOrAny) => state.common);
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("access_token");
    console.log(isLoggedIn, "window.localStroage getItem access_token")
    // check login 로직 추가
    dispatch(commonActions.setIsLoggedIn(true));
  }, []);
  return (
    <React.Fragment>
      <GlobalFontStyle />
      <GlobalStyle />
      <Router history={history}>
      <Header />
        {/* <Switch>
          <Route path="/" exact component={SwitchContainer} />
        </Switch> */}
        <AppContainer>
          <Switch>
            <Route
              path="/detail/:id"
              component={DetailContainer}
              exact
            />
            <Route
              path="/order/list"
              component={OrderListContainer}
            />
            <Route
              path="/order"
              component={OrderListContainer}
            />
          </Switch>
        </AppContainer>
        {/* <Route path="/" exact component={Footer} /> */}
      </Router>
    </React.Fragment>
  );
}

export default App;