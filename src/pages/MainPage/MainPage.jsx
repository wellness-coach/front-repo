// MainPage.js
import React, { useEffect, useState } from 'react';

function MainPage() {
  const [userId, setUserId] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId); // localStorage에서 읽은 userId를 상태로 설정
    } else {
      // userId가 없는 경우 처리
      console.log('No userId found in localStorage');
    }
  }, []);

  if (userId === null) {
    return <p>Loading...</p>; // userId가 아직 설정되지 않았을 때 로딩 상태 표시
  }

  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome User {userId}!</p> {/* userId를 화면에 표시 */}
    </div>
  );
}

export default MainPage;
