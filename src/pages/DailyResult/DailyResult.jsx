import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LeftResult from './LeftResult';
import RightResult from './RightResult';
import DailyResultHeader from './DailyResultHeader';

function DailyResult() {
  const [data, setData] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/checkup/report/{}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [BASE_URL]);

  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <DailyResultContainer>
        <DailyResultHeader />
        <MainResultContainer>
          <LeftResult data={data} />
          <RightResult data={data} />
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
  justify-content: center;
  height: 100%;
`;
