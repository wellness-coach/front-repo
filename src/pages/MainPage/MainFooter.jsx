import styled from 'styled-components';
import EmptyBookmarkImg from '../../assets/MainPageAssets/EmptyBookmark.png';
import FullBookmarkImg from '../../assets/MainPageAssets/FullBookmark.png';
import RightArrowImg from '../../assets/MainPageAssets/RightArrow.png';
import TipBlackLeft from '../../assets/MainPageAssets/TipBlackLeft.png';
import TipBlackRight from '../../assets/MainPageAssets/TipBlackRight.png';
import TipGrayLeft from '../../assets/MainPageAssets/TipGrayLeft.png';
import TipGrayRight from '../../assets/MainPageAssets/TipGrayRight.png';
import axios from 'axios';
import Tips from '../../assets/Tips.json';
import { useState, useContext } from 'react';
import UserInfoContext from '../../store/UserInfoCtx';

function MainFooter({ onOpenTip, data, refreshData }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { userInfo } = useContext(UserInfoContext);
  const [renderedTipId, setRenderedTipId] = useState(0);
  const [isLeftDetailTextHovered, setIsLeftDetailTextHovered] = useState(false);
  const [isRightDetailTextHovered, setIsRightDetailTextHovered] = useState(false);

  const handleGoToLeftTip = () => {
    if (renderedTipId > 0) setRenderedTipId(renderedTipId - 1);
  };

  const handleGoToRightTip = () => {
    if (renderedTipId < Tips.length - 2) setRenderedTipId(renderedTipId + 1);
  };

  const handleAddScrap = async (productId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/scrap/add?userId=${userInfo.userId}&recommendationId=${productId}`,
        {
          userId: userInfo.userId,
          recommendationId: productId,
        },
      );
      console.log(response);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteScrap = async (productId) => {
    try {
      console.log(productId);
      console.log(userInfo.userId);
      const response = await axios.delete(
        `${BASE_URL}/scrap/cancel?userId=${userInfo.userId}&recommendationId=${productId}`,
        {
          params: {
            userId: userInfo.userId,
            recommendationId: productId,
          },
        },
      );
      console.log(response);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  // 중복 제거 로직
  const uniqueProductsMap = new Map();
  if (data && data.products) {
    data.products.forEach((product) => {
      const key = `${product.targetProductName}-${product.productName}`;
      if (!uniqueProductsMap.has(key)) {
        uniqueProductsMap.set(key, product);
      }
    });
  }
  const uniqueProducts = Array.from(uniqueProductsMap.values());

  console.log('Original products:', data && data.products);
  console.log('Unique products:', uniqueProducts);

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
            <TipBox
              key={renderedTipId}
              onClick={() => onOpenTip(renderedTipId)}
              onMouseOver={() => setIsLeftDetailTextHovered(true)}
              onMouseOut={() => setIsLeftDetailTextHovered(false)}
            >
              <TipImage src={`${Tips[renderedTipId].tipImgSrc}`} alt="팁 이미지" />
              <RecipeText>{Tips[renderedTipId].category}</RecipeText>
              <TipTitle>{Tips[renderedTipId].title}</TipTitle>
              {isLeftDetailTextHovered && (
                <DetailText>
                  <span>자세히 보기</span>
                  <img src={RightArrowImg} alt="자세히 보기" />
                </DetailText>
              )}
            </TipBox>
            <TipBox
              key={renderedTipId + 1}
              onClick={() => onOpenTip(renderedTipId + 1)}
              onMouseEnter={() => setIsRightDetailTextHovered(true)}
              onMouseLeave={() => setIsRightDetailTextHovered(false)}
            >
              <TipImage src={`${Tips[renderedTipId + 1].tipImgSrc}`} alt="팁 이미지" />
              <RecipeText>{Tips[renderedTipId + 1].category}</RecipeText>
              <TipTitle>{Tips[renderedTipId + 1].title}</TipTitle>
              {isRightDetailTextHovered && (
                <DetailText>
                  <span>자세히 보기</span>
                  <img src={RightArrowImg} alt="자세히 보기" />
                </DetailText>
              )}
            </TipBox>
          </TipListBody>
        </TipListContainer>
        <RecommendationListContainer>
          <RecommendationListHeader>{userInfo.userName}님이 스크랩한 추천 제품</RecommendationListHeader>
          <RecommendationListBody>
            <ListLabel>
              <LabelProductName>제품명</LabelProductName>
              <LabelScrap>스크랩</LabelScrap>
            </ListLabel>
            <ListItemContainer>
              {uniqueProducts.length > 0 ? (
                uniqueProducts.map((product) => (
                  <ListItem key={product.productId}>
                    <ItemProductName href={product.productLink}>
                      {product.productName}
                      <span>({product.targetProductName}의 대체품)</span>
                    </ItemProductName>
                    <ItemScrapBtn
                      type="button"
                      onClick={
                        product.scrap
                          ? () => handleDeleteScrap(product.productId)
                          : () => handleAddScrap(product.productId)
                      }
                    >
                      <ItemScrap src={product.scrap ? FullBookmarkImg : EmptyBookmarkImg} alt="북마크" />
                    </ItemScrapBtn>
                  </ListItem>
                ))
              ) : (
                <p>아직 스크랩한 제품이 없습니다.</p>
              )}
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
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const TipImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  filter: brightness(0.3) blur(1px);
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.6);
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
  height: 6rem;
  overflow: hidden;
  word-wrap: break-word;
  z-index: 1;
`;

const DetailText = styled.p`
  position: absolute;
  left: 2.8rem;
  top: 28.5rem;
  width: 9.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  cursor: pointer;
  transition: all 0.6s ease-in-out;

  & span {
    color: #fff;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  & img {
    width: 2rem;
    padding-top: 0.3rem;
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
  /* overflow-y: scroll; */
  overflow-y: auto;

  & p {
    color: #000;
    text-align: center;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 8rem;
  }
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

const ItemProductName = styled.a`
  color: #000;
  text-align: center;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 5.1rem;
  max-width: 25rem;

  & span {
    color: gray;
    margin-left: 1rem;
  }
`;

const ItemScrapBtn = styled.button``;

const ItemScrap = styled.img`
  margin-right: 4rem;
  width: 3rem;
  height: 5rem;
`;
