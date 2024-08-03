import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
// import DietTest from './pages/DietTest/DietTest';
// import TestResult from './pages/TestResult/TestResult';
// import DailyResult from './pages/DailyResult/DailyResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'main/:userId',
        element: <MainPage />,
      },
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
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
