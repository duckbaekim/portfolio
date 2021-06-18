import React, {ReactPropTypes, useEffect, useState} from 'react';
import styled from 'styled-components';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import {numberWithCommas} from '@utils/textHelpers';
import Info from './components/Info';
import {useHistory} from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
`;
const CarouselWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: block;
`;
const CounterWrapper = styled.div`
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 50px;
`;
const Counter = styled.div`
  height: 28px;  
  border: 1px solid black;
  font-size: 15px;
  display: flex;
      line-height: 22px;
  & > div:nth-child(1) {
      width: 28px;
      height: 100%;
      border-right: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
          background-color: rgb(240, 240, 240);
      }
  }
  & > div:nth-child(2) {
    width: 44px;
    display: flex;
      justify-content: center;
      align-items: center;
  }
  & > div:nth-child(3) {
    width: 28px;
      height: 100%;
      border-left: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
          background-color: rgb(240, 240, 240);
      }
  }
`;
const FinalPrice = styled.div`
    font-size: 20px;
    font-weight: 400;
  line-height: 29px;
`;
const FooterButton = styled.div`
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: rgb(255, 225, 0);
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FullImage = styled.img`
  width: 100%;
  margin-bottom: 70px;
`;

const DUMMYDATA = {
    id: 0,
    images: ["https://caroom-storage.s3.ap-northeast-2.amazonaws.com/class_image/1000/%230F0F0F.png", "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/class_image/1000/%230F0F0F.png", "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/class_image/1000/%230F0F0F.png", "https://caroom-storage.s3.ap-northeast-2.amazonaws.com/class_image/1000/%230F0F0F.png"],
    originPrice: '158000',
    promotionPrice: '127800',
    modelName: 'SGPA350A(B)',
    weight: '126g',
    name: '컴투게더 공기살균기',
    deliveryCharge: '0원 / 주문시 결제 / 택배',
    manufacturer : '스마트구루(주)',
    fullImage: 'https://caroom-storage.s3.ap-northeast-2.amazonaws.com/productImage/caroomDealerGoodsDetail/ad_caroomDeal.png',
}
export default function DetailContainer(props: ReactPropTypes) {
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [count, setCount] = useState(1);
    const [info, setInfo] = useState({
        id: 0,
        images: [],
        originPrice: '',
        promotionPrice: '',
        name: '',
        deliveryCharge: '',
        modelName: '',
        weight: '',
        manufacturer : '',
        fullImage: '',
    });
    const handleStepChange = (step: any) => {
        setActiveStep(step);
    };
    const onAddCount = () => {
        setCount(count + 1);
    }
    const onSubtractCount = () => {
        setCount(count - 1 > 0 ? count -1 : 1);
    }
    const onPurchase = () => {
        console.log({...info} , count , "구매하기 누름");
        console.log(info.promotionPrice * count, "가격");
        // 상품아이디, 갯수 넘김
        history.push("/order", {
            count,
            id,
        })
    }

    useEffect(() => {
        // axios요청으로 상품정보 받아오기
        const {id} = props.match.params;
        console.log(props.match.params, "match.params");
        // 더미데이터 
        setInfo({...DUMMYDATA});
    }, [])
    const maxLength = info.images?.length > 0 ? info.images.length : 0;
    return (
        <Container>
            <CarouselWrapper>
                <Carousel handleStepChange={handleStepChange} activeStep={activeStep} maxLength={maxLength}>
                    {info.images.map((url, i) => (
                        <CarouselItem imageUrl={url} key={`url${i}`}/>
                    ))}
                </Carousel>
            </CarouselWrapper>
            <Info {...info} />
            <CounterWrapper>
                        <Counter>
                        <div onClick={onSubtractCount}>-</div>
                        <div>{count}</div>
                        <div onClick={onAddCount}>+</div>
                        </Counter>
                        <FinalPrice>
                            { numberWithCommas(Number(info.promotionPrice) * count)}원
                        </FinalPrice>
            </CounterWrapper>
            <FullImage src={info.fullImage} alt="상품설명 이미지" />
            <FooterButton onClick={onPurchase}>
                구매하기
            </FooterButton>
        </Container>
    )
};