import React, { useEffect } from 'react';
import styled, { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from 'history';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import { actions as commonActions } from '@redux/common/state';

const GlobalFontStyle = createGlobalStyle`
`;
const GlobalStyle = createGlobalStyle`
  ${reset};
  @font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  };
  * {
    box-sizing : border-box;
    text-decoration: none;
    font-family: 'S-CoreDream-3Light' !important;
  }
  body {
    background-color: rgb(249, 249, 249);
  }
  section {
    padding-top: 80px;
  }
`;
const AppContainer = styled.div`
  max-width: 1300px;
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
      <div> redux common module  isLoggedIn state ? : {isLoggedIn.toString()}</div>
      <Router history={history}>
        {/* <Switch>
          <Route path="/" exact component={SwitchContainer} />
        </Switch> */}
        <AppContainer>
          <Switch>
            {/* <Route
              path="/place/:contenttypeid/:contentid"
              component={DetailPage}
            /> */}
          </Switch>
        </AppContainer>
        {/* <Route path="/" exact component={Footer} /> */}
      </Router>
    </React.Fragment>
  );
}

export default App;