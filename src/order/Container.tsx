import React, {
  ReactEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled, {css} from 'styled-components';
import {useLocation, useHistory, Router} from 'react-router-dom';
import TextInput from '@common/components/TextInput';
import GoodsItem from '@common/components/GoodsItem';
import InputTitle from '@common/components/InputTitle';
import TermSet from '@common/components/TermSet';
import FooterButton from '@components/FooterButton';
import Timer from '@common/components/Timer';
import {validateAndGetMessage} from '@utils/validateRules';
import openGlobalAlert from '@utils/openGlobalAlert';
import DaumPostcode from 'react-daum-postcode';
import {
  callApiProductDetail,
  callApiConfirmCert,
  callApiSendCert,
  callApiPayment,
} from '@api/api';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '@redux/common/state';
import store from '@redux/store';
import Modal from '~/common/components/Modal';
import {numberWithCommas} from '~/utils/textHelpers';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 100px 0;
  padding: 0 16px;
  width: 100%;
`;
const defaultPadding = css`
  padding: 0 16px;
  width: 100%;
  display: flex;
`;
const Header = styled.div`
  ${defaultPadding};
  padding-bottom: 8px;
  border-bottom: 1px solid rgb(112, 112, 112);
`;
const HeaderText = styled.div`
  width: 100%;
  font-size: 15px;
  line-height: 22px;
  font-weight: 400;
`;
const HeaderTextWithTopMargin = styled(HeaderText)`
  margin-top: 37px;
`;
const PriceInfo = styled.div`
  padding: 0 15px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(242, 242, 242);
  height: 57px;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 15px;
`;
const GrayText = styled.span`
  color: rgb(157, 157, 157);
`;
const BoldText = styled.span`
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const InputWrapperSingle = styled.div`
  width: 100%;
  margin-top: 8px;
`;
const BlackButton = styled.div`
  width: 105px;
  margin-left: 5px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  letter-spacing: -0.3px;
  background-color: black;
  color: white;
  cursor: pointer;
`;
const WhiteButton = styled(BlackButton)`
  border: 1px solid black;
  background-color: white;
  color: black;
`;
const GrayDivider = styled.div`
  width: 100%;
  margin-top: 42px;
  border-bottom: 1px solid rgb(230, 230, 230);
`;
const GrayDividerNoMargin = styled(GrayDivider)`
  margin-top: 0px;
`;
const RadioGroup = styled.div`
  width: 100%;
  max-width: 260px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & > div {
    display: flex;
    align-items: center;
  }
`;
const Radio = styled.input`
  color: black;
  appearance: none;
  cursor: pointer;
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin: auto 0;
  &:checked {
    background-color: black;
  }
  &:after {
    content: '';
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    width: 14px;
    height: 14px;
    border-radius: 100%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Label = styled.label`
  font-size: 12px;
  line-height: 18px;
  color: black;
  vertical-align: middle;
  align-self: center;
  font-weight: 300;
  margin-left: 10px;
`;
const PayInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const PayInfoLine = styled.div`
  width: 100%;
  display: flex;
  font-weight: 300;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 12.6px;
  letter-spacing: -0.3px;
  padding: 10px 0;
`;
const DottedDivider = styled.div`
  width: 100%;
  border-bottom: 1px dashed rgb(112, 112, 112);
  margin: 10px 0;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 600px;
`;

type CertStatus = 'INIT' | 'WAIT' | 'COMPLETE';
export default function OrderContainer(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const payRef = useRef();
  if (!location.state) history.push('/');
  const [info, setInfo] = useState({
    id: 0,
    images: [],
    originPrice: 0,
    promotionPrice: 0,
    name: '',
    detailName: '',
    deliveryFee: 0,
  });
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [cert, setCert] = useState('');
  const [certId, setCertId] = useState('');
  const [certStatus, setCertStatus] = useState<CertStatus>('INIT');
  const [deliveryInputMethod, setDeliveryInputMethod] = useState('self');
  const [receiverName, setReceiverName] = useState('');
  const [postcodeModal, setPostcodeModal] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [receiverContact, setReceiverContact] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const [payModal, setPayModal] = useState(false);

  // 상품 id, 갯수
  const id = location.state?.id;
  const count = location.state?.count;
  const diff = info.originPrice - info.promotionPrice;
  const orderId = useSelector((state) => state.common.ordered.id);

  // 비동기 API함수
  const getProductDetail = async (id) => {
    const response = await callApiProductDetail(id);
    const {success, product} = response.data;
    if (success) {
      setInfo({
        ...product,
        images: product.mainImg,
        modelName: product.model,
        originPrice: product.originPrice * count,
        promotionPrice: product.price * count,
        deliveryFee: 0,
      });
    }
  };
  const sendCert = async () => {
    try {
      const response = await callApiSendCert(contact);
      const {status, certId: receivedCertId, message} = response.data;
      if (status) {
        setCertId(receivedCertId);
        setCertStatus('WAIT');
        setShowTimer(false);
        setShowTimer(true);
      }
      openGlobalAlert(message);
    } catch (err) {
      openGlobalAlert(
        err.response?.data?.message || '인증번호 확인에 실패했습니다.',
      );
    }
  };
  const confirmCert = async () => {
    try {
      const response = await callApiConfirmCert(contact, cert);
      const {success, message} = response.data;
      if (success) {
        setCertStatus('COMPLETE');
        setShowTimer(false);
      }
      openGlobalAlert(message);
    } catch (err) {
      openGlobalAlert(
        err.response.data?.message || '인증번호 확인에 실패했습니다.',
      );
    }
  };
  const submitOrder = () => {
    dispatch(
      actions.requestOrder({
        productId: id,
        count,
        buyerName: name,
        buyerPhone: contact,
        receiverName: deliveryInputMethod === 'same' ? name : receiverName,
        receiverPhone:
          deliveryInputMethod === 'same' ? contact : receiverContact,
        newAddress: address,
        detailAddress: addressDetail,
        postCode: postcode,
        paymentIFrame: payRef.current,
      }),
    );
  };
  const retryOrder = () => {
    if (!payRef.current) {
      setTimeout(() => {
        retryOrder();
      }, 300);
      return;
    }
    dispatch(
      actions.retryOrder({
        paymentIFrame: payRef.current,
      }),
    );
    delete location.state;
  };

  const handleSendCert = () => {
    if (certStatus === 'COMPLETE') return;
    const invalidMessage = [validateAndGetMessage('phone', contact)].filter(
      (v) => v,
    );
    if (invalidMessage[0]) {
      openGlobalAlert(invalidMessage[0]);
      return;
    }
    sendCert();
  };
  const handleConfirmCert = () => {
    if (certStatus !== 'WAIT') return;
    confirmCert();
  };
  const onCheckInputMethod = (e: React.MouseEvent<HTMLInputElement>) =>
    setDeliveryInputMethod(e.target.value);
  const getInvalidMessage = () => {
    const invalidMessages = [
      !name && '이름을 입력해주세요.',
      certStatus !== 'COMPLETE' && '휴대폰번호 인증을 완료해주세요.',
      deliveryInputMethod === 'self' &&
        !receiverName &&
        '받는 분 이름을 입력해주세요.',
      (!postcode || !address) &&
        '우편번호 검색버튼을 눌러 주소를 입력해주세요.',
      !addressDetail && '상세주소를 입력해주세요.',
      deliveryInputMethod === 'self' &&
        !receiverContact &&
        '받는 분 휴대폰 번호를 입력해주세요.',
      !agreeAll && '약관에 모두 동의해주세요.',
    ].filter((v) => v);
    return invalidMessages[0];
  };
  const onPurchase = () => {
    const invalidMessage = getInvalidMessage();
    if (invalidMessage) {
      openGlobalAlert(invalidMessage);
    } else {
      openPayModal();
      setTimeout(() => {
        submitOrder();
      }, 1000);
    }

    // 테스트코드 : 즉시결제가능
    // (async function() {
    //     openPayModal();
    //     const response = await callApiPayment(46, 2);
    //     payRef.current.contentWindow.document.write(response.data);
    // })()

    // 테스트코드: paySuccess 파라미터
    // history.push({
    //     pathname: "/pay/fail",
    //     state: {
    //         message: "직접 결제를 취소했습니다."
    //     }
    // })
  };
  const onCertTimeEnd = () => {
    setShowTimer(false);
    setCertStatus('INIT');
  };
  const onPostApiEnd = (data: any) => {
    closePostcodeModal();
    setAddress(data.roadAddress);
    setPostcode(data.zonecode);
  };
  const openPostcodeModal = () => setPostcodeModal(true);
  const closePostcodeModal = () => setPostcodeModal(false);
  const openPayModal = () => setPayModal(true);
  const closePayModal = () => setPayModal(false);

  useEffect(() => {
    getProductDetail(id);
  }, [id, count]);
  useEffect(() => {
    if (!location.state) {
      history.push('/');
    } else {
      //  결제실패 --> 다시 결제하기
      if (location.state.retry) {
        openPayModal();
        // 리펙토링 필요 재귀함수 --> 테스트
        retryOrder();
      }
    }
  }, [location]);

  // 결제 성공 / 실패 시 함수
  useEffect(() => {
    const event = window.addEventListener('message', (e) => {
      // react-devtools 무시
      if (e.data?.source?.includes('react-devtools')) return;
      const {status, message} = JSON.parse(e.data);
      history.push({
        pathname: `/pay/${status}`,
        state: {
          message,
        },
      });
    });
    return () => window.removeEventListener('message', event);
  }, []);
  return (
    <Container>
      <Header>
        <HeaderText>주문하기</HeaderText>
      </Header>
      <GoodsItem {...info} count={count} image={info.images[0]?.url} />
      <PriceInfo>
        <span>
          총 상품금액 &nbsp;
          <GrayText>
            ({numberWithCommas(info.originPrice)}원 - {numberWithCommas(diff)}
            원)
          </GrayText>
        </span>
        <BoldText>{numberWithCommas(info.promotionPrice)}원</BoldText>
      </PriceInfo>

      <HeaderText>주문자 정보</HeaderText>
      <InputTitle title="주문자 이름" isReqiured>
        <TextInput
          value={name}
          setValue={setName}
          placeholder="이름을 입력해주세요."
          size="small"
        />
      </InputTitle>
      <InputTitle title="휴대폰번호" isReqiured>
        <InputWrapper>
          <TextInput
            value={contact}
            setValue={setContact}
            type="number"
            placeholder="'-'를 빼고 입력해주세요."
            size="small"
            disabled={certStatus === 'COMPLETE'}
          />
          {showTimer && <Timer mm="03" ss="00" onZero={onCertTimeEnd} />}
          <BlackButton onClick={handleSendCert}>
            {certStatus === 'INIT'
              ? '인증받기'
              : certStatus === 'WAIT'
              ? '재요청'
              : '인증완료'}
          </BlackButton>
        </InputWrapper>
      </InputTitle>
      <InputTitle title="인증번호">
        <InputWrapper>
          <TextInput
            value={cert}
            setValue={setCert}
            type="number"
            placeholder="인증번호를 입력해주세요."
            size="small"
            disabled={certStatus === 'COMPLETE'}
          />
          <WhiteButton onClick={handleConfirmCert}>확인</WhiteButton>
        </InputWrapper>
      </InputTitle>
      <GrayDivider />

      <HeaderTextWithTopMargin>배송 정보</HeaderTextWithTopMargin>
      <RadioGroup>
        <div>
          <Radio
            type="radio"
            id="self"
            value="self"
            readOnly
            checked={deliveryInputMethod === 'self'}
            onClick={onCheckInputMethod}
          />
          <Label for="self"> 직접 입력</Label>
        </div>
        <div>
          <Radio
            type="radio"
            id="same"
            value="same"
            readOnly
            checked={deliveryInputMethod === 'same'}
            onClick={onCheckInputMethod}
          />
          <Label for="same"> 주문자정보와 동일 </Label>
        </div>
      </RadioGroup>
      <InputTitle title="받는 분" isReqiured>
        <TextInput
          value={deliveryInputMethod === 'same' ? name : receiverName}
          setValue={setReceiverName}
          placeholder="이름을 입력해주세요."
          size="small"
        />
      </InputTitle>
      <InputTitle title="배송지" isReqiured>
        <InputWrapper>
          <TextInput
            value={postcode}
            setValue={setPostcode}
            disabled
            size="small"
          />
          <BlackButton onClick={openPostcodeModal}>우편번호 검색</BlackButton>
        </InputWrapper>
      </InputTitle>
      <InputWrapperSingle>
        <TextInput
          value={address}
          setValue={setAddress}
          disabled
          size="small"
        />
      </InputWrapperSingle>
      <InputWrapperSingle>
        <TextInput
          value={addressDetail}
          setValue={setAddressDetail}
          placeholder="상세 주소를 입력해주세요."
          size="small"
        />
      </InputWrapperSingle>
      <InputTitle title="휴대폰번호" isReqiured>
        <InputWrapper>
          <TextInput
            value={deliveryInputMethod === 'same' ? contact : receiverContact}
            setValue={setReceiverContact}
            placeholder="'-'를 빼고 입력해주세요."
            size="small"
          />
        </InputWrapper>
      </InputTitle>
      <GrayDivider />

      <HeaderTextWithTopMargin>결제</HeaderTextWithTopMargin>
      <RadioGroup>
        <div>
          <Radio type="radio" id="card" value="card" checked />
          <Label for="card"> 신용카드 </Label>
        </div>
      </RadioGroup>
      <GrayDividerNoMargin />
      <PayInfoWrapper>
        <PayInfoLine>
          <span>상품금액</span>
          <span>{numberWithCommas(info.originPrice)}원</span>
        </PayInfoLine>
        <PayInfoLine>
          <span>할인금액</span>
          <span>
            {numberWithCommas(info.originPrice - info.promotionPrice)}원
          </span>
        </PayInfoLine>
        <DottedDivider />
        <PayInfoLine>
          <span>결제금액</span>
          <span>{numberWithCommas(info.promotionPrice)}원</span>
        </PayInfoLine>
      </PayInfoWrapper>
      <TermSet agreeAll={agreeAll} setAgreeAll={setAgreeAll} />
      <Modal display={postcodeModal} onClickClose={closePostcodeModal}>
        <DaumPostcode onComplete={onPostApiEnd} height="480px" />
      </Modal>
      <Modal display={payModal} onClickClose={closePayModal} title="결제하기">
        {/* payModal을 언마운트 시키지 않으면, iframe에 origin속성이 inicis로 남아있어 보안에러 발생 */}
        {/* 키고 끌 때마다 새로 마운트 시켜서 origin을 우리 앱의 주소로 초기화 */}
        {payModal && <Iframe ref={payRef} title="상품결제" />}
      </Modal>
      <FooterButton text="구매하기" onClickButton={onPurchase} />
    </Container>
  );
}
