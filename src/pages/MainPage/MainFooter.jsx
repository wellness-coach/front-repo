import styled from 'styled-components';
import EmptyBookmarkImg from '../../assets/MainPageAssets/EmptyBookmark.png';
import FullBookmarkImg from '../../assets/MainPageAssets/FullBookmark.png';
import ThumbsUpImg from '../../assets/MainPageAssets/ThumbsUp.png';
import RightArrowImg from '../../assets/MainPageAssets/RightArrow.png';
import TipBlackLeft from '../../assets/MainPageAssets/TipBlackLeft.png';
import TipBlackRight from '../../assets/MainPageAssets/TipBlackRight.png';
import TipGrayLeft from '../../assets/MainPageAssets/TipGrayLeft.png';
import TipGrayRight from '../../assets/MainPageAssets/TipGrayRight.png';
import Tips from '../../assets/Tips.json';
import { useState } from 'react';

function MainFooter({ onOpenTip }) {
  const [renderedTipId, setRenderedTipId] = useState(0);

  const handleGoToLeftTip = () => {
    if (renderedTipId > 0) setRenderedTipId(renderedTipId - 1);
  };

  const handleGoToRightTip = () => {
    if (renderedTipId < Tips.length - 2) setRenderedTipId(renderedTipId + 1);
  };

  console.log(Tips);
  console.log(renderedTipId);

  return (
    <MainFooterWrapper>
      <MainFooterContainer>
        <TipListContainer>
          <TipListHeader>
            <ControlText>저속 노화 관련 소식을 확인하세요</ControlText>
            <ControlActionContainer>
              <NavigateImg
                onClick={handleGoToLeftTip}
                src={renderedTipId === 0 ? TipGrayLeft : TipBlackLeft}
                alt="팁 왼쪽 네비게이션"
              />
              <NavigateImg
                onClick={handleGoToRightTip}
                src={renderedTipId === Tips.length - 2 ? TipGrayRight : TipBlackRight}
                alt="팁 오른쪽 네비게이션"
              />
            </ControlActionContainer>
          </TipListHeader>
          <TipListBody>
            <TipBox key={renderedTipId} onClick={() => onOpenTip(renderedTipId)}>
              <TipImage src={`${Tips[renderedTipId].tipImgSrc}`} alt="팁 이미지" />
              <RecipeText>{Tips[renderedTipId].category}</RecipeText>
              <TipTitle>{Tips[renderedTipId].title}</TipTitle>
              <DetailText>
                <span>자세히 보기</span>
                <img src={RightArrowImg} alt="자세히 보기" />
              </DetailText>
            </TipBox>
            <TipBox key={renderedTipId + 1} onClick={() => onOpenTip(renderedTipId + 1)}>
              <TipImage src={`${Tips[renderedTipId + 1].tipImgSrc}`} alt="팁 이미지" />
              <RecipeText>{Tips[renderedTipId + 1].category}</RecipeText>
              <TipTitle>{Tips[renderedTipId + 1].title}</TipTitle>
              <DetailText>
                <span>자세히 보기</span>
                <img src={RightArrowImg} alt="자세히 보기" />
              </DetailText>
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
                <ItemScrap src={FullBookmarkImg} alt="북마크" />
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap src={EmptyBookmarkImg} alt="북마크" />
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap src={EmptyBookmarkImg} alt="북마크" />
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>
                <ItemScrap src={FullBookmarkImg} alt="북마크" />
              </ListItem>
              <ListItem>
                <ItemProductName>제품1</ItemProductName>

                <ItemScrap src={FullBookmarkImg} alt="북마크" />
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
  padding-bottom: 6rem;
`;

const TipListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66.6rem;
  margin-right: 3rem;
`;

const TipListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const ControlText = styled.p`
  color: #000;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const ControlActionContainer = styled.div`
  width: 6.6rem;
  margin-right: 2.2rem;
  display: flex;
  justify-content: space-between;
`;

const NavigateImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const TipListBody = styled.div`
  width: 66.6rem;
  height: 32.6rem;
  display: flex;
  justify-content: space-between;
`;

const TipBox = styled.div`
  width: 32.6rem;
  height: 100%;
  position: relative;
  border-radius: 18px;
`;

const TipImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  filter: brightness(0.4); 
  backdrop-filter: blur(5px); 

  &:hover {
    filter: brightness(0.8); 
  }
`;

const RecipeText = styled.p`
  position: absolute;
  top: 3.1rem;
  left: 2.82rem;
  color: #ffffff;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  z-index: 1;
`;

const TipTitle = styled.p`
  position: absolute;
  top: 6.01rem;
  left: 2.82rem;
  color: #ffffff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  width: 25rem;
  height: 10rem;
  overflow: hidden;
  word-wrap: break-word;
  z-index: 1;
`;

const DetailText = styled.p`
  position: absolute;
  left: 2.8rem;
  top: 28.5rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;

  & span {
    color: #fff;
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
  z-index: 1;

  & span {
    color: #fff;
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
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 5.1rem;
  margin-right: 18.6rem;
`;

const LabelScrap = styled.span`
  color: #000;
  text-align: center;
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
  width: 100%;
  min-height: 6.4rem;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemProductName = styled.p`
  color: #000;
  text-align: center;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 5.1rem;
  max-width: 15rem;
`;

const ItemScrap = styled.img`
  margin-right: 4rem;
  width: 3rem;
  height: 5rem;
`;
