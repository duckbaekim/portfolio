import { useEffect, useState } from "react";
import styled from "styled-components";
import logoImage2 from "@assets/common/logo_2.png";
import mediumLogoImage from "@assets/common/mediumLogo.png";
import smallLogoImage from "@assets/common/smallLogo.png";
import xsmallLogoImage from "@assets/common/xsmallLogo.png";
import bigHamburgerImage from "@assets/common/bigHamburger.png";
import smallHamburgerImage from "@assets/common/smallHamburger.png";

/**
 * GNB 영역 styled-components
 */
const GNB = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 1299;
  display: flex;
  flex-direction: row;
  transition: all 0.5s ease;
  transition-delay: 0.3s;
  top: 0;
  background-color: white;
  @media (max-width: 1920px) {
    height: 44px;
  }
`;

/**
 * GNB 로고 영역 styled-components
 */
const GNBLogoWrap = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 40px;
  cursor: pointer;
  @media (max-width: 1024px) {
    padding-left: 20px;
  }
`;

const GNBLogoImg = styled.div`
  width: 72px;
  height: 28px;
  transition: all 0.5s ease;
  transition-delay: 0.3s;
  background-image: url(${logoImage2});
  background-position: center;
  background-size: cover;
  @media (max-width: 1920px) {
    background-image: url(${mediumLogoImage});
    width: 55px;
    height: 25px;
  }
  @media (max-width: 1024px) {
    background-image: url(${smallLogoImage});
    width: 40px;
    height: 18px;
  }
  @media (max-width: 768px) {
    background-image: url(${xsmallLogoImage});
    width: 32px;
    height: 15px;
  }
`;

const GNBNaviWrap = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-end;
  align-items: center;
`;
const GNBNaviLinkWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
  @media (max-width: 1024px) {
    padding-right: 20px;
  }
`;
const GNBNaviLink = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  white-space: nowrap;
  cursor: pointer;
  & > span {
    font-size: 15px;
    @media (max-width: 1920px) {
      font-size: 12px;
    }
    @media (max-width: 1280px) {
      font-size: 11px;
    }
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
const GNBHamburger = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    width: 24px;
    height: 24px;
    background-image: url(${bigHamburgerImage});
    background-size: cover;
  }
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    background-image: url(${smallHamburgerImage});
  }
`;
export default function Header() {
  const naviLink = [
    {
      name: "주문하기",
      link: "/order",
    },
    {
      name: "주문내역",
      link: "/order/list",
    }
  ];



  return (
    <GNB>
      <GNBLogoWrap>
        <GNBLogoImg />
      </GNBLogoWrap>
      <GNBNaviWrap>
        <GNBNaviLinkWrap>
          <GNBHamburger />
          {naviLink.map((el: any, i: number) => {
            return (
              <GNBNaviLink
                key={`navLink_${el}_${i}`}
              >
                <span>{el.name}</span>
              </GNBNaviLink>
            );
          })}
        </GNBNaviLinkWrap>
      </GNBNaviWrap>
    </GNB>
  );
}
