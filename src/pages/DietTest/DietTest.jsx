import styled from 'styled-components';
import DietTestHeader from './DietTestHeader';
import DietTestBody from './DietTestBody';
import DietTestFooter from './DietTestFooter';

function DietTest() {
  return (
    <DietTestContainer>
      <DietTestHeader />
      <DietTestBody />
      <DietTestFooter />
    </DietTestContainer>
  );
}

export default DietTest;

const DietTestContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
