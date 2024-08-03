import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { ko as koLocale } from 'date-fns/locale';
import styled from 'styled-components';
import './calStyle.css';
import MemoModal from './MemoModal';
// img
import calendaricon from '../../assets/img/Calendar.png';
import speedgreen from '../../assets/img/SpeedGreen.png';
import speedyellow from '../../assets/img/SpeedYellow.png';
import speedred from '../../assets/img/SpeedRed.png';

function LeftResult({ data, userId, setUserId, date, setDate }) {
  const [open, setOpen] = useState(false);
  const datePickerRef = useRef(null);
  const buttonRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemoOverflow, setIsMemoOverflow] = useState(false);
  const memoRef = useRef(null);

  if (!data) {
    return <div>Loading...</div>;
  }

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
          text: '정보 없음',
          color: 'gray',
          imgSrc: null,
        };
    }
  };

  const speedLevelInfo = getSpeedLevelInfo(data.todayAgingType);
  const memoContent = data.memo;

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
          <ResultName>{userId}님의 일별 리포트 분석</ResultName>
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
              <SpeedDateM>건강 진단 결과</SpeedDateM>
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
`;

// 속도계 섹션
const SpeedAndMemoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6rem;
`;
const SpeedometerContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
`;
const SpeedImg = styled.img`
  width: 25rem;
  height: 20rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
`;
const SpeedLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
const SpeedDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SpeedDate = styled.p`
  font-size: 2.4rem;
  font-weight: 400;
  color: #333;
`;
const SpeedDateM = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  color: #333;
  margin-left: 0.5rem;
`;
const SpeedLevel = styled.p`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${({ color }) => color || '#333'};
  margin-top: 0.8rem;
`;

// 메모 섹션
const MemoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  width: 36rem;
`;
const MemoTitle = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
`;
const MemoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MemoDetailTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const MemoDate = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #666;
  margin-right: 1rem;
`;
const MemoDetail = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #333;
  max-height: ${({ isOverflow }) => (isOverflow ? '8rem' : 'auto')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  word-break: break-all;
`;
const MemoMoreButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  color: #007bff;
  border: none;
  background: none;
  cursor: pointer;
  margin-top: 1rem;
`;
