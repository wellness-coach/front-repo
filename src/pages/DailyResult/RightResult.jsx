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

// 데이터 샘플
const data = {
  userId: 2,
  date: '2024-08-01',
  memo: '맛있었다!!!',
  recentAgingType: 'CAUTION',
  todayAgingType: 'CAUTION',
  meals: {
    DINNER: [
      { score: 8 },
      {
        menuName: '우삼겹숙주찜',
        sugar: false,
        grain: false,
        redmeat: true,
        carbohydrate: false,
        solution:
          '우삼겹숙주찜은 저속노화에 도움이 되는 음식입니다. 이 음식은 숙주나물의 높은 항산화 성분과 우삼겹의 단백질이 결합되어 체내 염증을 줄이고 세포 재생을 촉진합니다. 저속노화를 더욱 촉진시키기 위해서는 신선한 숙주나물을 사용하고, 우삼겹의 지방을 적절히 제거하여 조리하는 것이 좋습니다. 또한, 조리 시 과도한 소금이나 소스를 피하고, 신선한 허브나 레몬즙을 활용해 맛을 더하는 것이 좋습니다.',
        productResponse: null,
      },
    ],
    BREAKFAST: [
      { score: 5 },
      {
        menuName: '초밥',
        sugar: false,
        grain: true,
        redmeat: false,
        carbohydrate: true,
        solution:
          '초밥의 경우, 흰쌀밥 대신 현미밥이나 퀴노아를 사용하면 가속노화를 줄일 수 있습니다. 또한, 생선 대신 아보카도, 두부, 채소 등을 활용한 비건 초밥을 만들어보세요.',
        productResponse: {
          productId: 82,
          targetProductName: '참치',
          productName: '연어',
          productLink: 'https://smartstore.naver.com/main/products/5621442966',
          scrap: false,
        },
      },
    ],
    SNACK: [],
    LUNCH: [
      { score: 2 },
      {
        menuName: '조각케이크',
        sugar: true,
        grain: true,
        redmeat: false,
        carbohydrate: true,
        solution:
          '조각케이크는 가속노화 음식이므로, 가속노화를 줄이기 위해 설탕을 대체할 수 있는 스테비아나 에리스리톨 같은 천연 감미료를 사용하고, 흰 밀가루 대신 아몬드 가루나 코코넛 가루를 사용하는 것이 좋습니다. 또한, 버터 대신 아보카도 오일이나 코코넛 오일을 사용해보세요.',
        productResponse: {
          productId: 83,
          targetProductName: '설탕',
          productName: '블루베리',
          productLink: 'https://smartstore.naver.com/main/products/343387698',
          scrap: false,
        },
      },
    ],
    DRINK: [
      { score: 5 },
      {
        menuName: '밀크티',
        sugar: false,
        solution: '당 섭취를 줄이고, 항산화 식품을 섭취하세요.',
        productResponse: {
          productId: 84,
          targetProductName: '우유',
          productName: '아몬드 우유',
          productLink: 'https://smartstore.naver.com/main/products/8894224469',
          scrap: false,
        },
      },
    ],
  },
};

// 헬퍼 함수
const processMealData = (mealData) => {
  if (!Array.isArray(mealData) || mealData.length < 2) {
    return { sugar: [], grain: [], redmeat: [], carbohydrate: [], solutions: [] };
  }

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
    {data.carbohydrate.length > 0 && <Siren type="탄수화물" data={data.carbohydrate} />}
  </SirensContainer>
);

const renderSolutions = (solutions) =>
  solutions.map((solution, index) => <SolutionDetail key={index}>{solution}</SolutionDetail>);

const MealSection = ({ mealType, timeName }) => {
  const mealData = data.meals[mealType];
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
        <DrinkSolutionDetail>
          <SolutionDetail>{renderDrinkSolutionMessage(score)}</SolutionDetail>
        </DrinkSolutionDetail>
      </DrinkFoodResultDetailContainer>
    </DrinkResultContainer>
  );
};

const RightResult = () => (
  <MenuResultContainer>
    <MealSections>
      <MealSection mealType="BREAKFAST" timeName="아침" />
      <MealSection mealType="LUNCH" timeName="점심" />
      <MealSection mealType="DINNER" timeName="저녁" />
    </MealSections>
    <ServeMenuResultContainer>
      <SnackSection snackData={data.meals.SNACK} />
      <DrinkSection drinkData={data.meals.DRINK} />
    </ServeMenuResultContainer>
  </MenuResultContainer>
);

export default RightResult;

// 스타일링
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

// const DefaultSolutionMessage = styled(SolutionDetail)`
//   color: #000000;
// `;

// 아침, 점심, 저녁
const MealSections = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultDetailContainer = styled.div`
  width: 60.6rem;
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
  border-radius: 2rem;
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
  height: 5rem;
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
  width: 10rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DrinkSolutionDetail = styled.div`
  width: 9rem;
  height: 5rem;
`;

const DrinkFoodResultDetailContainer = styled.div``;
