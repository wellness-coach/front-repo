import React, { createContext, useState, useEffect } from 'react';

const UserInfoContext = createContext({
  userInfo: { userId: '', userName: '', userCheckupStatus: 'NOT_STARTED' },
  updateUserDefaultInfo: (id, name) => {},
  updateUserTestInfo: (checkupStatus) => {}, 
});

export function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : { userId: '', userName: '', userCheckupStatus: 'NOT_STARTED' };
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  function updateUserDefaultInfo(id, name) {
    setUserInfo(prevState => ({ ...prevState, userId: id, userName: name }));
  }

  function updateUserTestInfo(checkupStatus) {
    setUserInfo(prevState => ({...prevState, userCheckupStatus: checkupStatus}));
  }

  const userInfoCtx = {
    userInfo,
    updateUserDefaultInfo,
    updateUserTestInfo,
  };

  return <UserInfoContext.Provider value={userInfoCtx}>{children}</UserInfoContext.Provider>;
}

export default UserInfoContext;

