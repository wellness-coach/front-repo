import styled from 'styled-components';

function MainHeader() {
  return (
    <MainHeaderWrapper>
      <MainHeaderContainer>
        <TitleContainer>
          <MainTitle>Wellness Coach</MainTitle>
          <UserActionContainer>
            <LogOutBtn>로그아웃</LogOutBtn>
            <VerticalLine></VerticalLine>
            <MyPageBtn>마이페이지</MyPageBtn>
          </UserActionContainer>
        </TitleContainer>

        <UserInfoContainer>
          <InfoContainer_left>
            <Speedometer alt="speedometer"></Speedometer>
            <LevelBar>
              <LevelLabel>
                지난주
                <br />
                건강 진단
              </LevelLabel>
              <Level>00단계</Level>
            </LevelBar>
            {/* <GoToReportButton>일별 리포트 보러가기</GoToReportButton> */}
          </InfoContainer_left>
          <InfoContainer_right>
            <MainText>
              안녕하세요! patrick님 <br /> 오늘은 어떤 하루를 보내셨나요?
            </MainText>
            <GoToTestButton>
              <p>오늘의 식단 진단하기</p><p>&gt;</p>
            </GoToTestButton>
          </InfoContainer_right>
        </UserInfoContainer>
      </MainHeaderContainer>
    </MainHeaderWrapper>
  );
}

export default MainHeader;

const MainHeaderWrapper = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  padding: 3.2rem 6.1rem 7.6rem 6.1rem;
`;

const MainHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
// 로고&마이페이지

const TitleContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  position: relative;
  padding-bottom: 1rem;
`;

const MainTitle = styled.h2`
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  line-height: normal;
  font-style: normal;
  font-weight: 600;
  text-align: center;
`;

const UserActionContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 110rem;
  width: 24.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogOutBtn = styled.button`
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;

const VerticalLine = styled.div`
  border-left: 1px solid #4f4f4f;
  height: 2.24rem;
`;

const MyPageBtn = styled.button`
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;

// 유저 정보 창
const UserInfoContainer = styled.div`
  width: 100%;
  margin-top: 7.67rem;
  padding: 0rem 32.4rem 0rem 14.3rem;
  display: flex;
  justify-content: space-between;
  height: 25.4rem;
`;

const InfoContainer_left = styled.div`
  width: 38.6rem;
  height: 100%;
`;

const Speedometer = styled.div`
  width: 100%;
  height: 18rem;
  background-color: aliceblue;
`;

const LevelBar = styled.div`
  width: 100%;
  height: 6.7rem;
  border-radius: 2rem;
  margin-top: 1rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const LevelLabel = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Level = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

// const GoToReportButton = styled.button``;

const InfoContainer_right = styled.div`
  width: 46rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MainText = styled.p`
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GoToTestButton = styled.button`
  width: 33.7rem;
  height: 6.4rem;
  border-radius: 2.3rem;
  border: 6px solid #fff;
  margin-top: 2.4rem;
  background: #adb88f;
  box-shadow: 5.714px 5.714px 4.571px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 4rem;

  & p {
    color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  }
`;
