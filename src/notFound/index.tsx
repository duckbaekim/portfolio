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
import notFoundImage from '@assets/common/notFound.png';


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
const NotfoundImage = styled.img`
    margin-top: 140px;
    width: 100%;
    max-width: 343px;
`
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
export default function NotFound(props) {

    return (
        <Container>
            <NotfoundImage src={notFoundImage}/>
            <CloseButton>
                <Link to="/">
                    홈으로
                </Link>
            </CloseButton>
        </Container>
    )
};