import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import greenicon from '../../assets/img/GreenIcon.png';
import yellowicon from '../../assets/img/YellowIcon.png';
import redicon from '../../assets/img/RedIcon.png';
import shadowicon from '../../assets/img/Shadow.png';
function Loading() {
  return (
    <>
      <LoadingContainer>
        <ImgContainer>
          <FaceContainer>
            <FaceIcon src={greenicon} alt="초록 아이콘" delay="0s" />
            <FaceIcon src={yellowicon} alt="노랑 아이콘" delay="0.3s" />
            <FaceIcon src={redicon} alt="빨강 아이콘" delay="0.6s" />
          </FaceContainer>
          <ShadowContainer>
            <ShadowIcon src={shadowicon} alt="그림자 아이콘" />
            <ShadowIcon src={shadowicon} alt="그림자 아이콘" />
            <ShadowIcon src={shadowicon} alt="그림자 아이콘" />
          </ShadowContainer>
        </ImgContainer>
        <BarContainer></BarContainer>
        <MentContainer>
          <NameM>
            <GreenSpan>홍길동님의 하루</GreenSpan>를 분석하는 중입니다
          </NameM>
          <WaitM>조금만 기다려주세요:)</WaitM>
        </MentContainer>
      </LoadingContainer>
    </>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div``;
const FaceContainer = styled.div`
  height: 13rem;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: end;
`;
const ShadowContainer = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: end;
`;
const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(1rem);
  }
  50% {
    transform: translateY(-5rem);
  }
`;

const FaceIcon = styled.img`
  width: 7.4rem;
  height: 7.5rem;
  margin: 0rem 2.9rem;
  animation: ${moveUpDown} 1.5s infinite;
  animation-delay: ${(props) => props.delay};
`;
const ShadowIcon = styled.img`
  width: 5.8rem;
  height: 1rem;
  margin: 0rem 3.7rem;
`;

const BarContainer = styled.div``;

const MentContainer = styled.div`
  text-align: center;
  line-height: 3.5rem;
`;

const NameM = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
`;

const WaitM = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
`;

const GreenSpan = styled.span`
  color: #78a55a;
  font-size: 2.5rem;
  font-weight: 700;
`;
