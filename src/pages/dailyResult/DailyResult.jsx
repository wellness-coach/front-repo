import React from "react";
import styled from "styled-components";
import LeftResult from "./LeftResults";
import RightResult from "./RightResult";
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

const MainTop = styled.div``;
const MainResultContainer = styled.section`
  display: flex;
`;
