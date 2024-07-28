import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
// import Login from './pages/Login/Login';
// import MainPage from './pages/MainPage/MainPage';
// import DietTest from './pages/DietTest/DietTest';
// import TestResult from './pages/TestResult/TestResult';
// import DailyResult from './pages/DailyResult/DailyResult';
import Loading from './pages/Loading/Loading';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/',
      //   element: <Login />,
      // },
      // {
      //   path: '/main',
      //   element: <MainPage />,
      // },
      // {
      //   path: '/test',
      //   element: <DietTest />,
      // },
      // {
      //   path: '/test_result',
      //   element: <TestResult />,
      // },
      // {
      //   path: '/daily_result',
      //   element: <DailyResult />,
      // },
      {
        path: '/loading',
        element: <Loading />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
