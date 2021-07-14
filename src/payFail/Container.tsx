import React, { ReactEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import {useLocation, useHistory, Link, Router} from 'react-router-dom';
import TextInput from '@common/components/TextInput';
import GoodsItem from '@common/components/GoodsItem';
import InputTitle from '@common/components/InputTitle';
import TermSet from '@common/components/TermSet';
import FooterButton from '@components/FooterButton';
import {phoneNumberhipun, numberWithCommas} from '@utils/textHelpers';


const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 50px;
    padding: 0 16px 70px;
    width: 100%;
    min-height: calc(100vh - 60px);
    background-color: rgb(250, 250, 250);
`;
const alignCenter = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TopText = styled.div`
    ${alignCenter};
    margin-top: 25px;
    font-size: 15px;
    line-height: 22px;
    text-align: center;
`;
const NormalText = styled.div`
    font-size: 12px;
    line-height: 18px;
    font-weight: 300;
`;
const NormalTextCenter = styled(NormalText)`
    ${alignCenter}
    text-align: center;
    margin-top: 16px;
`;
const NormalTextBold = styled(NormalText)`
    font-weight: 400;
    margin-right: 18px;
`;
const KeyText = styled.div`
    width: 100px;
    font-size: 13px;
    line-height: 19px;
`;
const OrderInfoBox = styled.div`
    ${alignCenter};
    flex-direction: column;
    align-items: flex-start;
    margin-top: 42px;
    padding: 16px 18px;
    border: 1px solid rgb(217, 217, 217);
`;
const TextLineWrapper = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
`;
const ButtonWrap = styled.div`
    width: 100%;
    margin: 200px 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Button = styled.div`
    width: 100%;
    height: 50px;
    background-color: rgb(255, 225, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    letter-spacing: -0.38px;
    font-weight: 300;
`;
const CloseButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-size: 12px;
    padding: 5px 10px;
    line-height: 18px;
    text-decoration: underline;
    font-weight: 300;
    & > a {
        text-decoration: none;
    }
`;
export default function OrderContainer(props) {
    const location = useLocation();
    const history = useHistory();
    if (!location.state) {
        history.push("/")
    }

    const onClickRetry = () => {
        history.push({
            pathname: "/order",
            state: {
                retry: true,
            }
        });  
    }
    return (
        <Container>
            <TopText>
                상품 결제가 정상적으로 <br/>
                처리되지 않았습니다.
            </TopText>
            <NormalTextCenter>
                이용에 불편을 드려 죄송합니다. 결제를 다시 진행해주세요. <br />
                계속 결제에 실패할 경우 고객센터(1811-0804)로 문의해주세요.
            </NormalTextCenter>

            <OrderInfoBox>
                <TextLineWrapper>
                    <NormalTextBold>실패사유</NormalTextBold>
                    <NormalText>{location.state?.message || ""}</NormalText>
                </TextLineWrapper>
            </OrderInfoBox>
            <ButtonWrap>
                <Button onClick={onClickRetry}>
                    다시 시도
                </Button>
            </ButtonWrap>
            <CloseButton>
                <Link to="/">
                    닫기
                </Link>
            </CloseButton>
        </Container>
    )
};