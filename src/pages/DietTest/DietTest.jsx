import styled from 'styled-components';
import DietTestHeader from './DietTestHeader';
import DietTestBody from './DietTestBody';
import DietTestFooter from './DietTestFooter';
import Loading from '../Loading/Loading';
import { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import UserInfoContext from '../../store/UserInfoCtx';
import { useNavigate } from 'react-router-dom';

function DietTest() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { userInfo, updateUserTestInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const date = new Date().toISOString().split('T')[0];
  // const date = "2024-01-21";

  const [isLoading, setIsLoading] = useState(false);
  const [tempInputs, setTempInputs] = useState({ mealResponses: [], memo: '' });

  const getTempInputValues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/checkup/get`, {
        params: {
          userId: userInfo.userId,
          date: date,
        },
      });
      console.log('임시저장 get하는거 테스트', response.data);
      setTempInputs({ mealResponses: response.data.mealResponses, memo: response.data.memo });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo.userCheckupStatus === 'IN_PROGRESS') {
      getTempInputValues();
    }
  }, [userInfo.userCheckupStatus]);

  const handleTempSave = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target.form);
    const entriesArray = Array.from(fd.entries());
    const filteredEntries = entriesArray.filter(([name]) => name !== 'memo');
    const inputData = filteredEntries.map(([menuType, menuName]) => ({ menuType, menuName }));
    console.log(inputData);
    const filteredInputData = inputData.filter((item) => item.menuName.length > 0);
    console.log(filteredInputData);
    const memoValues = fd.get('memo');

    try {
      const response = await axios.post(`${BASE_URL}/checkup/save`, {
        userId: userInfo.userId,
        date: date,
        meals: filteredInputData,
        memo: memoValues,
      });
      console.log(response);
      updateUserTestInfo(response.data.checkupStatus);
      alert('임시 저장 되었습니다!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!confirm('제출을 완료하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    console.log(userInfo.userCheckupStatus);

    const form = event.target.closest('form');
    if (!form) {
      console.error('Form not found');
      return;
    }

    const fd = new FormData(form);
    const entriesArray = Array.from(fd.entries());
    const filteredEntries = entriesArray.filter(([name]) => name !== 'memo');
    const inputData = filteredEntries.map(([menuType, menuName]) => ({ menuType, menuName }));
    console.log(inputData);
    const filteredInputData = inputData.filter((item) => item.menuName.length > 0);
    console.log(filteredInputData);
    const memoValues = fd.get('memo');

    try {
      const response = await axios.post(`${BASE_URL}/checkup/submit`, {
        userId: userInfo.userId,
        date: date,
        meals: filteredInputData,
        memo: memoValues,
      });
      console.log(response);
      if (response.data === 'success') updateUserTestInfo('COMPLETED');
      navigate('/test_result');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <DietTestContainer>
          <DietTestHeader />
          <form onSubmit={handleSubmit}>
            <DietTestBody tempInputs={tempInputs} />
            <DietTestFooter onTempSave={handleTempSave} />
          </form>
        </DietTestContainer>
      )}
    </>
  );
}

export default DietTest;

const DietTestContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
