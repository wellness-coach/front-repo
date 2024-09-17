import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import closeImg from '../../assets/DailyResultImg/Close.png';
function ResultModal({ children, open, onClose }) {
  const dialog = useRef();

  // 간혹 dialog.current가 클린업 함수와
  // 그 위의 함수 실행 사이에
  // 바뀌는 경우가 발생해서
  // 임시 상수에 값을 할당하는 것이 유용

  // esc로 모달을 닫으면 open값이 바뀌지 않아
  // 다시 cart 버튼을 틀릭해도 모달이 열리지 않음
  // open값의 변화가 없어 밑의 코드 블록이 재실행되지 않기 때문

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      modal.close();
    }
  }, [open, onClose]);

  console.log(open);

  return createPortal(
    <StyledDialog ref={dialog}>
      {children}
      
      <LeaveBtn onClick={onClose}>닫기</LeaveBtn>
    </StyledDialog>,
    document.getElementById('modal'),
  );
}

export default ResultModal;

const StyledDialog = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 66rem;
  justify-content: center;
  background: white;
  position: fixed;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LeaveBtn = styled.button`
  width: 8rem;
  height: 4rem;
  border-radius: 10px;
  margin-top: 3rem;
  background: rgba(227, 100, 68, 0.8);
  color: #000;
  text-align: center;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

