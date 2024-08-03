import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LeftResult from './LeftResult';
import RightResult from './RightResult';
import DailyResultHeader from './DailyResultHeader';

function DailyResult() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState('defaultUserId'); // 기본값으로 설정
  const [date, setDate] = useState(new Date()); // 기본값으로 현재 날짜 설정
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const formattedDate = date.toISOString().split('T')[0]; // yyyy-mm-dd 형식으로 변환
    axios
      .get(`${BASE_URL}/checkup/report/{}`, { params: { userId, date: formattedDate } })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [BASE_URL, userId, date]);

  return (
    <DailyResultContainer>
      <DailyResultHeader />
      <MainResultContainer>
        <LeftResult data={data} userId={userId} setUserId={setUserId} date={date} setDate={setDate} />
        <RightResult data={data} />
      </MainResultContainer>
    </DailyResultContainer>
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
