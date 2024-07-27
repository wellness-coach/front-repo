import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import centerimg from '../../assets/img/loginCenterImg.png';
import googleimg from '../../assets/img/googleImg.png';
import naverimg from '../../assets/img/naverImg.png';

function Login() {
  const [user, setUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const onNaverLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/naver`;
  };

  const onGoogleLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/login`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTopContainer>
          <ServiceIntroContainer>
            <SmallServiceM>작은 서비스 설명 문구</SmallServiceM>
            <ServiceName>Wellness coach</ServiceName>
            <BigServiceM>서비스 설명 문구</BigServiceM>
          </ServiceIntroContainer>

          <LoginFormContainer>
            {user ? (
              <div>
                {/* 메인페이지로 이동 - 수정 */}
                <p>Welcome, {user.name}!</p>
              </div>
            ) : (
              <>
                <LoginToNaverContainer onClick={onNaverLogin}>
                  <NaverImg src={naverimg} alt="네이버 로그인" />
                  <LoginM>네이버로 로그인</LoginM>
                </LoginToNaverContainer>

                <LoginToGoogleContainer onClick={onGoogleLogin}>
                  <GoogleImg src={googleimg} alt="구글 로그인" />
                  <LoginM>구글로 로그인</LoginM>
                </LoginToGoogleContainer>
              </>
            )}
          </LoginFormContainer>
        </LoginTopContainer>
      </LoginWrapper>

      <LoginCenterImg src={centerimg} alt="메인 이미지" />
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.section`
  display: flex;
  background-color: #e2e2e2;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
`;

const LoginCenterImg = styled.img`
  width: 79rem;
  height: 50rem;
  border-radius: 4rem 0rem 0rem 4rem;
`;

const LoginTopContainer = styled.section``;

const ServiceIntroContainer = styled.section`
  margin-bottom: 3.8rem;
`;

const SmallServiceM = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: gray;
  margin-bottom: 0.5rem;
`;

const ServiceName = styled.p`
  font-size: 5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const BigServiceM = styled.p`
  font-size: 5rem;
  font-weight: 700;
`;

const LoginWrapper = styled.section`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginM = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
`;

const LoginToNaverContainer = styled.button`
  background-color: #45b649;
  width: 35.6rem;
  height: 4.4rem;
  border-radius: 1.5rem;
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  cursor: pointer;
`;

const LoginToGoogleContainer = styled.button`
  background-color: #fff;
  width: 35.6rem;
  height: 4.4rem;
  border-radius: 1.5rem;
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NaverImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  margin: 0.6rem;
`;

const GoogleImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  margin: 0.6rem;
`;
