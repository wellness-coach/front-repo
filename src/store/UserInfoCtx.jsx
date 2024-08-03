import { createContext, useState } from 'react';

const UserInfoContext = createContext({
  userInfo: { userId: '', userName: ''}, 
  updateUserInfo: (id, name) => {},

});

export function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({ userId: '', userName: ''});

  function updateUserInfo(id, name) {
    setUserInfo({userId: id, userName: name,});
  }

  const userInfoCtx = {
    userInfo,
    updateUserInfo
  };

  return (
    <UserInfoContext.Provider value={userInfoCtx}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContext;