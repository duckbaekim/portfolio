import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Image = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;

`;
interface Props{
   imageUrl: string;
}
export default function CarouselItem({imageUrl}: Props) {
    return (
        <Container>
            <Image src={imageUrl} alt="상품이미지"/>
        </Container>
    )
};