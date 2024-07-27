import styled from 'styled-components';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

function MainPage() {
  return (
    <MainContainer>
      <MainHeader/>
      <MainFooter/>
    </MainContainer>
  );
}

export default MainPage;

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`
