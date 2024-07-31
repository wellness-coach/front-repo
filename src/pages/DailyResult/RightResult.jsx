import React, { useState } from 'react';
import styled from 'styled-components';

// 이미지 import
import mealred from '../../assets/img/MealRed.png';
import mealyellow from '../../assets/img/MealYellow.png';
import mealgreen from '../../assets/img/MealGreen.png';
import mealgray from '../../assets/img/MealGray.png';

import drinkred from '../../assets/img/DrinkRed.png';
import drinkyellow from '../../assets/img/DrinkYellow.png';
import drinkgreen from '../../assets/img/DrinkGreen.png';
import drinkgray from '../../assets/img/DrinkGray.png';

import snackred from '../../assets/img/SnackRed.png';
import snackyellow from '../../assets/img/SnackYellow.png';
import snackgreen from '../../assets/img/SnackGreen.png';
import snackgray from '../../assets/img/SnackGray.png';

import sirenicon from '../../assets/img/siren.png';

const data = {
  BREAKFAST: [
    { score: 8 },
    { menuName: '소금빵', sugar: 1, grain: 0, redmeat: 1, carbohydrate: 1, solution: '소금빵은~~' },
    { menuName: '시리얼', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '시리얼은~~~' },
  ],
  LUNCH: [
    { score: 1 },
    { menuName: '햄버거', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '햄버거는~~' },
  ],
  DINNER: [{ score: 9 }, { menuName: '피자', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '피자는~~' }],
  SNACK: [{ score: 5 }, { menuName: '과자', sugar: 1, grain: 1, redmeat: 1, carbohydrate: 1, solution: '과자는~~' }],
  DRINK: [{ score: 9 }, { menuName: '콜라', sugar: 1, solution: '음료는~~' }],
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
    if (score >= 7) return mealgreen;
    if (score >= 4) return mealyellow;
    return mealred;
  }
  if (mealType === 'SNACK') {
    if (score >= 7) return snackgreen;
    if (score >= 4) return snackyellow;
    return snackred;
  }
  if (mealType === 'DRINK') {
    if (score >= 7) return drinkgreen;
    if (score >= 4) return drinkyellow;
    return drinkred;
  }
  return mealgray; // default icon
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
      <SirenIcon src={sirenicon} alt={`${type} 사이렌 아이콘`} />
      <SirenName>{type}</SirenName>
      {showTooltip && <Tooltip>{data.join(', ')}</Tooltip>}
    </SirenContainer>
  );
};

const renderSirens = (data) => (
  <SirensContainer>
    {data.sugar.length > 0 && <Siren type="단순당" data={data.sugar} />}
    {data.grain.length > 0 && <Siren type="정제곡물" data={data.grain} />}
    {data.redmeat.length > 0 && <Siren type="적색육" data={data.redmeat} />}
    {data.carbohydrate.length > 0 && <Siren type="탄수화물" data={data.carbohydrate} />}
  </SirensContainer>
);

const renderSolutions = (solutions) =>
  solutions.map((solution, index) => <SolutionDetail key={index}>{solution}</SolutionDetail>);

const MealSection = ({ mealType, timeName }) => {
  const mealData = processMealData(data[mealType]);
  const score = data[mealType][0].score;

  return (
    <ResultDetailContainer>
      <LevelLeftContainer>
        <TimeName>{timeName}</TimeName>
        <LevelIcon src={getIconForMealType(mealType, score)} alt={`${mealType} 아이콘`} />
      </LevelLeftContainer>
      <FoodResultDetailContainer>
        <DetailTopContainer>
          {renderSirens(mealData)}
          <Score score={score}>{score}점</Score>
        </DetailTopContainer>
        <MealSolutionDetail>{renderSolutions(mealData.solutions)}</MealSolutionDetail>
      </FoodResultDetailContainer>
    </ResultDetailContainer>
  );
};

const SnackSection = ({ snackData }) => {
  const mealData = processMealData(snackData);
  const score = snackData[0].score;

  return (
    <SnackResultContainer>
      <ServeLevelLeftContainer>
        <ServeTimeName>간식</ServeTimeName>
        <LevelIcon src={getIconForMealType('SNACK', score)} alt={`간식 아이콘`} />
      </ServeLevelLeftContainer>
      <SnackFoodResultDetailContainer>
        <SnackDetailTopContainer>
          {renderSirens(mealData)}
          <Score score={score}>{score}점</Score>
        </SnackDetailTopContainer>
        <SnackSolutionDetail>{renderSolutions(mealData.solutions)}</SnackSolutionDetail>
      </SnackFoodResultDetailContainer>
    </SnackResultContainer>
  );
};

