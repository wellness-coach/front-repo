import styled from 'styled-components';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import Modal from '../UI/Modal';
import Tips from '../../assets/Tips.json';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';

function MainPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { userId } = useParams();
  const date = new Date().toISOString().split('T')[0];
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

  const getMainPageData = () => {
    

    try {
      // const response = axios.get(`${BASE_URL}/mainPage`, {
      //   params: {
      //     userId,
      //     date,
      //   },
      // });
      const response = {
        lastWeekAgingType: 'PROPER',
        checkupStatus: "COMPLETED",
        // products: [
        //     {
        //         "productId": 55,
        //         "targetProductName": "버터",
        //         "productName": "올리브 오일",
        //         "productLink": "https://smartstore.naver.com/main/products/5561899023",
        //         "scrap": true
        //     },
        //     {
        //         "productId": 56,
        //         "targetProductName": "숙주나물",
        //         "productName": "브로콜리",
        //         "productLink": "https://smartstore.naver.com/main/products/5997500234",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 57,
        //         "targetProductName": "돼지고기",
        //         "productName": "닭가슴살",
        //         "productLink": "https://smartstore.naver.com/main/products/5018452493",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 78,
        //         "targetProductName": "설탕",
        //         "productName": "호두",
        //         "productLink": "https://smartstore.naver.com/main/products/4998235909",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 79,
        //         "targetProductName": "치즈",
        //         "productName": "아보카도",
        //         "productLink": "https://smartstore.naver.com/main/products/4349833565",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 80,
        //         "targetProductName": "초콜릿",
        //         "productName": "카카오닙스",
        //         "productLink": "https://smartstore.naver.com/main/products/2765087494",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 81,
        //         "targetProductName": "우유",
        //         "productName": "아몬드 우유",
        //         "productLink": "https://smartstore.naver.com/main/products/8894224469",
        //         "scrap": false
        //     },
        //     {
        //         "productId": 85,
        //         "targetProductName": "우유",
        //         "productName": "아몬드 우유",
        //         "productLink": "https://smartstore.naver.com/main/products/8894224469",
        //         "scrap": false
        //     }
        // ]
    }
      setFetchedData(response);
    } catch (error ){
      console.log('Error fetching main page data:', error);
    }
  };

  

  useEffect(()=> {
    getMainPageData();
  }, [])

  console.log(fetchedData);

  return (
    <>
      {isModalOpen && (
        <Modal key={Tips[currentTipIdx].id} open={isModalOpen} onClose={isModalOpen ? handleCloseModal : null}>
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
        <MainHeader data={fetchedData}/>
        <MainFooter onOpenTip={handleOpenModal} />
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
  overflow: hidden;
  word-wrap: break-word;
  word-break: keep-all;
  width: 90%;
`;

const ModalBody = styled.div`
  padding-left: 1rem;
  max-height: 50rem;
  scrollbar-width: thin;
  overflow-y: auto;
  padding-bottom: 2rem;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #ebe6d2;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a6cd7e;
    border-radius: 10px;
    border: 3px solid #ebe6d2;
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
