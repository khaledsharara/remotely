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
import { ProfilePage } from "./employee/profile/App";
import Dashboard from "./Manager/Dashboard/pages/Dashboard";
import Task from "./Manager/Dashboard/pages/Task";

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
    {
      path: "/profile",
      element: (
        <ProtectedRoute allowedRoles={["employee"]}>
          <NavBar />
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute allowedRoles={["manager"]}>
          <NavBar />
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Navigate to="tasks" replace /> },
        { path: "tasks", element: <Task /> },
        { path: "tasks/addTasks", element: <Task /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
