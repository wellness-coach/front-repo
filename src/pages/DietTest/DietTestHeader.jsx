import styled from 'styled-components';
import WellnessCoachTitle from '../../assets/HeaderImg/WellnessCoachTitle.png';
import LogoPicture from '../../assets/HeaderImg/LogoPicture.png';
import Logout from '../../assets/HeaderImg/Logout.png';
import { useNavigate } from 'react-router-dom';
import UserInfoContext from '../../store/UserInfoCtx';
import { useContext } from 'react';

function DietTestHeader() {
  const { userInfo } = useContext(UserInfoContext);

  const navigate = useNavigate();
  return (
    <DietTestHeaderWrapper>
      <DietTestHeaderContainer>
        <LogoPictureImg src={LogoPicture} alt="로그 그림" />
        <WellnessCoachTitleImg
          src={WellnessCoachTitle}
          alt="타이틀"
          onClick={() => navigate(`/main/${userInfo.userId}`)}
        />
        <LogoutButton onClick={() => navigate(`/main/${userInfo.userId}`)}>
          <LogoutText>로그아웃</LogoutText>
          <LogoutImg src={Logout} alt="로그아웃" />
        </LogoutButton>
      </DietTestHeaderContainer>
    </DietTestHeaderWrapper>
  );
}

export default DietTestHeader;

const DietTestHeaderWrapper = styled.header`
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #c2c2c2;
`;

const DietTestHeaderContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 1.3rem;
  width: 136.2rem;
`;

const LogoutButton = styled.button`
  width: 14.5rem;
  height: 4rem;
  border-radius: 3rem;
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

const LogoPictureImg = styled.img`
  width: 7rem;
  height: 5rem;
`;

const WellnessCoachTitleImg = styled.img`
  width: 35.4rem;
  height: 4.2rem;
  cursor: pointer;
`;

const LogoutImg = styled.img`
  width: 3rem;
  height: 3rem;
`;
