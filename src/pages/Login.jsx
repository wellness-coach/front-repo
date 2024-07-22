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
              <LoginToNaver src={naverimg} alt="네이버이미지" />
              <LoginToGoogle src={googleimg} alt="구글이미지" />
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
  width: 79em;
  height: 50em;

  border-radius: 4em 0em 0em 4em;
  margin-right: 0em;
`;

// 서비스 설명 섹션
const LoginTop = styled.section``;
const ServiceIntroSc = styled.section`
  margin-bottom: 3.8em;
  /* background-color: blue; */
`;
const SmallServiceM = styled.p`
  font-size: 2.5em;
  font-weight: 700;
  color: gray;
  margin-bottom: 5px;
`;
const ServiceName = styled.p`
  font-size: 5em;
  font-weight: 600;
  margin-bottom: 5px;
`;
const BigServiceM = styled.p`
  font-size: 5em;
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
  width: 150px;
  justify-content: space-between;
  /* background-color: blue; */
`;

const LoginToNaver = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
`;
const LoginToGoogle = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
`;
