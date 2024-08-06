import styled from 'styled-components';
import EmptyBookmarkImg from '../../assets/MainPageAssets/EmptyBookmark.png';
import FullBookmarkImg from '../../assets/MainPageAssets/FullBookmark.png';
import TestResultHeader from './TestResultHeader';
import TestResultSpeedometer from './TestResultSpeedometer';
import TestResultBody from './TestResultBody';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserInfoContext from '../../store/UserInfoCtx';
import axios from 'axios';
import Modal from '../UI/Modal';

function TestResult() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { userInfo } = useContext(UserInfoContext);
  // const date = new Date().toISOString().split('T')[0];
  const date = "2024-01-21";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderedData, setRenderedData] = useState(null);
  const [currentMealType, setCurrentMealType] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (mealType) => {
    setIsModalOpen(true);
    setCurrentMealType(mealType);
  };

  console.log(currentMealType);

  const translateMealType = () => {
    if (!currentMealType) return '??';

    switch (currentMealType) {
      case '':
        return '??';
      case 'BREAKFAST':
        return '아침';
      case 'LUNCH':
        return '점심';
      case 'DINNER':
        return '저녁';
      case 'SNACK':
        return '간식';
      case 'DRINK':
        return '음료';
      default:
        return '??';
    }
  };

  const getResultData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/checkup/report`, {
        params: {
          userId: userInfo.userId,
          date: date,
        },
      });
      setRenderedData(response.data);
      console.log(response);
    } catch (error) {
      alert('에러 발생!', error);
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  const handleAddScrap = async (productId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/scrap/add?userId=${userInfo.userId}&recommendationId=${productId}`,
        {
          userId: userInfo.userId,
          recommendationId: productId,
        },
      );
      console.log(response);
      getResultData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteScrap = async (productId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/scrap/cancel?userId=${userInfo.userId}&recommendationId=${productId}`,
        {
          params: {
            userId: userInfo.userId,
            recommendationId: productId,
          },
        },
      );
      console.log(response);
      getResultData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isModalOpen && renderedData && renderedData.meals && renderedData.meals[currentMealType] && (
        <Modal key={currentMealType} open={isModalOpen} onClose={handleCloseModal}>
          <ModalTitle>추천 더보기</ModalTitle>
          {renderedData.meals[currentMealType].some((meal) => meal.productResponse) ? (
            <>
              <ModalContent>
                {userInfo.userName}님의 {translateMealType()}식단 분석해본 결과,
                <br />
                {renderedData.meals[currentMealType].map((meal, index) =>
                  meal.productResponse ? (
                    <div key={index}>
                      {meal.productResponse.targetProductName}에 대한 대체 제품으로<span> </span>
                      {meal.productResponse.productName}
                      <span> </span>을/를 추천드려요
                    </div>
                  ) : null,
                )}
              </ModalContent>
              <ModalItemContainer>
                {renderedData.meals[currentMealType].map((meal, index) =>
                  meal.productResponse ? (
                    <ModalItem key={index}>
                      <ModalItemText>
                        <p>{meal.productResponse.productName}</p>
                        <a href={meal.productResponse.productLink}>제품 보러가기</a>
                      </ModalItemText>

                      <ItemScrapBtn
                        type="button"
                        onClick={
                          meal.productResponse.scrap
                            ? () => handleDeleteScrap(meal.productResponse.productId)
                            : () => handleAddScrap(meal.productResponse.productId)
                        }
                      >
                        <ItemScrap src={meal.productResponse.scrap ? FullBookmarkImg : EmptyBookmarkImg} alt="북마크" />
                      </ItemScrapBtn>
                    </ModalItem>
                  ) : null,
                )}
              </ModalItemContainer>
            </>
          ) : (
            <ModalContent>추천 제품이 없습니다</ModalContent>
          )}
        </Modal>
      )}
      {renderedData && (
        <TestResultContainer>
          <TestResultHeader />
          <TestResultSpeedometer data={renderedData} />
          <TestResultBody fetchedData={renderedData} onOpenRecommendation={handleOpenModal} />
          <SubmitBtnWrapper>
            <SubmitBtn onClick={() => navigate(`/main/${userInfo.userId}`)}>완료하기</SubmitBtn>
          </SubmitBtnWrapper>
        </TestResultContainer>
      )}
    </>
  );
}

export default TestResult;

const TestResultContainer = styled.div`
  width: 100%;
  min-width: 120rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.p`
  margin-top: 6rem;
  color: #000;
  text-align: center;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ModalContent = styled.div`
  width: 80%;
  margin-top: 2.6rem;
  color: #000;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalItem = styled.li`
  border-top: 1px dotted gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 6rem;

  & p {
  }

  & a {
    color: blue;
  }
`;

const ModalItemText = styled.div`
  max-width: 34rem;
  min-width: 16rem;
  display: flex;
  justify-content: space-between;
`;

const ModalItemContainer = styled.ul`
  width: 80%;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7rem;
  border-bottom: 1px dotted gray;
`;

const ItemScrapBtn = styled.button``;

const ItemScrap = styled.img`
  width: 3rem;
  height: 5rem;
`;

const SubmitBtnWrapper = styled.div`
  margin-top: 5.3rem;
  margin-bottom: 20.7rem;
  text-align: center;
`;

const SubmitBtn = styled.button`
  width: 27rem;
  height: 6.5rem;
  border-radius: 30px;
  background: rgba(227, 100, 68, 0.8);
  color: #000;
  text-align: center;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
