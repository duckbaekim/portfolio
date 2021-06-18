import React, {ReactPropTypes, useEffect, useState} from 'react';
import styled from 'styled-components';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import {numberWithCommas} from '@utils/textHelpers';
import Info from './components/Info';
import {useHistory, useLocation} from 'react-router-dom';
import FooterButton from '@components/FooterButton';
import {callApiProductDetail} from '@api/api';
import loadingImg from '@assets/common/loading.gif'
import openGlobalAlert from '~/utils/openGlobalAlert';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    width: 100%;
    min-height: 70vh;
`;
const CarouselWrapper = styled.div`
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
const FullImage = styled.img`
  width: 100%;
  margin-bottom: 70px;
`;
const Img = styled.img`
    margin-top: 50px;
    width: 80px;
    height: auto;
    object-fit: contain;
`;
const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function DetailContainer(props: ReactPropTypes) {
    const location = useLocation();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [count, setCount] = useState(1);
    const [isEmpty, setIsEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({
        id: 0,
        images: [],
        originPrice: 0,
        promotionPrice: 0,
        name: '',
        deliveryCharge: 0,
        modelName: '',
        weight: '',
        manufacturer : '',
        detailImg: [],
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
        history.push({
            pathname: "/order",
            state: {
                count,
                id: info.id,
            }
        })
    }
    const getProductDetail = async (id) => {
        try {
            setLoading(true);
            const response = await callApiProductDetail(id);
            const {success, message, product} = response.data;
            if (success) {
                setInfo({
                    ...product,
                    images: product.mainImg,
                    modelName: product.model,
                    promotionPrice: product.price,
                });
            } else {
                setIsEmpty(true);
                openGlobalAlert(message || "판매 중인 상품이 아닙니다.");
            }
        } catch(err) {
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // axios요청으로 상품정보 받아오기
        const {id} = props.match.params;
        if (id) {
            getProductDetail(id);
        } else {
            getProductDetail(1);
        }
        delete location.state;
    }, [props.match.params]);
    useEffect(() => {
        if (isEmpty) {
            history.push("/product/notFound")
        }
    }, [isEmpty])
    const maxLength = info.images?.length > 0 ? info.images.length : 0;
    
    return (
        <Container>
            {
                loading ? <Img src={loadingImg} alt="loading" />
                :
            (
            <Content>
            <CarouselWrapper>
                <Carousel handleStepChange={handleStepChange} activeStep={activeStep} maxLength={maxLength}>
                    {info.images.map((img, i) => (
                        <CarouselItem imageUrl={img.url} key={`${img.url}${i}`}/>
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
            {
                info.detailImg.map((img, i) => {
                    return (
                        <FullImage key={`${img.url}${i}`} src={img.url} alt="상품설명 이미지" />
                    )
                })
            }
            <FooterButton text="구매하기" onClickButton={onPurchase} />
            </Content>
                    
                )
            }
        </Container>
    )
};