import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

/**
 * GNB 영역 styled-components
 */
const Container = styled.div``;

export default function SideNavigator() {
  const history = useHistory();
  // 상품리스트 추가시 하드코딩된 path 수정필요
  const naviLink = [
    {
      name: '주문하기',
      path: '/detail/1',
    },
    {
      name: '주문내역',
      path: '/order/list',
    },
  ];

  const link = (path: string) => {
    history.push(path);
  };

  return <Container />;
}
