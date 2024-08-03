import MealRed from '../../assets/img/MealRed.png';
import MealYellow from '../../assets/img/MealYellow.png';
import MealGreen from '../../assets/img/MealGreen.png';
import MealGray from '../../assets/img/MealGray.png';

import DrinkRed from '../../assets/img/DrinkRed.png';
import DrinkYellow from '../../assets/img/DrinkYellow.png';
import DrinkGreen from '../../assets/img/DrinkGreen.png';
import DrinkGray from '../../assets/img/DrinkGray.png';

import SnackRed from '../../assets/img/SnackRed.png';
import SnackYellow from '../../assets/img/SnackYellow.png';
import SnackGreen from '../../assets/img/SnackGreen.png';
import SnackGray from '../../assets/img/SnackGray.png';

import SirenIcon from '../../assets/img/SirenIcon.png';
import OffSirenIcon from '../../assets/img/OffSirenIcon.png';
import styled from 'styled-components';
import React, { useState } from 'react';

function TestResultBody() {
  const data = {
    BREAKFAST: [
      { score: 8 },
      {
        menuName: '소금빵',
        sugar: 1,
        grain: 0,
        redmeat: 1,
        carbohydrate: 1,
        solution:
          '소금빵은으느나어더야ㅓㅐㅓㅐ냐ㅓㄹ내러냐ㅐ러내ㅑㅓ랸어랸얼냐ㅐㅓ랴너야래ㅜㄿ야너ㅐㅓ랴구ㅐㄹ아ㅡ래너ㅐㅡㅇ라ㅐㅈ더래으ㅡ차내들ㅇ',
      },
      {
        menuName: '시리얼',
        sugar: 1,
        grain: 1,
        redmeat: 1,
        carbohydrate: 1,
        solution:
          '시리얼은으느나어더야ㅓㅐㅓㅐ냐ㅓㄹ내러냐ㅐ러내ㅑㅓ랸어랸얼냐ㅐㅓ랴너야래ㅜㄿ야너ㅐㅓ랴구ㅐㄹ아ㅡ래너ㅐㅡㅇ라ㅐㅈ더래으ㅡ차내들ㅇ',
      },
      {
        menuName: '라면',
        sugar: 1,
        grain: 1,
        redmeat: 1,
        carbohydrate: 1,
        solution:
          '라면은으느나어더야ㅓㅐㅓㅐ냐ㅓㄹ내러냐ㅐ러내ㅑㅓ랸어랸얼냐ㅐㅓ랴너야래ㅜㄿ야너ㅐㅓ랴구ㅐㄹ아ㅡ래너ㅐㅡㅇ라ㅐㅈ더래으ㅡ차내들ㅇ여여여여여여여여여여여여여여여여여ㅇ뇨여뇽녕ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
      },
    ],
    LUNCH: [
      { score: 1 },
      { menuName: '햄버거', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '햄버거는~~' },
    ],
    DINNER: [{ score: 9 }, { menuName: '피자', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '피자는~~' }],
    SNACK: [
      { score: 5 },
      {
        menuName: '과자',
        sugar: 1,
        grain: 1,
        redmeat: 1,
        carbohydrate: 1,
        solution:
          '과자는 정말 맛있지 안그래? 그랙안 그랙안 그랙안 그랙안 그랙안 그랙안 그랙안그랙안그랙안  그랙안 그랙안그랙안 그랙안그랙안그랙안그랙안그랙안그랙안그랙안그랙안그랙안v',
      },
    ],
    DRINK: [{ score: 9 }, { menuName: '콜라', sugar: 1, solution: '콜라는~~' }],
  };

  const processMealData = (mealData) => {
    if (!Array.isArray(mealData) || mealData.length < 2)
      return { sugar: [], grain: [], redmeat: [], carbohydrate: [], solutions: [] };

    const result = {
      sugar: [],
      grain: [],
      redmeat: [],
      carbohydrate: [],
      solutions: [],
    };

    for (let i = 1; i < mealData.length; i++) {
      const menu = mealData[i];
      if (menu.sugar) result.sugar.push(menu.menuName);
      if (menu.grain) result.grain.push(menu.menuName);
      if (menu.redmeat) result.redmeat.push(menu.menuName);
      if (menu.carbohydrate) result.carbohydrate.push(menu.menuName);
      if (menu.solution) result.solutions.push(menu.solution);
    }

    return result;
  };

  const getIconForMealType = (mealType, score) => {
    if (mealType === 'BREAKFAST' || mealType === 'LUNCH' || mealType === 'DINNER') {
      if (score >= 7) return MealGreen;
      if (score >= 4) return MealYellow;
      return MealRed;
    }
    if (mealType === 'SNACK') {
      if (score >= 7) return SnackGreen;
      if (score >= 4) return SnackYellow;
      return SnackRed;
    }
    if (mealType === 'DRINK') {
      if (score >= 7) return DrinkGreen;
      if (score >= 4) return DrinkYellow;
      return DrinkRed;
    }
    return MealGray; // default icon
  };

  const getColorForScore = (score) => {
    if (score >= 7) return '#5AC451';
    if (score >= 4) return '#FFD700';
    return '#FF5656';
  };

  const Siren = ({ type, data }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <SirenContainer onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        <SirenIconImg src={SirenIcon} alt={`${type} 사이렌 아이콘`} />
        <SirenName>{type}</SirenName>
        {showTooltip && (
          <Tooltip>
            {data.map((item, index) => (
              <TooltipItem key={index}>{item}</TooltipItem>
            ))}
          </Tooltip>
        )}
      </SirenContainer>
    );
  };

  const renderSirens = (data) => (
    <SirensContainer>
      {data.sugar.length > 0 ? (
        <Siren type="단순당" data={data.sugar} />
      ) : (
        <SirenContainer>
          <SirenIconImg src={OffSirenIcon} alt="꺼진 사이렌 아이콘" />
          <SirenName>{'단순당'}</SirenName>
        </SirenContainer>
      )}
      {data.grain.length > 0 ? (
        <Siren type="정제곡물" data={data.grain} />
      ) : (
        <SirenContainer>
          <SirenIconImg src={OffSirenIcon} alt="꺼진 사이렌 아이콘" />
          <SirenName>{'정제곡물'}</SirenName>
        </SirenContainer>
      )}
      {data.redmeat.length > 0 ? (
        <Siren type="적색육" data={data.redmeat} />
      ) : (
        <SirenContainer>
          <SirenIconImg src={OffSirenIcon} alt="꺼진 사이렌 아이콘" />
          <SirenName>{'적색육'}</SirenName>
        </SirenContainer>
      )}
      {data.carbohydrate.length > 0 ? (
        <Siren type="탄수화물" data={data.carbohydrate} />
      ) : (
        <SirenContainer>
          <SirenIconImg src={OffSirenIcon} alt="꺼진 사이렌 아이콘" />
          <SirenName>{'탄수화물'}</SirenName>
        </SirenContainer>
      )}
    </SirensContainer>
  );

  const renderSirensForDrink = (data) => (
    <SirensContainer>
      {data.sugar.length > 0 ? (
        <Siren type="단순당" data={data.sugar} />
      ) : (
        <SirenContainer>
          <SirenIconImg src={OffSirenIcon} alt="꺼진 사이렌 아이콘" />
          <SirenName>{'단순당'}</SirenName>
        </SirenContainer>
      )}
    </SirensContainer>
  );


  const renderSolutions = (solutions) =>
    solutions.map((solution, index) => <SolutionDetail key={index}>{solution}</SolutionDetail>);

  const MealSection = ({ mealType, timeName }) => {
    const mealData = processMealData(data[mealType]);
    const score = data[mealType][0].score;

    return (
      <ResultDetailContainer>
        <LevelContainer>
          <LevelLabelContainer>
            <TimeName>{timeName}</TimeName>
            <LevelIcon src={getIconForMealType(mealType, score)} alt={`${mealType} 아이콘`} />
          </LevelLabelContainer>
          {renderSirens(mealData)}
          <Score score={score} color={getColorForScore(score)}>
            {score}점
          </Score>
        </LevelContainer>
        <FoodResultDetailWrapper>
          <MealSolutionDetail>{renderSolutions(mealData.solutions)}</MealSolutionDetail>
        </FoodResultDetailWrapper>
        <RecommendationBtnWrapper>
          <RecommendationBtn>추천 더보기</RecommendationBtn>
        </RecommendationBtnWrapper>
      </ResultDetailContainer>
    );
  };

  const SnackSection = ({ snackData }) => {
    const mealData = processMealData(snackData);
    const score = snackData[0].score;

    return (
      <SubResultContainer>
        <SubTimeName>간식</SubTimeName>
        <SubScore score={score} color={getColorForScore(score)}>
          {score}점
        </SubScore>
        <LevelUiContainer>
          <LevelIcon src={getIconForMealType('SNACK', score)} alt={`간식 아이콘`} />
          {renderSirens(mealData)}
        </LevelUiContainer>
        <SubResultDetailWrapper>
          <SubSolutionDetail>{renderSolutions(mealData.solutions)}</SubSolutionDetail>
        </SubResultDetailWrapper>
        <SubRecommendationBtn>추천 더보기</SubRecommendationBtn>
      </SubResultContainer>
    );
  };

  const DrinkSection = ({ drinkData }) => {
    const mealData = processMealData(drinkData);
    const score = drinkData[0].score;

    return (
      <SubResultContainer>
        <SubTimeName>음료</SubTimeName>
        <SubScore score={score} color={getColorForScore(score)}>
          {score}점
        </SubScore>
        <LevelUiContainer>
          <LevelIcon src={getIconForMealType('DRINK', score)} alt={`음료 아이콘`} />
          {renderSirensForDrink(mealData)}
        </LevelUiContainer>
        <SubResultDetailWrapper>
          <SubSolutionDetail>{renderSolutions(mealData.solutions)}</SubSolutionDetail>
        </SubResultDetailWrapper>
        <SubRecommendationBtn>추천 더보기</SubRecommendationBtn>
      </SubResultContainer>
    );
  };

  return (
    <TestResultBodyContainer>
      <MealSections>
        <MealSection mealType="BREAKFAST" timeName="아침" />
        <MealSection mealType="LUNCH" timeName="점심" />
        <MealSection mealType="DINNER" timeName="저녁" />
      </MealSections>
      <ServeMenuResultContainer>
        <SnackSection snackData={data.SNACK} />
        <DrinkSection drinkData={data.DRINK} />
      </ServeMenuResultContainer>
    </TestResultBodyContainer>
  );
}

