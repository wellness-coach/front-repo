import React, { useState } from 'react';
import styled from 'styled-components';

// img
import mealred from '../../assets/TestResultAssets/MealRed.png';
import mealyellow from '../../assets/TestResultAssets/MealYellow.png';
import mealgreen from '../../assets/TestResultAssets/MealGreen.png';
import mealgray from '../../assets/TestResultAssets/MealGray.png';

import drinkred from '../../assets/TestResultAssets/DrinkRed.png';
import drinkyellow from '../../assets/TestResultAssets/DrinkYellow.png';
import drinkgreen from '../../assets/TestResultAssets/DrinkGreen.png';
import drinkgray from '../../assets/TestResultAssets/DrinkGray.png';

import snackred from '../../assets/TestResultAssets/SnackRed.png';
import snackyellow from '../../assets/TestResultAssets/SnackYellow.png';
import snackgreen from '../../assets/TestResultAssets/SnackGreen.png';
import snackgray from '../../assets/TestResultAssets/SnackGray.png';

import sirenicon from '../../assets/TestResultAssets/Siren.png';

const processMealData = (mealData) => {
  if (!Array.isArray(mealData) || mealData.length < 2) {
    return { sugar: [], grain: [], redmeat: [], salt: [], solutions: [] };
  }

  const result = {
    sugar: [],
    grain: [],
    redmeat: [],
    salt: [],
    solutions: [],
  };

  for (let i = 1; i < mealData.length; i++) {
    const menu = mealData[i];
    if (menu.sugar) result.sugar.push(menu.menuName);
    if (menu.grain) result.grain.push(menu.menuName);
    if (menu.redmeat) result.redmeat.push(menu.menuName);
    if (menu.salt) result.salt.push(menu.menuName);
    if (menu.solution) result.solutions.push(menu.solution);
  }

  return result;
};

const getIconForMealType = (mealType, score) => {
  if (mealType === 'BREAKFAST' || mealType === 'LUNCH' || mealType === 'DINNER') {
    if (score === undefined) return mealgray;
    if (score >= 7) return mealgreen;
    if (score >= 4) return mealyellow;
    return mealred;
  }
  if (mealType === 'SNACK') {
    if (score === undefined) return snackgray;
    if (score >= 7) return snackgreen;
    if (score >= 4) return snackyellow;
    return snackred;
  }
  if (mealType === 'DRINK') {
    if (score === undefined) return drinkgray;
    if (score >= 7) return drinkgreen;
    if (score >= 4) return drinkyellow;
    return drinkred;
  }
  return mealgray;
};

const getColorForScore = (score) => {
  if (score >= 7) return '#78A55A';
  if (score >= 4) return '#D8C317';
  return '#F15C5C';
};

const renderDrinkSolutionMessage = (score) => {
  if (score === undefined) return '물을 자주 마셔보세요! 건강을 위한 좋은 습관입니다 :)';
  if (score >= 7) return '당 섭취를 줄이는데 좋은 음료예요.';
  if (score >= 4) return '건강한 음료와 번갈아 마셔보세요.';
  return '당분 섭취를 줄이기 위해 무가당 음료를 선택하세요.';
};

const Siren = ({ type, data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <SirenContainer onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <SirenIcon src={sirenicon} alt={`${type} 사이렌 아이콘`} />
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
    {data.sugar.length > 0 && <Siren type="단순당" data={data.sugar} />}
    {data.grain.length > 0 && <Siren type="정제곡물" data={data.grain} />}
    {data.redmeat.length > 0 && <Siren type="적색육" data={data.redmeat} />}
    {data.salt.length > 0 && <Siren type="나트륨" data={data.salt} />}
  </SirensContainer>
);

const renderSolutions = (solutions) =>
  solutions.map((solution, index) => <SolutionDetail key={index}>{solution}</SolutionDetail>);

const MealSection = ({ mealType, timeName, data }) => {
  const mealData = data;
  const processedMealData = processMealData(mealData);
  const score = mealData[0]?.score;

  return (
    <ResultDetailContainer>
      <LevelLeftContainer>
        <TimeName>{timeName}</TimeName>
        <LevelIcon src={getIconForMealType(mealType, score)} alt={`${mealType} 아이콘`} />
      </LevelLeftContainer>
      <FoodResultDetailContainer>
        <DetailTopContainer>
          {score === undefined ? null : renderSirens(processedMealData)}
          <Score score={score}>{score === undefined ? '' : `${score}점`}</Score>
        </DetailTopContainer>
        <MealSolutionDetail>
          {mealData[1]?.solution ? (
            renderSolutions([mealData[1].solution])
          ) : (
            <SolutionDetail>
              '식사를 안하셨네요 :) 식사를 자주 거르면 신체에 필요한 에너지를 공급받지 못해 집중력이 떨어지고 신체
              능력이 저하될 수 있어요. 끼니를 거른 뒤에는 균형있는 식사를 통해 영양분을 보충해주세요! '
            </SolutionDetail>
          )}
        </MealSolutionDetail>
      </FoodResultDetailContainer>
    </ResultDetailContainer>
  );
};

const SnackSection = ({ snackData }) => {
  const processedSnackData = processMealData(snackData);
  const score = snackData[0]?.score;

  return (
    <SnackResultContainer>
      <ServeLevelLeftContainer>
        <ServeTimeName>간식</ServeTimeName>
        <LevelIcon src={getIconForMealType('SNACK', score)} alt={`간식 아이콘`} />
      </ServeLevelLeftContainer>
      <SnackFoodResultDetailContainer>
        <SnackDetailTopContainer>
          {score === undefined ? null : renderSirens(processedSnackData)}
          <Score score={score}>{score === undefined ? '' : `${score}점`}</Score>
        </SnackDetailTopContainer>
        <SnackSolutionDetail>
          {snackData[1]?.solution ? (
            renderSolutions([snackData[1].solution])
          ) : (
            <SolutionDetail>간식을 줄이는 노력 덕분에 더욱 건강해지고 있어요 :)</SolutionDetail>
          )}
        </SnackSolutionDetail>
      </SnackFoodResultDetailContainer>
    </SnackResultContainer>
  );
};

const DrinkSection = ({ drinkData }) => {
  const processedDrinkData = processMealData(drinkData);
  const score = drinkData[0]?.score;

  return (
    <DrinkResultContainer>
      <ServeLevelLeftContainer>
        <ServeTimeName>음료</ServeTimeName>
        <LevelIcon src={getIconForMealType('DRINK', score)} alt={`음료 아이콘`} />
      </ServeLevelLeftContainer>
      <DrinkFoodResultDetailContainer>
        <DrinkDetailTopContainer>
          {score === undefined ? null : renderSirens(processedDrinkData)}
          <Score score={score}>{score === undefined ? '' : `${score}점`}</Score>
        </DrinkDetailTopContainer>
        {/* <DrinkSolutionDetail>
          {drinkData[1]?.solution ? (
            renderSolutions([drinkData[1].solution])
          ) : (
            <SolutionDetail>물을 자주 마셔보세요! 건강을 위한 좋은 습관입니다 :)</SolutionDetail>
          )}
        </DrinkSolutionDetail>{' '} */}
        <DrinkSolutionDetail>
          <SolutionDetail>{renderDrinkSolutionMessage(score)}</SolutionDetail>{' '}
        </DrinkSolutionDetail>
      </DrinkFoodResultDetailContainer>
    </DrinkResultContainer>
  );
};

const RightResult = ({ data }) => {
  return !data ? (
    <MenuResultContainer>
      <SolutionDetail>검사를 하지 않았습니다.</SolutionDetail>
    </MenuResultContainer>
  ) : (
    <MenuResultContainer>
      <MealSections>
        <MealSection mealType="BREAKFAST" timeName="아침" data={data.meals.BREAKFAST} />
        <MealSection mealType="LUNCH" timeName="점심" data={data.meals.LUNCH} />
        <MealSection mealType="DINNER" timeName="저녁" data={data.meals.DINNER} />
      </MealSections>
      <ServeMenuResultContainer>
        <SnackSection snackData={data.meals.SNACK} />
        <DrinkSection drinkData={data.meals.DRINK} />
      </ServeMenuResultContainer>
    </MenuResultContainer>
  );
};
export default RightResult;

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
  font-weight: 600;
  line-height: 3rem;
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
  cursor: pointer;
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
  background-color: rgba(255, 233, 116, 0.5);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(20px);
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
  border-radius: 16px;
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
  border-radius: 20px;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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
  overflow-y: auto;
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
  border-radius: 20px;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ServeMenuResultContainer = styled.div`
  display: flex;
`;

const SnackDetailTopContainer = styled.div`
  width: 24rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SnackResultContainer = styled.div`
  width: 35.5rem;
  height: 15.2rem;
  border-radius: 16px;
  background: #f4f1da;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
`;

const SnackSolutionDetail = styled.div`
  width: 22rem;
  height: 5rem;
  overflow-y: auto;
`;

const SnackFoodResultDetailContainer = styled.div``;

// 음료
const DrinkResultContainer = styled.div`
  width: 24rem;
  height: 15.2rem;
  border-radius: 16px;
  background: #f4f1da;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5rem);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const DrinkDetailTopContainer = styled.div`
  width: 10rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DrinkSolutionDetail = styled.div`
  width: 9rem;
  height: 5rem;
  overflow-y: auto;
`;

const DrinkFoodResultDetailContainer = styled.div``;