const DrinkSection = ({ drinkData }) => {
  const mealData = processMealData(drinkData);
  const score = drinkData[0].score;

  return (
    <DrinkResultContainer>
      <ServeLevelLeftContainer>
        <ServeTimeName>음료</ServeTimeName>
        <LevelIcon src={getIconForMealType('DRINK', score)} alt={`음료 아이콘`} />
      </ServeLevelLeftContainer>
      <DrinkFoodResultDetailContainer>
        <DrinkDetailTopContainer>
          {renderSirens(mealData)}
          <Score score={score}>{score}점</Score>
        </DrinkDetailTopContainer>
        <DrinkSolutionDetail>{renderSolutions(mealData.solutions)}</DrinkSolutionDetail>
      </DrinkFoodResultDetailContainer>
    </DrinkResultContainer>
  );
};

function RightResult() {
  return (
    <MenuResultContainer>
      <MealSections>
        <MealSection mealType="BREAKFAST" timeName="아침" />
        <MealSection mealType="LUNCH" timeName="점심" />
        <MealSection mealType="DINNER" timeName="저녁" />
      </MealSections>
      <ServeMenuResultContainer>
        <SnackSection snackData={data.SNACK} />
        <DrinkSection drinkData={data.DRINK} />
      </ServeMenuResultContainer>
    </MenuResultContainer>
  );
}

export default RightResult;

// 공통
const MenuResultContainer = styled.div`
  width: 50%;
  padding-top: 16.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LevelIcon = styled.img`
  width: 9rem;
  height: 9rem;
`;
const Score = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: ${(props) => getColorForScore(props.score)};
`;
const SirensContainer = styled.div`
  padding-top: 0.8rem;
  display: flex;
`;
const SirenContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 4rem;
  margin: 0.3rem;
`;
const SirenIcon = styled.img`
  width: 2.5rem;
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
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  font-size: 0.9rem;
`;
const SolutionDetail = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6rem;
  color: black;
`;

// 아침, 점심, 저녁
const MealSections = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultDetailContainer = styled.div`
  width: 60.6rem;
  height: 15.2rem;
  border-radius: 1%.6rem;
  background: #f4f1da;
  box-shadow: 0rem 0.4rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
const TimeName = styled.p`
  background-color: #fff;
  width: 10.8rem;
  height: 2.8rem;
  border-radius: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.3rem;
`;
const LevelLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 14rem;
  height: 11rem;
  border-right: 1px solid #9f9f9f;
  margin-left: 0.7rem;
`;
const FoodResultDetailContainer = styled.div`
  margin-left: 1.6rem;
`;
const DetailTopContainer = styled.div`
  width: 40rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const MealSolutionDetail = styled.div`
  width: 40rem;
  height: 5rem;
`;

// 간식
const ServeLevelLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 11rem;
  margin-left: 0.7rem;
  margin-right: 1.2rem;
`;
const ServeTimeName = styled.div`
  background-color: #fff;
  width: 7.7rem;
  height: 2.8rem;
  border-radius: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.3rem;
`;
const ServeMenuResultContainer = styled.div`
  display: flex;
`;
const SnackDetailTopContainer = styled.div`
  width: 23rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const SnackResultContainer = styled.div`
  width: 35.5rem;
  height: 15.2rem;
  border-radius: 1.6rem;
  background: #f4f1da;
  box-shadow: 0rem 0.4rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
`;
const SnackSolutionDetail = styled.div`
  width: 22rem;
`;
const SnackFoodResultDetailContainer = styled.div``;

// 음료
const DrinkResultContainer = styled.div`
  width: 24rem;
  height: 15.2rem;
  border-radius: 1.6rem;
  background: #f4f1da;
  box-shadow: 0rem 0.4rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
const DrinkDetailTopContainer = styled.div`
  width: 9rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const DrinkSolutionDetail = styled.div`
  width: 9rem;
`;
const DrinkFoodResultDetailContainer = styled.div``;
