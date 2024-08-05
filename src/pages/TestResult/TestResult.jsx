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
  const date = new Date().toISOString().split('T')[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderedData, setRenderedData] = useState();

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
          date: '2024-06-02',
        },
      });
      setRenderedData(response.data);
      console.log(response);
    } catch (error) {
      console.log('Error fetching Test page data:', error);
    }
  };

  useEffect(() => {
    getResultData();
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal key={currentMealType} open={isModalOpen} onClose={isModalOpen ? handleCloseModal : null}>
          <ModalTitle>추천 더보기</ModalTitle>
          {renderedData.meals[currentMealType][1].productResponse ? (
            <>
            <ModalContent>
              {userInfo.userName}님의 {translateMealType(currentMealType)}식단을 분석해본 결과,
              <br />
              {renderedData.meals[currentMealType][1].productResponse.targetProductName}에 대한 대체 제품으로
              {renderedData.meals[currentMealType][1].productResponse.productName}를 추천드려요
            </ModalContent>
            <ModalItem>
              <p>{renderedData.meals[currentMealType][1].productResponse.productName}</p>
              <a href={renderedData.meals[currentMealType][1].productResponse.productLink}>제품 보러가기</a>
              <ItemScrapBtn
                      type="button"
                      onClick={renderedData.meals[currentMealType][1].productResponse.scrap ? () => handleDeleteScrap(renderedData.meals[currentMealType][1].productResponse.productId) : () => handleAddScrap(renderedData.meals[currentMealType][1].productResponse.productId)}
                    >
                      <ItemScrap src={renderedData.meals[currentMealType][1].productResponse.scrap ? FullBookmarkImg : EmptyBookmarkImg} alt="북마크" />
                    </ItemScrapBtn>
            </ModalItem>
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

const ModalContent = styled.p`
  margin-top: 2.6rem;
  color: #000;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalItem = styled.div`
  
`

const ItemScrapBtn =styled.button`
  
`

const ItemScrap = styled.img`
    width: 3rem;
    height: 5rem;
`

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
