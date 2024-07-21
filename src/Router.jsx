import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login/>
      },
      {
        path: '/main',
        element: <Main />
      },
      {
        path: '/test',
        element: <DietTest />
      },
      {
        path: '/result',
        element: <DietResult />
      }
    ]
  }]);
