import styled from 'styled-components';
import BodyTests from './BodyTests';
import InfoButton from '../../assets/DietTestAssets/InfoButton.png';
import TestInfoBox from '../../assets/DietTestAssets/TestInfoBox.png';
import { useState } from 'react';

function DietTestBody() {
  const [isInfoRendered, setIsInfoRendered] = useState(false);

  const handleShowInfo = () => {
    setIsInfoRendered(!isInfoRendered);
  };

  console.log(isInfoRendered);
  return (
    <DietTestBodyContainer>
      <ExplanationContainer>
        <ExplanationTextContainer>
          <Title1>
            <span>오늘 식단</span>은 어떠셨나요?
          </Title1>
          <GrayBox>
            <Title2>00님의 식단이 어땠는지 차근차근 기록해주세요.</Title2>
            <Title3>
              더욱 정확한 분석을 위해 메뉴 이름을 자세히 적어주세요. (ex. 참치 포케 -&gt; 참치 통곡물 포케) <br />
              또한 드시지 않았다면 빈칸으로 남겨주세요.
            </Title3>
          </GrayBox>
        </ExplanationTextContainer>
        {isInfoRendered && <TestInfoBoxImg src={TestInfoBox} alt="정보 글" />}
        <TestExplanationButton onClick={handleShowInfo}>
          <InfoButtonImg src={InfoButton} alt="검사 정보 버튼" />
        </TestExplanationButton>
      </ExplanationContainer>
      <TestContainer>
        <BodyTests />
      </TestContainer>
    </DietTestBodyContainer>
  );
}

export default DietTestBody;

const DietTestBodyContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExplanationContainer = styled.div`
  margin-top: 8.7rem;
  width: 108rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
`;

const ExplanationTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title1 = styled.p`
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

const GrayBox = styled.div`
  margin-top: 0.4rem;
  width: 73.5rem;
  height: 9.7rem;
  border-radius: 2rem;
  background: #f1f1f1;
  padding: 1.3rem 0rem 1.3rem 1.6rem;
`;

const Title2 = styled.p`
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title3 = styled.p`
  color: #757575;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.6rem;
`;

const TestInfoBoxImg = styled.img`
  width: 51rem;
  height: 45.3rem;
  position: absolute;
  top: 6rem;
  left: 52rem;
`;

const TestExplanationButton = styled.button``;

const InfoButtonImg = styled.img`
  width: 4.4rem;
  height: 4.4rem;
`;

const TestContainer = styled.main`
  width: 111.2rem;
  min-height: 127.3rem;
  margin-top: 4.1rem;
`;
