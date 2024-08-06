import styled from 'styled-components';
import MainBackground from '../../assets/MainPageAssets/MainBackground.png';
import MainLogo from '../../assets/LoginImg/LoginLogo.png';
import Logout from '../../assets/HeaderImg/Logout.png';
import AngleBracket from '../../assets/MainPageAssets/AngleBracket.png';
import LowSpeed from '../../assets/DailyResultImg/SpeedGreen.png';
import MiddleSpeed from '../../assets/DailyResultImg/SpeedYellow.png';
import HighSpeed from '../../assets/DailyResultImg/SpeedRed.png';
import NoSpeed from '../../assets/DailyResultImg/NoSpeed.png';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../store/UserInfoCtx';

function MainHeader({ data }) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserInfoContext);
  const [isHovered, setIsHovered] = useState(false);

  const renderSpeedometer = () => {
    if (!data) return <Speedometer src={NoSpeed} alt="노화 속도계 - No Speed" />;

    switch (data.lastWeekAgingType) {
      case '':
        return <Speedometer src={NoSpeed} alt="노화 속도계 - No Speed" />;
      case 'PROPER':
        return <Speedometer src={LowSpeed} alt="노화 속도계 - Low Speed" />;
      case 'CAUTION':
        return <Speedometer src={MiddleSpeed} alt="노화 속도계 - Medium Speed" />;
      case 'DANGER':
        return <Speedometer src={HighSpeed} alt="노화 속도계 - High Speed" />;
      default:
        return <Speedometer src={NoSpeed} alt="노화 속도계 - Default" />;
    }
  };

  const translateLevel = () => {
    if (!data) return '? ?';

    switch (data.lastWeekAgingType) {
      case '':
        return '? ?';
      case 'PROPER':
        return '저속';
      case 'CAUTION':
        return '유의';
      case 'DANGER':
        return '가속';
      default:
        return '? ?';
    }
  };

  console.log(userInfo.userCheckupStatus);
  console.log(userInfo.userName);

  return (
    <MainHeaderWrapper>
      <MainHeaderContainer>
        <TitleContainer>
          <MainLogoImg src={MainLogo} alt="메인페이지 로고" />
          <LogoutBtn onClick={() => navigate('/')}>
            <LogoutText>로그아웃</LogoutText>
            <LogoutImg src={Logout} alt="로그아웃" />
          </LogoutBtn>
        </TitleContainer>

        <UserInfoContainer>
          <InfoContainer_left
            onClick={() => navigate('/daily_result')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {renderSpeedometer()}
            <>
              {!isHovered ? (
                <LevelBar>
                  <LevelLabel>
                    지난 주
                    <br />
                    건강 진단
                  </LevelLabel>
                  <Level level={data ? data.lastWeekAgingType : ''}>{translateLevel()} 단계</Level>
                </LevelBar>
              ) : (
                <GoToReport>일별 리포트 보러가기</GoToReport>
              )}
            </>
          </InfoContainer_left>
          <InfoContainer_right>
            <MainText>
              안녕하세요! {userInfo.userName}님 <br /> 오늘도 건강한 하루를 보내셨나요?
            </MainText>
            <GoToTestButton
              onClick={
                userInfo.userCheckupStatus === 'COMPLETED' ? () => navigate('/test_result') : () => navigate('/test')
              }
            >
              {userInfo.userCheckupStatus === 'NOT_STARTED' ? (
                <p>오늘의 식단 진단하기</p>
              ) : userInfo.userCheckupStatus === 'IN_PROGRESS' ? (
                <p>식단 이어서 입력하기</p>
              ) : (
                <p>오늘의 결과 보러가기</p>
              )}
              <p>
                <AngleBracketImg src={AngleBracket} alt="꺽쇠" />
              </p>
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
  background-image: url(${MainBackground});
  background-size: cover;
  // 수평 스크롤바 생기는 문제 해결
  overflow-x: hidden;
`;

const MainHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.7rem;
  margin-bottom: 7.6rem;
`;
// 로고&마이페이지

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 135.4rem;
`;

const MainLogoImg = styled.img`
  width: 19.5rem;
  height: 8.5rem;
`;

const LogoutBtn = styled.button`
  width: 14.5rem;
  height: 4rem;
  border-radius: 30px;
  border: 3px solid #f4f1da;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LogoutText = styled.p`
  color: #5f553e;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const LogoutImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

// 유저 정보 창
const UserInfoContainer = styled.div`
  width: 104rem;
  margin-top: 5.5rem;
  display: flex;
  align-items: flex-end;
  height: 25.4rem;
`;

const InfoContainer_left = styled.div`
  width: 38.6rem;
  margin-right: 7.7rem;
`;

const Speedometer = styled.img`
  width: 100%;
  height: 18.2rem;
`;

const LevelBar = styled.button`
  width: 100%;
  height: 6.7rem;
  border-radius: 20px;
  margin-top: 1rem;
  background: linear-gradient(157deg, #fff 43.17%, rgba(153, 153, 153, 0.3) 381.72%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  cursor: pointer;
`;

const LevelLabel = styled.span`
  color: #5f553e;
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Level = styled.span`
  color: ${(props) => {
    if (props.level === 'PROPER') return '#78A55A';
    if (props.level === 'CAUTION') return '#D8C317';
    if (props.level === 'DANGER') return '#D35F4F';
    else {
      return '#6c757d';
    }
  }};
  text-align: center;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GoToReport = styled.p`
  width: 100%;
  height: 6.7rem;
  border-radius: 20px;
  margin-top: 1rem;
  background: linear-gradient(157deg, #a5c67e 43.17%, rgba(153, 153, 153, 0.3) 381.72%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #272727;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const InfoContainer_right = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MainText = styled.p`
  color: #5c4b29;
  font-family: 'Noto Sans KR';
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const GoToTestButton = styled.button`
  width: 33.7rem;
  height: 6.4rem;
  border-radius: 23px;
  border: 6px solid #fff;
  margin-top: 2.4rem;
  background: linear-gradient(180deg, #e68167 -71.09%, rgba(218, 90, 57, 0.46) 175.78%);
  box-shadow: 5.714px 5.714px 4.571px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 4rem;

  & p {
    color: #000;
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const AngleBracketImg = styled.img`
  width: 3rem;
  height: 3rem;
  padding-top: 0.6rem;
`;
