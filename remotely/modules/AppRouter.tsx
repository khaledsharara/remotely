import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import { HomePage } from "./employee/App";
import { LoginPage } from "./auth/App";
import { selectUser } from "./shared/utils/userSlice";

function AppRouter() {
  const user = useSelector(selectUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <HomePage /> : <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
