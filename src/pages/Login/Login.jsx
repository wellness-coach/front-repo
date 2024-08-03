import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import googleimg from '../../assets/LoginImg/googleImg.png';
import naverimg from '../../assets/LoginImg/naverImg.png';
import logoimg from '../../assets/LoginImg/LoginLogo.png';
import backgroundimg from '../../assets/LoginImg/LoginBackground.png';

function Login() {
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
      console.log(res);
    } catch (error) {
      alert(`error: ${error.message}`);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginTopContainer>
          <ServiceIntroContainer>
            <SmallServiceM>당신의 노화를 돌보는</SmallServiceM>
            <LogoImg src={logoimg} alt="로고 이미지" />
          </ServiceIntroContainer>

          <LoginFormContainer>
            <LoginToNaverContainer onClick={onNaverLogin}>
              <NaverImg src={naverimg} alt="네이버 로그인" />
              <LoginM>네이버로 로그인</LoginM>
            </LoginToNaverContainer>

            <LoginToGoogleContainer onClick={onGoogleLogin}>
              <GoogleImg src={googleimg} alt="구글 계정으로 로그인" />
              <LoginM>구글 계정으로 로그인</LoginM>
            </LoginToGoogleContainer>
          </LoginFormContainer>
        </LoginTopContainer>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.section`
  display: flex;
  background-image: url(${backgroundimg});
  background-size: cover;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
`;

const LoginTopContainer = styled.section``;

const ServiceIntroContainer = styled.section`
  margin-bottom: 3.8rem;
`;

const SmallServiceM = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  color: #5f553e;
  margin-bottom: -0.5rem;
`;

const LogoImg = styled.img`
  width: 42rem;
  height: 18.5rem;
  margin-bottom: -1rem;
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
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NaverImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin: 1rem 1.5rem 1rem 2.1rem;
`;

const GoogleImg = styled.img`
  width: 2.1rem;
  height: 2.1rem;
  margin: 1rem 1.2rem 1rem 1.9rem;
`;


