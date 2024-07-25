import React from "react";
import styled from "styled-components";
import levelicon_1 from "../../assets/img/googleImg.png";
import sirenicon_1 from "../../assets/img/siren.png";
import sirenicon_2 from "../../assets/img/siren.png";
import sirenicon_3 from "../../assets/img/siren.png";
import sirenicon_4 from "../../assets/img/siren.png";
function RightResult() {
  return (
    <>
      <MenuResultContainer>
        <ResultDetailContainer>
          <LevelLeftContainer>
            <TimeName>아침</TimeName>
            <LevelIcon src={levelicon_1} alt="1단계 아이콘" />
          </LevelLeftContainer>
          <FoodResultDetailContainer>
            <DetailTopContainer>
              <SirenContainer>
                <SirenIcon src={sirenicon_1} alt="단순당 사이렌 아이콘" />
                <SirenIcon src={sirenicon_2} alt="적색육 사이렌 아이콘" />
                <SirenIcon src={sirenicon_3} alt="정제곡물 사이렌 아이콘" />
                <SirenIcon src={sirenicon_4} alt="탄수화물 사이렌 아이콘" />
              </SirenContainer>
              <Score>2점</Score>
            </DetailTopContainer>
            <SolutionDetail>
              아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
              피드백 및 솔루션 제공 아침식사에서 간단한 피드백 및 솔루션 제공
            </SolutionDetail>
          </FoodResultDetailContainer>
        </ResultDetailContainer>

        <ResultDetailContainer>
          <LevelLeftContainer>
            <TimeName>점심</TimeName>
            <LevelIcon src={levelicon_1} alt="1단계 아이콘" />
          </LevelLeftContainer>
          <FoodResultDetailContainer>
            <DetailTopContainer>
              <SirenContainer>
                <SirenIcon src={sirenicon_1} alt="단순당 사이렌 아이콘" />
                <SirenIcon src={sirenicon_2} alt="적색육 사이렌 아이콘" />
                <SirenIcon src={sirenicon_3} alt="정제곡물 사이렌 아이콘" />
                <SirenIcon src={sirenicon_4} alt="탄수화물 사이렌 아이콘" />
              </SirenContainer>
              <Score>10점</Score>
            </DetailTopContainer>
            <SolutionDetail>
              아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
              피드백 및 솔루션 제공 아침식사에서 간단한 피드백 및 솔루션 제공
              아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
              피드백 및 솔루션 제공
            </SolutionDetail>
          </FoodResultDetailContainer>
        </ResultDetailContainer>

        <ResultDetailContainer>
          <LevelLeftContainer>
            <TimeName>저녁</TimeName>
            <LevelIcon src={levelicon_1} alt="1단계 아이콘" />
          </LevelLeftContainer>
          <FoodResultDetailContainer>
            <DetailTopContainer>
              <SirenContainer>
                <SirenIcon src={sirenicon_1} alt="단순당 사이렌 아이콘" />
                <SirenIcon src={sirenicon_2} alt="적색육 사이렌 아이콘" />
                {/* <SirenIcon src={sirenicon_3} alt="정제곡물 사이렌 아이콘" />
                <SirenIcon src={sirenicon_4} alt="탄수화물 사이렌 아이콘" /> */}
              </SirenContainer>
              <Score>9점</Score>
            </DetailTopContainer>
            <SolutionDetail>
              아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
              피드백 및 솔루션 제공 아침식사에서 간단한 피드백 및 솔루션 제공
              아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
              피드백 및 솔루션 제공
            </SolutionDetail>
          </FoodResultDetailContainer>
        </ResultDetailContainer>

        <ServeMenuResultContainer>
          <SnackResultContainer>
            <ShortLevelLeftContainer>
              <ShortTimeName>간식</ShortTimeName>
              <LevelIcon src={levelicon_1} alt="1단계 아이콘" />
            </ShortLevelLeftContainer>
            <SnackFoodResultDetailContainer>
              <SnackDetailTopContainer>
                <SirenContainer>
                  <SirenIcon src={sirenicon_1} alt="단순당 사이렌 아이콘" />
                  <SirenIcon src={sirenicon_2} alt="적색육 사이렌 아이콘" />
                  <SirenIcon src={sirenicon_3} alt="정제곡물 사이렌 아이콘" />
                  <SirenIcon src={sirenicon_4} alt="탄수화물 사이렌 아이콘" />
                </SirenContainer>
                <Score>9점</Score>
              </SnackDetailTopContainer>
              <SnackSolutionDetail>
                아침식사에서 간단한 피드백 및 솔루션 제공 아침식사에서 간단한
                피드백 및 솔루션 제공
              </SnackSolutionDetail>
            </SnackFoodResultDetailContainer>
          </SnackResultContainer>

          <DrinkResultContainer>
            <ShortLevelLeftContainer>
              <ShortTimeName>음료</ShortTimeName>
              <LevelIcon src={levelicon_1} alt="1단계 아이콘" />
            </ShortLevelLeftContainer>
            <DrinkFoodResultDetailContainer>
              <DrinkDetailTopContainer>
                <SirenContainer>
                  <SirenIcon src={sirenicon_1} alt="단순당 사이렌 아이콘" />
                </SirenContainer>
                <Score>9점</Score>
              </DrinkDetailTopContainer>
              <DrinkSolutionDetail>
                아침식사에서 간단한 피드백 및 솔루션 제공
              </DrinkSolutionDetail>
            </DrinkFoodResultDetailContainer>
          </DrinkResultContainer>
        </ServeMenuResultContainer>
      </MenuResultContainer>
    </>
  );
}

export default RightResult;

//공통
const LevelIcon = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 30rem;
`;
const SirenContainer = styled.div`
  padding-top: 0.8rem;
`;
const SirenIcon = styled.img`
  width: 2.5rem;
  margin-right: 2rem;
`;

const Score = styled.div`
  color: #f15c5c;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
`;
// 아침, 점심, 저녁
const MenuResultContainer = styled.div``;

const ResultDetailContainer = styled.div`
  width: 60.6rem;
  height: 15.2rem;
  border-radius: 1.6rem;
  background: #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
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

const SolutionDetail = styled.div`
  width: 40rem;
  height: 5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

// 간식 섹션
const ServeMenuResultContainer = styled.div`
  display: flex;
`;
const SnackResultContainer = styled.div`
  width: 349px;
  height: 152px;
  border-radius: 16px;
  background: #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
`;
const ShortLevelLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 11rem;
  margin-left: 0.7rem;
  margin-right: 1.2rem;
`;

const ShortTimeName = styled.div`
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
const SnackFoodResultDetailContainer = styled.div``;
const SnackDetailTopContainer = styled.div`
  width: 22rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const SnackSolutionDetail = styled.p`
  width: 22rem;
  font-size: 12px;
  font-weight: 500;
`;

// 음료 섹션
const DrinkResultContainer = styled.div`
  width: 24rem;
  height: 15.2rem;
  border-radius: 1.6rem;
  background: #d9d9d9;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
const DrinkFoodResultDetailContainer = styled.div``;
const DrinkDetailTopContainer = styled.div`
  width: 11rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const DrinkSolutionDetail = styled.div`
  width: 11rem;
  font-size: 12px;
  font-weight: 500;
`;
