import React, { useContext, useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ko as koLocale } from 'date-fns/locale';
import styled from 'styled-components';
import './calStyle.css';
import MemoModal from './MemoModal';
import UserInfoContext from '../../store/UserInfoCtx';
import speednull from '../../assets/img/SpeedNull.png';

// img
import calendaricon from '../../assets/img/Calendar.png';
import speedgreen from '../../assets/img/SpeedGreen.png';
import speedyellow from '../../assets/img/SpeedYellow.png';
import speedred from '../../assets/img/SpeedRed.png';

function LeftResult({ data, date, setDate }) {
  const { userInfo } = useContext(UserInfoContext);
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemoOverflow, setIsMemoOverflow] = useState(false);
  const memoRef = useRef(null);

  const defaultSpeedLevelInfo = {
    text: '? ? 단계',
    color: 'gray',
    imgSrc: speednull,
  };
  const getSpeedLevelInfo = (agingType) => {
    switch (agingType) {
      case 'PROPER':
        return {
          text: '저속 단계',
          color: 'green',
          imgSrc: speedgreen,
        };
      case 'CAUTION':
        return {
          text: '유의 단계',
          color: 'yellow',
          imgSrc: speedyellow,
        };
      case 'DANGER':
        return {
          text: '가속 단계',
          color: 'red',
          imgSrc: speedred,
        };
      default:
        return {
          text: '? ? 단계',
          color: 'gray',
          imgSrc: speednull,
        };
    }
  };
  const speedLevelInfo = data ? getSpeedLevelInfo(data.todayAgingType) : defaultSpeedLevelInfo;
  const memoContent = data ? data.memo : '';

  const getShortDay = (date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    return weekdays[date.getDay()];
  };

  const formatDate = (date) => {
    return format(date, `yyyy. MM. dd (${getShortDay(date)})`, {
      locale: koLocale,
    });
  };

  const handleCalendarClick = () => {
    setOpen(!open);
    if (!open) {
      datePickerRef.current?.setOpen(true);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (memoRef.current) {
      setIsMemoOverflow(memoRef.current.scrollHeight > memoRef.current.clientHeight);
    }
  }, [memoContent]);

  return (
    <LeftResultContainer>
      <CalendarWrapper>
        <CalendarContainer>
          <ResultName>{userInfo.userName}님의 일별 리포트 분석</ResultName>
          <div className="date-picker-container">
            <button onClick={handleCalendarClick} ref={buttonRef} className="calendar-button">
              <CalendarIcon src={calendaricon} alt="달력아이콘" />
            </button>
            <DatePicker
              ref={datePickerRef}
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="yyyy. MM. dd (EEEE)"
              customInput={<CustomDateInput>{formatDate(date)}</CustomDateInput>}
              open={open}
              onClickOutside={() => setOpen(false)}
              onCalendarClose={() => setOpen(false)}
              locale={koLocale}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="react-datepicker__header">
                  <div className="react-datepicker__header-top">
                    <div className="react-datepicker__header-inner">
                      <span className="react-datepicker__current-month">
                        {format(date, 'yyyy. M', { locale: koLocale })}
                      </span>
                    </div>
                    <div className="react-datepicker__navigation-container">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="react-datepicker__navigation react-datepicker__navigation--previous"
                      >
                        {'<'}
                      </button>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="react-datepicker__navigation react-datepicker__navigation--next"
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </CalendarContainer>
      </CalendarWrapper>
      <SpeedAndMemoContainer>
        <SpeedometerContainer>
          <SpeedImg src={speedLevelInfo.imgSrc} alt="속도계 이미지" />
          <SpeedLevelContainer>
            <SpeedDateContainer>
              <SpeedDate>{format(date, 'yyyy년 M월 d일', { locale: koLocale })}</SpeedDate>
              <SpeedDateM>건강 진단</SpeedDateM>
            </SpeedDateContainer>
            <SpeedLevel color={speedLevelInfo.color}>{speedLevelInfo.text}</SpeedLevel>
          </SpeedLevelContainer>
        </SpeedometerContainer>
        <MemoContainer>
          <MemoTitle>나의 메모</MemoTitle>
          <MemoDetailContainer>
            <MemoDetailTopContainer>
              <MemoDate>{format(date, 'MM.dd', { locale: koLocale })}</MemoDate>
              <MemoDetail ref={memoRef} isOverflow={isMemoOverflow}>
                {memoContent}
              </MemoDetail>
            </MemoDetailTopContainer>
            {isMemoOverflow && (
              <div>
                <MemoMoreButton onClick={openModal}>더보기</MemoMoreButton>
                {isModalOpen && (
                  <MemoModal setIsModalOpen={setIsModalOpen} selectedDate={date} memoContent={memoContent} />
                )}
              </div>
            )}
          </MemoDetailContainer>
        </MemoContainer>
      </SpeedAndMemoContainer>
    </LeftResultContainer>
  );
}

export default LeftResult;

const LeftResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-top: 6rem;
`;

// 달력 섹션
const CalendarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CalendarContainer = styled.section`
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
`;
const ResultName = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;
const CalendarIcon = styled.img`
  width: 4.6rem;
  height: 4.4rem;
`;

const CustomDateInput = styled.span`
  font-size: 3.5rem;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 0.4rem;
  display: inline-block;
  margin-left: 1rem;
`;

// 속도계 섹션
const SpeedAndMemoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SpeedometerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeedImg = styled.img`
  width: 38.6rem;
  height: 17.9rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(30px);
`;

const SpeedLevelContainer = styled.div`
  width: 38.6rem;
  height: 6.7rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 2.4rem;
  margin-top: 1rem;
  background: linear-gradient(157deg, #fff 43.17%, rgba(153, 153, 153, 0.3) 381.72%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(25px);
`;

const SpeedDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.5rem;
  margin-right: 2rem;
  width: 12em;
`;

const SpeedDate = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SpeedDateM = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SpeedLevel = styled.p`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ color }) =>
    color === 'green' ? '#68B248' : color === 'yellow' ? '#D8C317' : color === 'red' ? '#D35F4F' : '#6c757d'};
`;

// 메모 섹션
const MemoContainer = styled.div`
  background-color: white;
  width: 44rem;
  height: 30.5rem;
  border-radius: 1.5rem;
  padding: 2.5rem 1.8rem;
  margin-top: 4rem;
  border: 1px solid #aaa;
`;

const MemoTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
  margin-left: 1rem;
`;

const MemoDetailContainer = styled.div`
  width: 40.5rem;
  height: 22.2rem;
  border-radius: 15px;
  background: #f8f8f8;
  padding: 1.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const MemoDetailTopContainer = styled.div`
  width: 36rem;
  height: 15rem;
  margin-bottom: 2rem;
`;

const MemoDate = styled.p`
  color: #bcbdbf;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const MemoDetail = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  width: 35rem;
  height: 14rem;
  line-height: 2.5rem;
  position: relative;
  overflow: hidden;
  ${({ isOverflow }) =>
    isOverflow &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 30%, #f8f8f8 100%);
      pointer-events: none;
    }
  `}
`;

const MemoMoreButton = styled.div`
  width: 7.6rem;
  height: 2rem;
  border-radius: 1.5rem;
  border: 1px solid #aaa;
  font-size: 1rem;
  font-weight: 500;
  background: #a6cd7e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
