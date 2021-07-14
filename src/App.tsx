import React, {useEffect} from 'react';
import styled, {createGlobalStyle, css} from 'styled-components';
import reset from 'styled-reset';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {useDispatch, useSelector} from 'react-redux';
import {actions as commonActions} from '@redux/common/state';
import Header from '@components/Header';
import SideNavigator from '@common/components/SideNavigator';
import fontcss from '@assets/font/font.css';

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

const AppContainer = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
`;

// useHistory 훅을 사용하기위해 createBrowserHistory로 생성한 객체를 Router객체에 삽입
const history = createBrowserHistory();
function App() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <>
      <GlobalFontStyle />
      <GlobalStyle />
      <Router history={history}>
        <Header />
        <SideNavigator />
        <AppContainer>
          <Switch />
        </AppContainer>
        {/* <Route path="/" exact component={Footer} /> */}
      </Router>
    </>
  );
}

export default App;
