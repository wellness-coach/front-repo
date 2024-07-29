import GlobalStyles from './GlobalStyles';
import './reset.css';
import { Outlet } from 'react-router-dom';
import Login from './pages/Login/Login';
function App() {
  return (
    <>
      <Login />
      <GlobalStyles />
      {/* <Outlet /> */}
    </>
  );
}

export default App;
