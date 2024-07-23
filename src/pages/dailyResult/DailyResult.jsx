import React from "react";
import styled from "styled-components";
import LeftResult from "./LeftResult";
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

const MainTopContainer = styled.div``;
const MainResultContainer = styled.section`
  display: flex;
`;
