import styled from 'styled-components';
import PlusImg from '../../assets/DietTestAssets/Plus.png';
import Minus from '../../assets/DietTestAssets/Minus.png';
import Meal from '../../assets/DietTestAssets/Meal.png';
import SnackAndDrink from '../../assets/DietTestAssets/SnackAndDrink.png';
import Memo from '../../assets/DietTestAssets/Memo.png';
import { useContext, useState, useEffect } from 'react';
import UserInfoContext from '../../store/UserInfoCtx';
import { v4 as uuidv4 } from 'uuid';

function BodyTests({ tempInputs }) {
  const { userInfo } = useContext(UserInfoContext);

  const [testInputs, setTestInputs] = useState({
    breakfast: [{ id: 'breakfast_0', placeholder: 'ex. 가지볶음' }],
    lunch: [{ id: 'lunch_0', placeholder: 'ex. 빅맥 세트' }],
    dinner: [{ id: 'dinner_0', placeholder: 'ex. 갈치 구이' }],
    snack: [{ id: 'snack_0', placeholder: 'ex. 다이제 초코맛' }],
    drink: [{ id: 'drink_0', placeholder: 'ex. 코카 콜라 제로' }],
  });

  console.log('testInputs: ', testInputs);

  useEffect(() => {
    if (userInfo.userCheckupStatus === 'IN_PROGRESS' && tempInputs.mealResponses.length > 0) {
      const updatedInputs = {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
        drink: [],
      };

      tempInputs.mealResponses.forEach((밥) => {
        const newInput = {
          id: `${meal.menuType.toLowerCase()}_${uuidv4()}`,
          placeholder: meal.menuName,
          menuName: meal.menuName,
        };
        updatedInputs[meal.menuType.toLowerCase()].push(newInput);
      });

      Object.keys(updatedInputs).forEach((key) => {
        if (updatedInputs[key].length === 0) {
          updatedInputs[key].push({ id: `${key}_0`, placeholder: '메뉴 입력' });
        }
      });

      setTestInputs(updatedInputs);
    }
  }, [userInfo.userCheckupStatus, tempInputs]);

  const handleAddTestInput = (inputType) => {
    setTestInputs((prev) => ({
      ...prev,
      [inputType]: [...prev[inputType], { id: `${inputType}_${uuidv4()}`, placeholder: '메뉴 입력' }],
    }));
  };

  const handleDeleteTestInput = (inputType, id) => {
    const itemsToBeUpdated = testInputs[inputType].filter((item) => item.id !== id);

    if (itemsToBeUpdated.length > 0) {
      setTestInputs((prev) => ({
        ...prev,
        [inputType]: itemsToBeUpdated,
      }));
    }
  };

  return (
    <>
      <TestBox>
        <BoxHeader>
          <TestCategory>
            <MealImg src={Meal} alt="식사" />
            <TestCategoryText>식사</TestCategoryText>
          </TestCategory>
        </BoxHeader>
        <BoxBody>
          <QuestionText>Q1. 오늘 먹은 음식을 적어주세요.</QuestionText>
          <MealInputArrangeContainer>
            <MealInputContainer>
              <InputCategory>아침</InputCategory>
              <MealListContainer>
                {testInputs.breakfast.map(({ id, placeholder, menuName }) => (
                  <InputContainer key={id}>
                    <Input type="text" id={id} name="BREAKFAST" placeholder={placeholder} defaultValue={menuName} />
                    {testInputs.breakfast.length > 1 && (
                      <button onClick={() => handleDeleteTestInput('breakfast', id)}>
                        <DeleteButtonImg src={Minus} alt="삭제 버튼" />
                      </button>
                    )}
                  </InputContainer>
                ))}
                <PlusButton type="button" onClick={() => handleAddTestInput('breakfast')}>
                  <img src={PlusImg} alt="입력칸 더하기" />
                </PlusButton>
              </MealListContainer>
            </MealInputContainer>
            <MealInputContainer>
              <InputCategory>점심</InputCategory>
              <MealListContainer>
                {testInputs.lunch.map(({ id, placeholder, menuName }) => (
                  <InputContainer key={id}>
                    <Input type="text" id={id} name="LUNCH" placeholder={placeholder} defaultValue={menuName} />
                    {testInputs.lunch.length > 1 && (
                      <button onClick={() => handleDeleteTestInput('lunch', id)}>
                        <DeleteButtonImg src={Minus} alt="삭제 버튼" />
                      </button>
                    )}
                  </InputContainer>
                ))}
                <PlusButton type="button" onClick={() => handleAddTestInput('lunch')}>
                  <img src={PlusImg} alt="입력칸 더하기" />
                </PlusButton>
              </MealListContainer>
            </MealInputContainer>
            <MealInputContainer>
              <InputCategory>저녁</InputCategory>
              <MealListContainer>
                {testInputs.dinner.map(({ id, placeholder, menuName }) => (
                  <InputContainer key={id}>
                    <Input type="text" id={id} name="DINNER" placeholder={placeholder} defaultValue={menuName} />
                    {testInputs.dinner.length > 1 && (
                      <button onClick={() => handleDeleteTestInput('dinner', id)}>
                        <DeleteButtonImg src={Minus} alt="삭제 버튼" />
                      </button>
                    )}
                  </InputContainer>
                ))}
                <PlusButton type="button" onClick={() => handleAddTestInput('dinner')}>
                  <img src={PlusImg} alt="입력칸 더하기" />
                </PlusButton>
              </MealListContainer>
            </MealInputContainer>
          </MealInputArrangeContainer>
        </BoxBody>
      </TestBox>

      <TestBox>
        <BoxHeader>
          <TestCategory>
            <SnackAndDrinkImg src={SnackAndDrink} alt="간식 및 음료" />
            <TestCategoryText>간식 및 음료</TestCategoryText>
          </TestCategory>
        </BoxHeader>
        <BoxBody>
          <QuestionText>Q2. 오늘 먹은 간식과 음료를 적어주세요.</QuestionText>
          <SnackInputArrangeContainer>
            <SnackInputContainer>
              <InputCategory>간식</InputCategory>
              <SnackListContainer>
                {testInputs.snack.map(({ id, placeholder, menuName }) => (
                  <InputContainer key={id}>
                    <Input type="text" id={id} name="SNACK" placeholder={placeholder} defaultValue={menuName} />
                    {testInputs.snack.length > 1 && (
                      <button onClick={() => handleDeleteTestInput('snack', id)}>
                        <DeleteButtonImg src={Minus} alt="삭제 버튼" />
                      </button>
                    )}
                  </InputContainer>
                ))}
                <PlusButton type="button" onClick={() => handleAddTestInput('snack')}>
                  <img src={PlusImg} alt="입력칸 더하기" />
                </PlusButton>
              </SnackListContainer>
            </SnackInputContainer>
            <SnackInputContainer>
              <InputCategory>음료</InputCategory>
              <SnackListContainer>
                {testInputs.drink.map(({ id, placeholder, menuName }) => (
                  <InputContainer key={id}>
                    <Input type="text" id={id} name="DRINK" placeholder={placeholder} defaultValue={menuName} />
                    {testInputs.drink.length > 1 && (
                      <button onClick={() => handleDeleteTestInput('drink', id)}>
                        <DeleteButtonImg src={Minus} alt="삭제 버튼" />
                      </button>
                    )}
                  </InputContainer>
                ))}
                <PlusButton type="button" onClick={() => handleAddTestInput('drink')}>
                  <img src={PlusImg} alt="입력칸 더하기" />
                </PlusButton>
              </SnackListContainer>
            </SnackInputContainer>
          </SnackInputArrangeContainer>
        </BoxBody>
      </TestBox>

      <TestBox>
        <BoxHeader>
          <TestCategory>
            <MemoImg src={Memo} alt="메모" />
            <TestCategoryText>메모</TestCategoryText>
          </TestCategory>
        </BoxHeader>
        <BoxBody>
          <QuestionText>Q3. 오늘의 식단에 대해 남기고 싶은 말을 자유롭게 적어주세요.</QuestionText>

          <FeedbackInputCategory>식단 피드백</FeedbackInputCategory>

          <FeedbackTextarea
            name="memo"
            id="FeedbackInput"
            defaultValue={tempInputs.memo}
            placeholder="식단을 입력하고 난 뒤의 생각과 감정들을 자유롭게 작성해주세요!"
          ></FeedbackTextarea>
        </BoxBody>
      </TestBox>
    </>
  );
}

