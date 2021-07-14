import React from 'react';
import styled, { css } from 'styled-components';
import {numberWithCommas, getRate} from '@utils/textHelpers';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;
const defaultPadding = css`
    width: 100%;
    padding: 0 16px;
    display: flex;
`;
const Title = styled.div`
    ${defaultPadding};
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 9px;
`;

interface Props{
   originPrice: number | string;
   promotionPrice: number | string;
   name: string;
   deliveryCharge: number;
   modelName: string;
   weight: string;
   manufacturer: string;
}
export default function Info(props:Props) {
    const {name, originPrice, promotionPrice, ...detailData} = props;
    return (
        <Container>
            <Title>{name}</Title>
            <PriceBox originPrice={originPrice} promotionPrice={promotionPrice}/>
            <DetailInfo {...detailData} />
        </Container>
    )
};


/********* 가격정보 **********/

const PriceWrapper = styled.div`
    ${defaultPadding};
    flex-direction: column;
    font-size: 15px;
    line-height: 22px;
`;
const Red = styled.span`
    font-weight: 500;
    color: rgb(204, 38, 38);
`;
const LineThrough = styled.span`
    margin-left: 5px;
    color: rgb(147, 147,147);
    text-decoration: line-through;
`;
const CaroomPrice = styled.div`
    width: 170px;
    height: 32px;
    display: flex;
    margin-bottom: 23px;
    margin-top: 5px;
    & > div:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(255, 225 ,0);
        width: 50%;
        height: 100%;
        font-size: 13px;
    }
    & > div:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 100%;
        font-weight: 500;
        border: 1px solid rgb(255, 225 ,0);
    }
`;
interface PriceProps{
    originPrice: string | number;
    promotionPrice: string | number;
};
export function PriceBox({originPrice, promotionPrice}: PriceProps) {
    const rate = getRate(originPrice, promotionPrice);
    return (
        <PriceWrapper>
            <div>
            <Red>-{rate}%</Red>
            <LineThrough>({numberWithCommas(Number(originPrice))})원</LineThrough>
            </div>
            <CaroomPrice>
                <div>카룸혜택가</div>
                <div>{numberWithCommas(Number(promotionPrice))}원</div>
            </CaroomPrice>
        </PriceWrapper>
    )
}


/********* 상품 세부정보 **********/

const DetailContainer = styled.div`
    border-top: 1px solid rgb(217, 217, 217);
    border-bottom: 1px solid rgb(217, 217, 217);
    padding: 15px 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const Field = styled.div`
    width: 100%;
    display: flex;
    height: 36px;
    font-size: 12px;
    & > div:first-child {
        width: 100px;
        display: flex;
        align-items:center;
        height: 100%;
    }
    & > div:last-child {
        display: flex;
        align-items:center;
        height: 100%;
        word-break: keep-all;
    }
`;
interface DetailProps{
    deliveryCharge: number;
    modelName: string;
    weight: string;
    manufacturer: string;
}
export function DetailInfo(props: DetailProps) {
    const { modelName, weight, manufacturer} = props;
    return (
        <DetailContainer>
            <Field>
                <div>배송비</div>
                <div>무료배송</div>
            </Field>
            <Field>
                <div>모델명</div>
                <div>{modelName}</div>
            </Field>
            <Field>
                <div>제조사</div>
                <div>{manufacturer}</div>
            </Field>
            <Field>
                <div>상품무게</div>
                <div>{weight}</div>
            </Field>
        </DetailContainer>
    )
}