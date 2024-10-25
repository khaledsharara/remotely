import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage as EmployeeHomePage } from "./employee/home/App";
import { LoginPage } from "./auth/App";
import ProtectedRoute from "./shared/utils/ProtectedRoutes";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute allowedRoles={["employee"]}>
          <EmployeeHomePage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
