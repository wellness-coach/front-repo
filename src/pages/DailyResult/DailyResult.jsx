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

    const formattedDate = date.toISOString().split('T')[0];
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