import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LeftResult from './LeftResult';
import RightResult from './RightResult';
import DailyResultHeader from './DailyResultHeader';
import UserInfoContext from '../../store/UserInfoCtx';

function DailyResult() {
  const { userInfo } = useContext(UserInfoContext);
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (!userInfo || !userInfo.userId) {
      console.error('User ID is missing');
      return;
    }

    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

    // 연, 월, 일 추출
    const year = utcDate.getFullYear();
    const month = (utcDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = utcDate.getDate().toString().padStart(2, '0');

    // yyyy-MM-dd 형식으로 날짜 구성
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    axios
      .get(`${BASE_URL}/checkup/report`, { params: { userId: userInfo.userId, date: formattedDate } })
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [BASE_URL, userInfo, date]);

  return (
    <DailyResultContainer>
      <DailyResultHeader />
      <MainResultContainer>
        <LeftResult data={data} date={date} setDate={setDate} />
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
