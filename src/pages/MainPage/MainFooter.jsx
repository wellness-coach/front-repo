import styled from 'styled-components';
import EmptyBookmarkImg from '../../assets/EmptyBookmark.png';
import FullBookmarkImg from '../../assets/FullBookmark.png'
import ThumbsUpImg from '../../assets/ThumbsUp.png';
import RightArrowImg from '../../assets/RightArrow.png';

function MainFooter() {
  return (
    <MainFooterWrapper>
      <MainFooterContainer>
        <TipListContainer>
          <TipListHeader>
            <ControlText>저속 노화 관련 소식을 확인하세요</ControlText>
            <ControlActionContainer>
              <NavigateBtn>&lt;</NavigateBtn>
              <NavigateBtn>&gt;</NavigateBtn>
            </ControlActionContainer>
          </TipListHeader>
          <TipListBody>
            <TipBox>
              <img src="" alt="" />
              <RecipeText>저속 노화 레시피</RecipeText>
              <TipTitle>노화 예방에 효과적인 바질을 이용한 샐러드</TipTitle>
              <DetailText>
                <span>자세히 보기</span>
                <img src={RightArrowImg} alt="자세히 보기" />
              </DetailText>
              <HelpfulTextBox>
                <span>도움 되었어요</span>
                <img src={ThumbsUpImg} alt="좋아요 버튼" />
              </HelpfulTextBox>
            </TipBox>
            <TipBox>
              <img src="" alt="" />
              <RecipeText>저속 노화 레시피</RecipeText>
              <TipTitle>노화 예방에 효과적인 바질을 이용한 샐러드 밀키트</TipTitle>
              <DetailText>
                <span>자세히 보기</span>
                <img src={RightArrowImg} alt="자세히 보기" />
              </DetailText>
              <HelpfulTextBox>
                <span>도움 되었어요</span>
                <img src={ThumbsUpImg} alt="좋아요 버튼" />
              </HelpfulTextBox>
            </TipBox>
          </TipListBody>
        </TipListContainer>
        <RecommendationListContainer>
          <RecommendationListHeader>00님을 위한 맞춤 추천 제품</RecommendationListHeader>
          <RecommendationListBody>
            <ListLabel>
              <LabelProductName>제품명</LabelProductName>
              <LabelScrap>스크랩</LabelScrap>
            </ListLabel>
            <ListItemContainer>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap>
                  <img src={EmptyBookmarkImg} alt="북마크" />
                </ItemScrap>
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap>
                  <img src={EmptyBookmarkImg} alt="북마크" />
                </ItemScrap>
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap>
                  <img src={EmptyBookmarkImg} alt="북마크" />
                </ItemScrap>
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap>
                  <img src={EmptyBookmarkImg} alt="북마크" />
                </ItemScrap>
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap>
                  <img src={FullBookmarkImg} alt="북마크" />
                </ItemScrap>
              </ListItem>
            </ListItemContainer>
          </RecommendationListBody>
        </RecommendationListContainer>
      </MainFooterContainer>
    </MainFooterWrapper>
  );
}

export default MainFooter;

const MainFooterWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  padding-top: 5.97rem;
`;

const MainFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 110.7rem;
`;

const TipListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66.6rem;
`;

const TipListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const ControlText = styled.p`
  color: #000;
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const ControlActionContainer = styled.div`
  margin-right: 2.14rem;
  width: 7.66rem;
`;

const NavigateBtn = styled.button``;

const TipListBody = styled.div`
  width: 66.6rem;
  height: 32.6rem;
  display: flex;
  justify-content: space-between;
  background-color: antiquewhite;
`;

const TipBox = styled.div`
  width: 32.6rem;
  height: 100%;
  position: relative;
  border-radius: 18px;
  background-color: aquamarine;
`;

const RecipeText = styled.p`
  position: absolute;
  top: 3.1rem;
  left: 2.82rem;
  color: black;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const TipTitle = styled.p`
  position: absolute;
  top: 6.01rem;
  left: 2.82rem;
  color: black;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  width: 25rem;
  height: 10rem;
`;

const DetailText = styled.p`
  position: absolute;
  left: 2.8rem;
  top: 28.5rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const HelpfulTextBox = styled.p`
  position: absolute;
  top: 27.4rem;
  left: 18rem;
  width: 13.5rem;
  height: 3.5rem;
  border-radius: 1.5rem;
  background: #adb88f;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0rem 1rem;

  & span {
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const RecommendationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 42.7rem;
`;

const RecommendationListHeader = styled.p`
  width: 100%;
  color: #171717;
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  padding-bottom: 1.3rem;
`;

const RecommendationListBody = styled.div`
  width: 100%;
  height: 32.6rem;
  border-radius: 18px;
  background: #ebe6d2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListLabel = styled.div`
  height: 6.9rem;
  border-bottom: 1px solid #7a7a7a;
  width: 37.6rem;
  display: flex;
  align-items: center;
`;

const LabelProductName = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5.1rem;
  margin-right: 16.6rem;
`;

const LabelScrap = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ListItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 37.6rem;
  margin-top: 1.5rem;
  margin-bottom: 1.4rem;
  height: 22.8rem;
  overflow-y: scroll;
`;

const ListItem = styled.li`
  width: 36.7rem;
  height: 6.4rem;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemProductName = styled.span`
  color: #000;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 5.1rem;
  max-width: 15rem;
`;

const ItemScrap = styled.span`
  margin-right: 4rem;
`;
