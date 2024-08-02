import React, { useEffect, useState } from 'react';

function Main() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // 사용자 ID가 없으면 로그인 페이지로 리디렉션
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {userId && <p>Your User ID: {userId}</p>}
    </div>
  );
}

export default Main;
