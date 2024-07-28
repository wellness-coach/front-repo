import React from 'react';
import styled from 'styled-components';
import LeftResult from './LeftResult';
import RightResult from './RightResult';
import DailyResultHeader from './DailyResultHeader';
function DailyResult() {
  return (
    <>
      <DailyResultContainer>
        <DailyResultHeader />
        <MainResultContainer>
          <LeftResult />
          <RightResult />
        </MainResultContainer>
      </DailyResultContainer>
    </>
  );
}

export default DailyResult;

const DailyResultContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const MainResultContainer = styled.section`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: center;
  height: 100%;
`;