export default TestResultBody;

const TestResultBodyContainer = styled.div`
  margin-top: 5.8rem;
  width: 111.2rem;
  display: flex;
  flex-direction: column;
`;

const MealSections = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LevelIcon = styled.img`
  width: 14rem;
  height: 12.8rem;
`;
const Score = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-size: 5.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 47rem;
  color: ${(props) => props.color};
`;

const SubScore = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-size: 5.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  top: 4rem;
  left: 38rem;
  color: ${(props) => props.color};
`;

const SirensContainer = styled.div`
  margin-top: 10rem;
  padding-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  width: 22rem;
  align-items: flex-end;
  height: 100%;
`;
const SirenContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.3rem;
`;
const SirenIconImg = styled.img`
  width: 3.8rem;
  height: 4.3rem;
`;
const SirenName = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;
const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f4f2f2;
  color: black;
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: nowrap;
`;
const TooltipItem = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  white-space: nowrap;
  margin: 0.5rem;
`;
const SolutionDetail = styled.p`
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.5rem;
  margin-bottom: 3rem;
`;

const ServeMenuResultContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ResultDetailContainer = styled.div`
  width: 100%;
  border-radius: 50px;
  background: #f4f2f2;
  margin-bottom: 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TimeName = styled.p`
  color: #000;
  text-align: center;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-right: 2rem;
`;

const LevelContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  margin-top: 4.6rem;
  margin-bottom: 3.5rem;
`;

const LevelLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 3.4rem;
  gap: 2rem;
`;

const FoodResultDetailWrapper = styled.div`
  width: 90%;
  padding: 0rem 5rem;
  margin-bottom: 5rem;
`;

const MealSolutionDetail = styled.div`
  width: 100%;
`;

const SubTimeName = styled.p`
  color: #000;
  text-align: center;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  position: absolute;
  top: 4.4rem;
  left: 6rem;
`;

const LevelUiContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 90%;
  gap: 1rem;
  margin-top: 12rem;
`;

const SubResultContainer = styled.div`
  width: 53.1rem;
  border-radius: 50px;
  background: #f4f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SubResultDetailWrapper = styled.div`
  width: 90%;
  padding: 0rem 5rem;
  margin-bottom: 5rem;
`;

const SubSolutionDetail = styled.div`
  margin-top: 6.5rem;
  width: 100%;
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const RecommendationBtnWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 3.8em;
`;

const RecommendationBtn = styled.button`
  width: 17rem;
  height: 4rem;
  border-radius: 25px;
  border: 2px solid #a6cd7e;
  background: #f9f9f9;
  color: #000;
  text-align: center;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SubRecommendationBtn = styled.button`
  position: absolute;
  top: 90%;
  left: 56%;
  width: 17rem;
  height: 4rem;
  border-radius: 25px;
  border: 2px solid #a6cd7e;
  background: #f9f9f9;
  color: #000;
  text-align: center;
  font-size: 1.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
