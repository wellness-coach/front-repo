import styled from 'styled-components';
import TestResultHeader from './TestResultHeader';
import TestResultSpeedometer from './TestResultSpeedometer';
import TestResultBody from './TestResultBody';

function TestResult() {
  return (
    <TestResultContainer>
      <TestResultHeader />
      <TestResultSpeedometer />
      <TestResultBody />
      <SubmitBtnWrapper>
        <SubmitBtn>완료하기</SubmitBtn>
      </SubmitBtnWrapper>
    </TestResultContainer>
  );
}

export default TestResult;

const TestResultContainer = styled.div`
  width: 100%;
  min-width: 120rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitBtnWrapper = styled.div`
  margin-top: 5.3rem;
  margin-bottom: 20.7rem;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 27rem;
  height: 6.5rem;
  border-radius: 30px;
  background: rgba(227, 100, 68, 0.8);
  color: #000;
  text-align: center;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
