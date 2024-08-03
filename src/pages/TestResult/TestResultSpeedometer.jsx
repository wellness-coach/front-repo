import styled from 'styled-components';
import InfoButton from '../../assets/img/InfoButton.png';
import TestInfoBox from '../../assets/img/TestInfoBox.png';
import LowSpeed from '../../assets/img/LowSpeed.png';
import MiddleSpeed from '../../assets/img/MiddleSpeed.png';
import HighSpeed from '../../assets/img/HighSpeed.png';
import NoSpeed from '../../assets/img/NoSpeed.png';
import BottomArrow from '../../assets/img/BottomArrow.png'
import { useState } from 'react';

function TestResultSpeedometer() {
  const [speed, setSpeed] = useState(1);
  const [isInfoRendered, setIsInfoRendered] = useState(false);

  const handleRenderInfo = () => {
    setIsInfoRendered(!isInfoRendered);
  };

  const renderSpeedometer = () => {
    switch (speed) {
      case 1:
        return <Speedometer src={NoSpeed} alt="노화 속도계 - No Speed" />;
      case 2:
        return <Speedometer src={LowSpeed} alt="노화 속도계 - Low Speed" />;
      case 3:
        return <Speedometer src={MiddleSpeed} alt="노화 속도계 - Medium Speed" />;
      case 4:
        return <Speedometer src={HighSpeed} alt="노화 속도계 - High Speed" />;
      default:
        return <Speedometer src={NoSpeed} alt="노화 속도계 - Default" />;
    }
  };

  return (
    <ResultSpeedometerContainer>
      {isInfoRendered && <TestInfoBoxImg src={TestInfoBox} alt="검사 정보 글" />}
      <TestExplanationBtn onClick={handleRenderInfo}>
        <InfoButtonImg src={InfoButton} alt="검사 정보 버튼" />
      </TestExplanationBtn>

      <SpeedometerTitle>
        오늘의 <span>검사 결과</span> 분석지
      </SpeedometerTitle>
      <UserSpeedometerContainer>
        {renderSpeedometer()}
        <LevelBar>
          <LevelLabel>oo님의 오늘 노화 속도</LevelLabel>
          <Level>?? 단계</Level>
        </LevelBar>
        <BottomArrowImg src={BottomArrow} alt='항목별 자세히 보기'/>
      </UserSpeedometerContainer>
    </ResultSpeedometerContainer>
  );
}

export default TestResultSpeedometer;

const ResultSpeedometerContainer = styled.div`
  width: 107.8rem;
  position: relative;
  margin-top: 7rem;
`;

const TestInfoBoxImg = styled.img`
  width: 51rem;
  height: 45.3rem;
  position: absolute;
  top: 3rem;
  left: 49rem;
  z-index: 100;
`;

const TestExplanationBtn = styled.button``;

const InfoButtonImg = styled.img`
  width: 4.4rem;
  height: 4.4rem;
  position: absolute;
  top: 6rem;
  left: 100rem;
`;

const SpeedometerTitle = styled.p`
  color: #000;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  & span {
    color: #78a55a;
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const UserSpeedometerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 44.6rem;
  margin-top: 5.5rem;
`;

const Speedometer = styled.img`
  width: 47rem;
  height: 22.5rem;
`;

const LevelBar = styled.div`
  width: 47rem;
  height: 13rem;
  border-radius: 20px;
  margin-top: 1rem;
  background: linear-gradient(157deg, #fff 43.17%, rgba(153, 153, 153, 0.3) 381.72%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LevelLabel = styled.p`
  color: #5f553e;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 2.2rem;
`;

const Level = styled.p`
  color: #d8c317;
  text-align: center;
  font-size: 4.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 1.5rem;
`;

const BottomArrowImg = styled.img`
  width: 29.5rem;
  height: 9rem;
`;
