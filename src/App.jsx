import GlobalStyles from './GlobalStyles';
import './reset.css';
import { Outlet } from 'react-router-dom';
import Loading from './pages/Loading/Loading'

function App() {
  return (
    <>
    <Loading/>
      <GlobalStyles/>
      <Outlet/>
    </>
  )
}

export default App;
