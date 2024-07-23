import React from "react";
import styled from "styled-components";
import centerimg from "../assets/img/loginCenterImg.png";
import googleimg from "../assets/img/googleImg.png";
import naverimg from "../assets/img/naverImg.png";
// import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <LoginPg>
        <LoginSc>
          <LoginTop>
            <ServiceIntroSc>
              <SmallServiceM>작은 서비스 설명 문구</SmallServiceM>
              <ServiceName>Wellness coach</ServiceName>
              <BigServiceM>서비스 설명 문구</BigServiceM>
            </ServiceIntroSc>

            <LoginForm>
              <LoginToNaver>
                <NaverImg src={naverimg} alt="네이버이미지" />
                <LoginM>네이버로 로그인</LoginM>
              </LoginToNaver>
              <LoginToGoogle>
                <GoogleImg src={googleimg} alt="구글이미지" />
                <LoginM>구글로 로그인</LoginM>
              </LoginToGoogle>
            </LoginForm>
          </LoginTop>
        </LoginSc>

        <LoginCenterImg src={centerimg} alt="메인이미지" />
      </LoginPg>
    </>
  );
}

export default Login;

const LoginPg = styled.section`
  display: flex;
  background-color: #e2e2e2;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 메인 이미지
const LoginCenterImg = styled.img`
  width: 79rem;
  height: 50rem;

  border-radius: 4rem 0rem 0rem 4rem;
  margin-right: 0rem;
`;

// 서비스 설명 섹션
const LoginTop = styled.section``;
const ServiceIntroSc = styled.section`
  margin-bottom: 3.8rem;
  /* background-color: blue; */
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

// 로그인 입력 섹션
const LoginSc = styled.section`
  /* background-color: #be1894; */
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 150px; */

  /* background-color: blue; */
`;
const LoginM = styled.p`
  font-size: 1.7rem;
  font-weight: 600;
`;
const LoginToNaver = styled.div`
  background-color: #45b649;
  width: 35.6rem;
  height: 4.4rem;
  border-radius: 1.5rem;
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;
const LoginToGoogle = styled.div`
  background-color: #fff;
  width: 35.6rem;
  height: 4.4rem;
  border-radius: 1.5rem;
  padding-left: 0.8rem;
  display: flex;
  align-items: center;
`;
const NaverImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  cursor: pointer;
  margin: 0.6rem;
`;
const GoogleImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0.6rem;
`;
