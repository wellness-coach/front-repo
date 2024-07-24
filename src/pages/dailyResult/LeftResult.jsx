import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko as koLocale } from "date-fns/locale";
import styled from "styled-components";
import "./calStyle.css";
import calendaricon from "../../assets/img/calendar.png";

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
    </>
  );
}

export default LeftResult;

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
