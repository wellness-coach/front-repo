import React from "react";
import styled from "styled-components";
import DailyReport from "../components/DailyReport";
import FoodReport from "../components/FoodReport";
function Report() {
  return (
    <>
      <MainTop></MainTop>
      <MainReportSc>
        <DailyReport />
        <FoodReport />
      </MainReportSc>
    </>
  );
}

export default Report;

const MainTop = styled.div``;
const MainReportSc = styled.section`
  display: flex;
`;