export default BodyTests;

const TestBox = styled.div`
  width: 100%;
  border-radius: 2.5rem;
  border: 1px solid #202020;
  background-color: #fff;
  margin-bottom: 5.5rem;
  padding: 0rem 1.7rem;
`;

const BoxHeader = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed #a7a7a7;
`;

const TestCategory = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MealImg = styled.img`
  width: 7.3rem;
  height: 7rem;
  margin-top: 0.5rem;
`;

const TestCategoryText = styled.p`
  color: #000;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CheckCircle = styled.div``;

const BoxBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.7rem 3.51rem 2.78rem 3.51rem;
`;

const QuestionText = styled.p`
  color: #000;
  font-size: 2.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 2.5rem;
`;

const MealInputArrangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MealInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30.4rem;
`;

const InputCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.3rem;
  width: 6.5rem;
  border-radius: 7.5rem;
  background: #a6cd7e;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 2.4rem;
`;

const MealListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlusButton = styled.button``;

const SnackAndDrinkImg = styled.img`
  width: 7.3rem;
  height: 7.5rem;
`;

const SnackInputArrangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 5.4rem;
`;

const SnackInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 37.7rem;
`;

const SnackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 4.6rem;
  border-radius: 1.5rem;
  border: 2px solid #78a55a;
  background: #fff;
  padding-left: 1.5rem;
  color: #000;
  font-size: 1.5rem;
  font-family: 'Noto Sans kr, sans-serif';
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const FeedbackInputCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.3rem;
  width: 11rem;
  border-radius: 7.5rem;
  background: #a6cd7e;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const FeedbackTextarea = styled.textarea`
  border-radius: 15px;
  border: 2px solid #78a55a;
  background: #fff;
  width: 100%;
  height: 10.3rem;
  margin-top: 2.3rem;
  padding-left: 1.5rem;
  padding-top: 1.5rem;
  resize: none;
  color: #000;
  font-size: 1.5rem;
  font-family: 'Noto Sans kr, sans-serif';
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const MemoImg = styled.img`
  width: 6rem;
  height: 7rem;
  margin-right: 1rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.7rem;
`;

const DeleteButtonImg = styled.img`
  width: 3rem;
  height: 3rem;
`;
