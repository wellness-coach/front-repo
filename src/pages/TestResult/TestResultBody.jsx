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
import styled from 'styled-components';
import React, { useState } from 'react';

function TestResultBody({ fetchedData, onOpenDetailModal }) {
  const data = fetchedData.meals;

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

  const MealSection = ({ mealType, timeName }) => {
    const mealData = data[mealType];
    const score = mealData[0]?.score;

    return (
      <MealBox>
        <MealTitle>{timeName}</MealTitle>
        <MealLevel>
          <LevelIcon src={getIconForMealType(mealType, score)} alt={`${mealType} 아이콘`} />
          <Score score={score} color={getColorForScore(score)}>
            {score === undefined ? '' : `${score}점`}
          </Score>
        </MealLevel>
        <GoToDetailBtnWrapper>
          <GoToDetailBtn onClick={() => onOpenDetailModal(mealType)}>추천 더보기</GoToDetailBtn>
        </GoToDetailBtnWrapper>
      </MealBox>
    );
  };

  return (
    <TestResultBodyContainer>
      <MealsContainer>
        <MealSection mealType="BREAKFAST" timeName="아침" />
        <MealSection mealType="LUNCH" timeName="점심" />
        <MealSection mealType="DINNER" timeName="저녁" />
      </MealsContainer>
      <SubMealsContainer>
        <MealSection mealType="SNACK" timeName="간식" />
        <MealSection mealType="DRINK" timeName="음료" />
      </SubMealsContainer>
    </TestResultBodyContainer>
  );
}

export default TestResultBody;

const TestResultBodyContainer = styled.div`
  margin-top: 5.8rem;
  width: 106.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MealsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const MealBox = styled.div`
  width: 34rem;
  height: 36rem;
  border-radius: 50px;
  background: #f4f2f2;
  display: flex;
  flex-direction: column;
`;

const MealTitle = styled.p`
  color: #000;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 4rem;
  margin-left: 5.5rem;
`;

const MealLevel = styled.div`
  display: flex;
  margin: 2rem 3rem;
  justify-content: space-between;
`;

const LevelIcon = styled.img`
  width: 14rem;
  /* height: 12.8rem; */
`;
const Score = styled.div`
  font-size: 2.5rem;
  text-align: center;
  font-size: 5.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 3rem;
  padding-right: 1rem;
  color: ${(props) => props.color};
`;

const SubMealsContainer = styled.div`
  width: 70.4rem;
  display: flex;
  justify-content: space-between;
  margin-top: 2.1rem;
`;

const GoToDetailBtnWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const GoToDetailBtn = styled.button`
  width: 17rem;
  height: 4rem;
  border-radius: 25px;
  border: 2px solid #a6cd7e;
  background: #f9f9f9;
`;
