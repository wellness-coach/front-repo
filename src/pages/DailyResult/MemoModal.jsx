import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ko as koLocale } from 'date-fns/locale';
import memocloseicon from '../../assets/img/Close.png';

function MemoModal({ setIsModalOpen, selectedDate, memoContent }) {
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Overlay>
        <MemoModalContainer>
          <MemoModalTopContainer>
            <MemoCloseBtn onClick={closeModal}>
              <MemoCloseIcon src={memocloseicon} alt="닫기 아이콘" />
            </MemoCloseBtn>
            <MemoTitle>나의 메모 전체 보기</MemoTitle>
            <MemoDate>{format(selectedDate, 'MM.dd', { locale: koLocale })}</MemoDate>
          </MemoModalTopContainer>
          <MemoDetail>{memoContent}</MemoDetail>
        </MemoModalContainer>
      </Overlay>
    </>
  );
}

export default MemoModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const MemoModalContainer = styled.div`
  width: 71rem;
  height: 67rem;
  border-radius: 1.8rem;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemoCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;
const MemoCloseIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
const MemoModalTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemoTitle = styled.p`
  color: #e57148;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0rem 1.8rem;
`;

const MemoDate = styled.p`
  color: #5c4b29;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
`;

const MemoDetail = styled.div`
  color: black;
  width: 63rem;
  height: 46rem;
  margin-top: 4.6rem;
  font-size: 1.5rem;
  font-weight: 400;
`;
