import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko as koLocale, sr } from "date-fns/locale";
import styled from "styled-components";
import "./calStyle.css";
import calendaricon from "../../assets/img/calendar.png";
import speedometerimg from "../../assets/img/speedometer.png";
function LeftResult() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false); // DatePicker 열림 상태
  const datePickerRef = useRef(null); // DatePicker의 ref
  const buttonRef = useRef(null); // 버튼의 ref

  // 요일 축약형 변환 함수
  const getShortDay = (date) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[date.getDay()];
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    return format(date, `yyyy년 MM월 dd일 (${getShortDay(date)})`, {
      locale: koLocale,
    });
  };

  // 아이콘 클릭 시 DatePicker 열기
  const handleStarClick = () => {
    setOpen(!open);
    if (!open) {
      datePickerRef.current?.setOpen(true); // DatePicker 열기
    }
  };

  return (
    <>
      <LeftResultWrapper>
        <CalendarWrapper>
          <CalendarContainer>
            <ResultName>ㅇㅇ님의 일별 리포트 분석</ResultName>
            <div className="date-picker-container">
              <button
                onClick={handleStarClick}
                ref={buttonRef}
                className="calendar-button"
              >
                <CalendarIcon src={calendaricon} alt="달력아이콘" />
              </button>

              {/* DatePicker 컴포넌트 */}
              <DatePicker
                ref={datePickerRef}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy년 MM월 dd일 (EEEE)" // 날짜 포맷
                customInput={
                  <CustomDateInput>{formatDate(selectedDate)}</CustomDateInput>
                } // 커스텀 입력
                open={open} // DatePicker의 열림 상태
                onClickOutside={() => setOpen(false)} // 외부 클릭 시 닫기
                onCalendarClose={() => setOpen(false)} // 달력 닫힐 때 상태 변경
                locale={koLocale} // 한글 로케일 설정
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
                          {format(date, "yyyy. M", { locale: koLocale })}
                        </span>
                      </div>
                      <div className="react-datepicker__navigation-container">
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="react-datepicker__navigation react-datepicker__navigation--previous"
                        >
                          {"<"}
                        </button>
                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="react-datepicker__navigation react-datepicker__navigation--next"
                        >
                          {">"}
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
            <SpeedImg src={speedometerimg} alt="속도계 이미지" />
            <SpeedLevelContainer>
              <SpeedDateContainer>
                <SpeedDate>07월 21일</SpeedDate>
                <SpeedDateM>건강 진단 결과</SpeedDateM>
              </SpeedDateContainer>

              <SpeedLevel>ㅇㅇ단계</SpeedLevel>
            </SpeedLevelContainer>
          </SpeedometerContainer>
          <MemoContainer>
            <MemoTitle>나의 메모</MemoTitle>
            <MemoDetailContainer>
              <MemoDetailTopContainer>
                <MemoDate>07.21</MemoDate>
                <MemoDetail>오늘은~~</MemoDetail>
              </MemoDetailTopContainer>

              <MemoMoreButton>더보기</MemoMoreButton>
            </MemoDetailContainer>
          </MemoContainer>
        </SpeedAndMemoContainer>
      </LeftResultWrapper>
    </>
  );
}

export default LeftResult;
const LeftResultWrapper = styled.section`
  display: flex;
  flex-direction: column;
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
  justify-content: center;
`;
const ResultName = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const CalendarIcon = styled.img`
  width: 3rem;
  height: 3rem;
`;

const CustomDateInput = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  background-color: white;
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
const SpeedometerContainer = styled.div``;

const SpeedImg = styled.img`
  width: 38.6rem;
  height: 17.9rem;
`;
const SpeedLevelContainer = styled.div`
  background-color: #e8e8e8;
  width: 36rem;
  height: 6.74rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 2.4rem;
  margin-top: 1rem;
`;
const SpeedDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-right: 2rem;
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
  font-weight: 600;
`;

// 메모 섹션
const MemoContainer = styled.div`
  background-color: white;
  width: 40.5rem;
  height: 25.5rem;
  border-radius: 1.5rem;
  box-shadow: 0px 3.471px 3.471px 0px rgba(0, 0, 0, 0.25);
  padding: 2.5rem 1.8rem;
  margin-top: 4rem;
`;
const MemoTitle = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;
const MemoDetailContainer = styled.div`
  width: 40.5rem;
  height: 19.2rem;
  border-radius: 15px;
  background: #f8f8f8;
  padding: 1.5rem 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 1.8rem;
  font-weight: 400;
`;
const MemoMoreButton = styled.div`
  width: 7.6rem;
  height: 2.1rem;
  border-radius: 1.7rem;
  font-size: 1rem;
  font-weight: 500;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
