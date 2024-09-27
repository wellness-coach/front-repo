# 💪 Wellness Coach_FE

![service](https://github.com/user-attachments/assets/9f2c8c78-7fe5-4c31-b76e-5bca78e9a56b)
**생성형 AI 기반 저속노화 식단 관리 서비스, Wellness Coach 프론트엔드 레포지토리입니다.**

- 배포 URL : https://wellness-coach.vercel.app
  <br/>
  <br/>

## 🍅 페이지/기능 상세

1. **로그인 페이지**
   ![login](https://github.com/user-attachments/assets/40c33a0a-9828-46ea-a072-f2f05e9f851b)

- 구글 로그인 구현
  <br/> <br/>

2. **메인 페이지**
   ![main](https://github.com/user-attachments/assets/91dfdc4f-a2e3-4b6f-ad80-0e78707b1c65)

- 지난 주 평균 노화 속도계 -> 클릭 시 일별 리포트 페이지로 이동
- 오늘의 식단 진단하기 / 오늘의 결과 보러가기 버튼 -> 검사 페이지 / 오늘 결과 페이지로 이동
- 저속 노화 관련 소식
- 제품 스크랩 목록
  <br/> <br/>

3. **검사 페이지**
   ![test](https://github.com/user-attachments/assets/e70d4fba-b4c3-464f-b0f0-64403e1ac03b)

- 식단 기록
- 메뉴 추가 및 삭제
- 임시저장 및 제출
  <br/> <br/>

4. **로딩 페이지**
   ![loading](https://github.com/user-attachments/assets/be2d2b36-4d52-471b-83c3-78eabb0ecc71)
   <br/> <br/>

5. **오늘 결과 페이지**
   ![resultmain](https://github.com/user-attachments/assets/84a760be-3e12-4b0d-8cb5-99077cfe0865)
   ![testresult](https://github.com/user-attachments/assets/cd6e4452-8ad2-4d4f-9b1f-2410d6c87ef6)

- 오늘 식단의 노화 속도계
- AI 기반 식단 별 노화 단계 및 문제 성분 식별
- 대체 재료 추천
- '제품 보러가기' 클릭 시 네이버 쇼핑 페이지로 이동
  <br/>
  <br/>

6. **일별 리포트 페이지**
   ![dailyresult](https://github.com/user-attachments/assets/483e865c-180f-4624-95f7-9ef46f3c5635)
   ![dailyresult](https://github.com/user-attachments/assets/55d15652-36fd-4d78-b53b-36d6007a1632)

- 지난 리포트 모아보기
  <br /> <br/>

<!-- ## 기술 스택 -->

<h2> 🛠 기술스택 </h2>

| 역할                 | 종류                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                |
| Programming Language | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)                                                                                             |
| Styling              | ![styled-components](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                            |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)                                                                                                                |
| Formatting           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) |
| Package Manager      | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)                                                                                                                   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |

<br />

## 🤝 Convention

### ✍️ Code Convention

<details>
<summary>폴더 트리 구조</summary>
  <br/>
 - 페이지 별 하나의 폴더 할당
 - 같은 페이지를 이루는 파일들끼리 묶음
 - 폴더 속 최상단의 컴포넌트는 속한 폴더의 이름과 같도록 한다. (ex. MainPage.jsx in MainPage folder)
  
```
📦 HACKERTHON_FE
└─ Wellness-coach_FE
   ├─ public 🦁 로고 이미지 폴더
   ├─ src 
   │  ├─ assets 🖼️ 컴포넌트에서 사용될 이미지 폴더
   │  ├─ pages 
   │  │  ├─ Login (1) 로그인 페이지
   │  │  ├─ MainPage (2) 메인페이지
   │  │  ├─ DietTest (3) 식단 진단 검사 페이지
   │  │  ├─ TestResult (4) 식단 진단 검사 결과 페이지
   │  │  └─ DailyResult (5) 일별 진단 결과 확인 페이지
   │  ├─ App.jsx 
   │  ├─ GlobalStyles.js 🖼️ 전역 스타일링 파일
   │  ├─ main.jsx
   │  ├─ reset.css  🎨 스타일링 리셋 파일
   |  └─ Router.jsx 🧭 라우터 파일
   ├─ eslintrc.cjs
   ├─ .gitignore
   ├─ index.html
   ├─ package.json
   ├─ README.md
   ├─ vite.config.js
   └─ yarn.lock
```
</details>

<details>
<summary>주요 규칙</summary>

<h4>네이밍 규칙</h4> 
- 기본 표기법
<br/>

| 네이밍 규칙              | 내용                                                        |
| ------------------------ | ----------------------------------------------------------- |
| 카멜 케이스(camelCase)   | 폴더명, js 파일, css 파일, 변수명, 함수명                   |
| 파스칼케이스(PascalCase) | React 파일명, React 코드내 컴포넌트 선언(ex. <PascalCase/>) |
| 케밥 케이스(Kebab-case)  | 태그의 클래스 or 아이디명                                   |

<br/>

- 컴포넌트 파일 작성: 함수 선언식으로 작성 (ex. function Component)
- 내부 함수: 화살표 함수
- Styled-Components 네이밍
  두 개 이상의 개체를 포함하고 있는 개체 = container
  하나의 개체를 포함하고 있는 개체 = wrapper
- button은 btn으로 축약 (ex. LoginButton -> LoginBtn)
- 함수 네이밍: camelCase (ex. addDietTip)
- handler함수명: handle~ (ex. handleDelete)
- 단위: border, border-radius는 px 사용, 나머지 property는 rem 사용
- let 사용 지양

</details>

### 🫙 Git Convention

<details>
  <summary>commit 규칙</summary>

| 태그   | 내용                                                                  |
| ------ | --------------------------------------------------------------------- |
| add    | 새로운 기능 or 컴포넌트를 추가                                        |
| design | CSS 코드 수정                                                         |
| fix    | 버그 수정                                                             |
| Docs   | 문서 수정                                                             |
| Chore  | 패키지 매니저 수정, 패키지 관리자 구성 등 Production Code 이외의 변경 |
| Remove | 파일 수정                                                             |

<b>"태그: 커밋 내용"의 형식으로 작성해주세요!</b>
<br/>
ex) add: 로그인 컴포넌트 추가, Chore: eslint extension 수정

</details>

<details>
  <summary>PR 규칙</summary>
<h4>PR 주의사항</h4>
  - 최대한 자세하게 내용을 기재해주세요
  <br/>
  - 작업한 파일 이외의 파일에 수정을 했는지 확인하고 PR 날려주세요 
</details>
