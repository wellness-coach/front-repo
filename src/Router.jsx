import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dailyresult",
        element: <DailyResult />,
      },
      // {
      //   path: "/test",
      //   element: <DietTest />,
      // },
      // {
      //   path: "/result",
      //   element: <DietResult />,
      // },
    ],
  },
]);
