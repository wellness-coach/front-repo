import styled from 'styled-components';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Modal from '../UI/Modal';
import Tips from '../../assets/Tips.json';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useState, useEffect, useContext } from 'react';
import UserInfoContext from '../../store/UserInfoCtx';

function MainPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { userId } = useParams();
  const { updateUserDefaultInfo } = useContext(UserInfoContext);
  console.log(userId);
  const date = new Date().toISOString().split('T')[0];
  // const date = '2024-01-21';

  const [fetchedData, setFetchedData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (id) => {
    setIsModalOpen(true);
    setCurrentTipIdx(id);
  };

  // 줄바꿈을 <br>로 변환하는 함수
  const formatContent = (content) => {
    return content.split('\n').map((line, index) => <ContentParagraph key={index}>{line}</ContentParagraph>);
  };

  const getMainPageData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mainPage`, {
        params: {
          userId: userId,
          date: date,
        },
      });

      console.log('responseData: ', response)
      setFetchedData(response.data);
      updateUserDefaultInfo(userId, response.data.name);
    } catch (error) {
      console.log('Error fetching main page data:', error);
    }
  };

  useEffect(() => {
    getMainPageData();
  }, []);

  
  console.log('fetchedData: ', fetchedData);

  return (
    <>
      {isModalOpen && (
        <Modal key={Tips[currentTipIdx].id} open={isModalOpen} onClose={handleCloseModal}>
          <ModalCategory>{Tips[currentTipIdx].category}</ModalCategory>
          <ModalTitle>{Tips[currentTipIdx].title}</ModalTitle>
          <ModalBody>
            <ModalImg src={`${Tips[currentTipIdx].modalImgSrc}`} alt={Tips[currentTipIdx].title} />
            <ModalContent>{formatContent(Tips[currentTipIdx].content)}</ModalContent>
            {Tips[currentTipIdx].source ? (
              <ModalSource href={Tips[currentTipIdx].source}>원문 보러가기</ModalSource>
            ) : null}
          </ModalBody>
        </Modal>
      )}
      <MainContainer>
        <MainHeader data={fetchedData} />
        <MainFooter onOpenTip={handleOpenModal} data={fetchedData} refreshData={getMainPageData} />
      </MainContainer>
    </>
  );
}

export default MainPage;

const MainContainer = styled.div`
  width: 100%;
  min-width: 120rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalCategory = styled.p`
  color: #a6cd7e;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

const ModalTitle = styled.p`
  color: #5c4b29;
  text-align: center;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-bottom: 3rem;
  width: 90%;
`;

const ModalBody = styled.div`
  padding-left: 1rem;
  max-height: 40rem;
  overflow-y: scroll;
  padding-bottom: 2rem;

  &::-webkit-scrollbar {
    width: 1rem;
}

  &::-webkit-scrollbar-thumb {
    background: #bbbaba; 
    border: 2px solid #efefef; 
    border-radius: 12px 12px 12px 12px;
  }
`;

const ModalImg = styled.img`
  width: 63rem;
  height: 28.7rem;
  margin-bottom: 2rem;
`;

const ModalContent = styled.p`
  color: #000;
  width: 63rem;
  word-wrap: break-word;
  margin-bottom: 2rem;
`;

const ContentParagraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ModalSource = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
