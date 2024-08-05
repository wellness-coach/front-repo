import styled from 'styled-components';

function DietTestFooter({ onTempSave }) {
  return (
    <DietTestFooterWrapper>
      <ButtonContainer>
        <TempSaveButton type="button" onClick={onTempSave}>
          임시 저장
        </TempSaveButton>
        <PermSaveButton type="submit">완료하기</PermSaveButton>
      </ButtonContainer>
    </DietTestFooterWrapper>
  );
}

export default DietTestFooter;

const DietTestFooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 1.7rem;
  margin-bottom: 11.2rem;
  display: flex;
  justify-content: space-between;
  width: 77rem;
`;

const TempSaveButton = styled.button`
  border-radius: 3rem;
  background: #a0c985;
  width: 34.7rem;
  height: 6.6rem;
  color: #000;
  text-align: center;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const PermSaveButton = styled.button`
  border-radius: 3rem;
  background: #f7ce76;
  width: 34.7rem;
  height: 6.6rem;
  color: #000;
  text-align: center;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
