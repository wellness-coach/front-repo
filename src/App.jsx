import DailyResult from './pages/DailyResult/DailyResult';
import GlobalStyles from './GlobalStyles';
import './reset.css';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <GlobalStyles />
      {/* <Outlet /> */}
      <DailyResult />
    </>
  );
}

export default App;
