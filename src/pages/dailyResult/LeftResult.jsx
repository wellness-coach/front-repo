import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ko as koLocale } from "date-fns/locale";
import styled from "styled-components";
import "./calStyle.css";
function LeftResult() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false); // DatePicker 열림 상태
  const datePickerRef = useRef(null); // DatePicker의 ref
  const buttonRef = useRef(null); // 별표 아이콘의 ref

  // 요일 축약형 변환 함수
  const getShortDay = (date) => {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[date.getDay()];
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    return format(date, `yyyy.MM.dd (${getShortDay(date)})`, {
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
    <div className="date-picker-container">
      <button onClick={handleStarClick} ref={buttonRef}>
        달력
      </button>

      {/* DatePicker 컴포넌트 */}
      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy.MM.dd (EEEE)" // 날짜 포맷
        customInput={<span>{formatDate(selectedDate)}</span>} // 커스텀 입력
        open={open} // DatePicker의 열림 상태
        onClickOutside={() => setOpen(false)} // 외부 클릭 시 닫기
        onCalendarClose={() => setOpen(false)} // 달력 닫힐 때 상태 변경
        locale={koLocale} // 한글 로케일 설정
        popperModifiers={{
          offset: {
            enabled: true,
            offset: "0, 10px", // 별표 바로 아래에 위치하도록 설정
          },
        }}
      />
    </div>
  );
}

export default LeftResult;
