import styled from 'styled-components';
import DietTestHeader from './DietTestHeader';
import DietTestBody from './DietTestBody';
import DietTestFooter from './DietTestFooter';
import Loading from '../Loading/Loading';
import { useState, useContext } from 'react';
import axios from 'axios';
import UserInfoContext from '../../store/UserInfoCtx';
import { useNavigate } from 'react-router-dom';

function DietTest() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { userInfo, updateUserTestInfo } = useContext(UserInfoContext);
  const date = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);
  const handleTempSave = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const fd = new FormData(event.target.form);
    const entriesArray = Array.from(fd.entries());
    const filteredEntries = entriesArray.filter(([name, value]) => name !== 'memo');
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(userInfo.userCheckupStatus);

    const form = event.target.closest('form');
    if (!form) {
      console.error('Form not found');
      return;
    }

    const fd = new FormData(form);
    const entriesArray = Array.from(fd.entries());
    const filteredEntries = entriesArray.filter(([name, value]) => name !== 'memo');
    const inputData = filteredEntries.map(([menuType, menuName]) => ({ menuType, menuName }));
    console.log(inputData);
    const filteredInputData = inputData.filter((item) => item.menuName.length > 0);
    console.log(filteredInputData);
    const memoValues = fd.get('memo');

    try {
      let response;
      if (userInfo.userCheckupStatus === 'IN_PROGRESS') {
        response = await axios.post(`${BASE_URL}/checkup/submit`, {
          userId: userInfo.userId,
          checkupId: userInfo.userCheckupId,
          date: date,
          meals: filteredInputData,
          memo: memoValues,
        });
        console.log({
          userId: userInfo.userId,
          checkupId: userInfo.userCheckupId,
          date: date,
          meals: filteredInputData,
          memo: memoValues,
        });
        updateUserTestInfo('COMPLETED');
        navigate('/test_result');
      } else {
        response = await axios.post(`${BASE_URL}/checkup/submit`, {
          userId: userInfo.userId,
          date: '2024-05-13',
          meals: filteredInputData,
          memo: memoValues,
        });
        console.log({
          userId: userInfo.userId,
          date: '2024-05-13',
          meals: filteredInputData,
          memo: memoValues,
        });
        console.log(response);
        if (response.data === 'success') updateUserTestInfo('COMPLETED');
        navigate('/test_result');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <DietTestContainer>
          <DietTestHeader />
          <form onSubmit={handleSubmit}>
            <DietTestBody />
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
