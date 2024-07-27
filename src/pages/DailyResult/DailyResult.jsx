import React from 'react';
import styled from 'styled-components';
import LeftResult from './LeftResult';
import RightResult from './RightResult';
function DailyResult() {
  return (
    <>
      <MainTopContainer></MainTopContainer>
      <MainResultContainer>
        <LeftResult />
        <RightResult />
      </MainResultContainer>
    </>
  );
}

export default DailyResult;

const MainTopContainer = styled.div`
  height: 9rem;
  background-color: aqua;
`;
const MainResultContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
