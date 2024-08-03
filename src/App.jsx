import GlobalStyles from './GlobalStyles';
import './reset.css';
import { Outlet } from 'react-router-dom';
import { UserInfoContextProvider } from './store/UserInfoCtx';

function App() {
  return (
    <>
      <UserInfoContextProvider>
        <GlobalStyles />
        <Outlet />
      </UserInfoContextProvider>
    </>
  );
}

export default App;
