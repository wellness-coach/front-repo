import styled from 'styled-components';

import MealRed from '../../assets/TestResultAssets/MealRed.png';
import MealYellow from '../../assets/TestResultAssets/MealYellow.png';
import MealGreen from '../../assets/TestResultAssets/MealGreen.png';
import MealGray from '../../assets/TestResultAssets/MealGray.png';

import DrinkRed from '../../assets/TestResultAssets/DrinkRed.png';
import DrinkYellow from '../../assets/TestResultAssets/DrinkYellow.png';
import DrinkGreen from '../../assets/TestResultAssets/DrinkGreen.png';
import DrinkGray from '../../assets/TestResultAssets/DrinkGray.png';

import SnackRed from '../../assets/TestResultAssets/SnackRed.png';
import SnackYellow from '../../assets/TestResultAssets/SnackYellow.png';
import SnackGreen from '../../assets/TestResultAssets/SnackGreen.png';
import SnackGray from '../../assets/TestResultAssets/SnackGray.png';

import SirenIcon from '../../assets/TestResultAssets/Siren.png';
import OffSirenIcon from '../../assets/TestResultAssets/OffSirenIcon.png';

import { useState } from 'react';

const ResultDetailSection = ({ data, mealType, timeName }) => {
  const fetchedData = data.meals;
  console.log(timeName);

  const processMealData = (mealData) => {
    if (!Array.isArray(mealData) || mealData.length < 2)
      return { sugar: [], grain: [], redmeat: [], salt: [], solutions: [] };

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

  const mealData = fetchedData[mealType];
  const processedMealData = processMealData(mealData);
  const score = mealData[0]?.score;

  const getIconForMealType = (mealType, score) => {
    if (mealType === 'BREAKFAST' || mealType === 'LUNCH' || mealType === 'DINNER') {
      if (score === undefined) return MealGray;
      if (score >= 7) return MealGreen;
      if (score >= 4) return MealYellow;
      return MealRed;
    }
    if (mealType === 'SNACK') {
      if (score === undefined) return SnackGray;
      if (score >= 7) return SnackGreen;
      if (score >= 4) return SnackYellow;
      return SnackRed;
    }
    if (mealType === 'DRINK') {
      if (score === undefined) return DrinkGray;
      if (score >= 7) return DrinkGreen;
      if (score >= 4) return DrinkYellow;
      return DrinkRed;
    }
    return MealGray; // default icon
  };

  const getColorForScore = (score) => {
    if (score >= 7) return '#78A55A';
    if (score >= 4) return '#D8C317';
    return '#F15C5C';
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
      {data.sugar.length > 0 && <Siren type="단순당" data={data.sugar} />}
      {data.grain.length > 0 && <Siren type="정제곡물" data={data.grain} />}
      {data.redmeat.length > 0 && <Siren type="적색육" data={data.redmeat} />}
      {data.salt.length > 0 && <Siren type="나트륨" data={data.salt} />}
    </SirensContainer>
  );

  const renderSolutions = (solutions) =>
    solutions.map((solution, index) => <SolutionDetail key={index}>{solution}</SolutionDetail>);

  return (
    <ResultDetailContainer>
      <TimeNameWrapper>
        <TimeName>{timeName}</TimeName>
      </TimeNameWrapper>

      <LevelContainer>
        <LevelIconContainer>
          <LevelIcon src={getIconForMealType(mealType, score)} alt={`${mealType} 아이콘`} />
          {score === undefined ? null : renderSirens(processedMealData)}
        </LevelIconContainer>
        <Score score={score} color={getColorForScore(score)}>
          {score === undefined ? '' : `${score}점`}
        </Score>
      </LevelContainer>
      <FoodResultDetailWrapper>
        {mealData.length > 0 ? (
          <MealSolutionDetail>{renderSolutions(processedMealData.solutions)}</MealSolutionDetail>
        ) : (
          <MealSolutionDetail>
            <SolutionDetail>
              식사를 안하셨네요 :) 식사를 자주 거르면 신체에 필요한 에너지를 공급받지 못해 집중력이 떨어지고 신체 능력이
              저하될 수 있어요. 끼니를 거른 뒤에는 균형있는 식사를 통해 영양분을 보충해주세요!
            </SolutionDetail>
          </MealSolutionDetail>
        )}
      </FoodResultDetailWrapper>
    </ResultDetailContainer>
  );
};

export default ResultDetailSection;

const ResultDetailContainer = styled.div`
  width: 111rem;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeNameWrapper = styled.div`
  width: 90%;
  padding-left: 4rem;
`

const TimeName = styled.p`
  color: #000;
  text-align: left;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Score = styled.div`
  padding-top: 3rem;
  text-align: center;
  font-size: 5.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.color};
`;

const LevelContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

const LevelIconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3rem;
  margin-top: 1.6rem;
  margin-bottom: 3.5rem;
`;

const LevelIcon = styled.img`
  width: 14rem;
  /* height: 12.8rem; */
`;

const FoodResultDetailWrapper = styled.div`
  width: 90%;
`;

const MealSolutionDetail = styled.div`
  width: 100%;
`;

const SirensContainer = styled.div`
  padding-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  /* width: 22rem; */
  align-items: flex-end;
  height: 100%;
  margin-bottom: 2rem;
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
  background-color: rgba(249, 248, 235, 0.5);

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
const SolutionDetail = styled.p`
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.5rem;
  margin-bottom: 3rem;
`;
