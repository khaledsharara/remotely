import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { HomePage as EmployeeHomePage } from "./employee/home/App";
import { LoginPage } from "./auth/App";
import ProtectedRoute from "./shared/utils/ProtectedRoutes";
import NavBar from "./shared/components/NavBar";
import { useSelector } from "react-redux";
import { selectUser } from "./shared/utils/userSlice";

function AppRouter() {
  const user = useSelector(selectUser);
  console.log(user, "user");
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        user && user.role ? (
          user.role === "employee" ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        ) : (
          <LoginPage />
        ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute allowedRoles={["employee"]}>
          <NavBar />
          <EmployeeHomePage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
