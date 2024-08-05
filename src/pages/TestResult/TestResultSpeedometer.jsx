import styled from 'styled-components';
import InfoButton from '../../assets/TestResultAssets/InfoButton.png';
import TestInfoBox from '../../assets/DietTestAssets/TestInfoBox.png';
import LowSpeed from '../../assets/TestResultAssets/LowSpeed.png';
import MiddleSpeed from '../../assets/TestResultAssets/MiddleSpeed.png';
import HighSpeed from '../../assets/TestResultAssets/HighSpeed.png';
import NoSpeed from '../../assets/TestResultAssets/NoSpeed.png';
import BottomArrow from '../../assets/TestResultAssets/BottomArrow.png';
import GreenBox from '../../assets/TestResultAssets/GreenBox.png';
import { useState, useContext } from 'react';
import UserInfoContext from '../../store/UserInfoCtx';

function TestResultSpeedometer({ data }) {
  const { userInfo } = useContext(UserInfoContext);
  const [isInfoRendered, setIsInfoRendered] = useState(false);

  const handleRenderInfo = () => {
    setIsInfoRendered(!isInfoRendered);
  };

  const renderSpeedometer = () => {
    if (!data) return <Speedometer src={NoSpeed} alt="노화 속도계 - No Speed" />;

    switch (data.todayAgingType) {
      case '':
        return <Speedometer src={NoSpeed} alt="노화 속도계 - No Speed" />;
      case 'PROPER':
        return <Speedometer src={LowSpeed} alt="노화 속도계 - Low Speed" />;
      case 'CAUTION':
        return <Speedometer src={MiddleSpeed} alt="노화 속도계 - Medium Speed" />;
      case 'DANGER':
        return <Speedometer src={HighSpeed} alt="노화 속도계 - High Speed" />;
      default:
        return <Speedometer src={NoSpeed} alt="노화 속도계 - Default" />;
    }
  };

  const translateLevel = () => {
    if (!data) return '??';

    switch (data.todayAgingType) {
      case '':
        return '??';
      case 'PROPER':
        return '저속';
      case 'CAUTION':
        return '유의';
      case 'DANGER':
        return '가속';
      default:
        return '??';
    }
  };

  const scaleAgingType = (agingType) => {
    if (!agingType) return 0;

    switch (agingType) {
      case '':
        return 0;
      case 'PROPER':
        return 1;
      case 'CAUTION':
        return 2;
      case 'DANGER':
        return 3;
      default:
        return 0;
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
        <GreenBoxImg src={GreenBox} alt="초록색 박스" />
        {data.recentAgingType === null ? (
          <GreenBoxText>매일매일 <br />검사해보세요!</GreenBoxText>
        ) : scaleAgingType(data.recentAgingType) > scaleAgingType(data.todayAgingType) ? (
          <GreenBoxText>어제보다 노화속도가 <br/>느려졌어요!</GreenBoxText>
        ) : scaleAgingType(data.recentAgingType) < scaleAgingType(data.todayAgingType) ? (
          <GreenBoxText>어제보다 노화속도가 <br />빨라졌어요!</GreenBoxText>
        ) : (
          <GreenBoxText>어제와 노화속도가 <br />바뀌지 않았어요!</GreenBoxText>
        )}

        {renderSpeedometer()}
        <LevelBar>
          <LevelLabel>{userInfo.userName}님의 오늘 노화 속도</LevelLabel>
          <Level level={data ? data.todayAgingType : ''}>{translateLevel()} 단계</Level>
        </LevelBar>
        <BottomArrowImg src={BottomArrow} alt="항목별 자세히 보기" />
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
  position: relative;
`;

const GreenBoxImg = styled.img`
  position: absolute;
  top: 1rem;
  left: 7rem;
  z-index: 0;
  width: 24.5rem;
  height: 15.5rem;
`;

const GreenBoxText = styled.p`
  z-index: 1;
  position: absolute;
  top: 6rem;
  left: 12rem;
  text-align: center;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
  color: ${(props) => {
    if (props.level === 'PROPER') return '#78A55A';
    if (props.level === 'CAUTION') return '#D8C317';
    if (props.level === 'DANGER') return '#D35F4F';
    else {
      return '#000';
    }
  }};
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
