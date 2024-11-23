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
import Tasks from "./Manager/Dashboard/pages/Task";
import AddTasks from "./Manager/Dashboard/pages/AddTasks"; // Import AddTasks component
import ViewTask from "./Manager/Dashboard/pages/ViewTasks";
import Employee from "./Manager/Dashboard/pages/Employee";
import EmployeeProfile from "./Manager/Dashboard/pages/EmployeeProfile";
import Logs from "./Manager/Dashboard/pages/Logs";

function ErrorBoundary() {
  return (
    <div>Oops! This page does not exist or there was an error loading it.</div>
  );
}

function AppRouter() {
  const user = useSelector(selectUser);

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
      errorElement: <ErrorBoundary />, // Adding errorElement for a custom error message
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute allowedRoles={["employee"]}>
          <NavBar />
          <EmployeeHomePage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute allowedRoles={["employee"]}>
          <NavBar />
          <ProfilePage />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "dashboard/*",
      element: (
        <ProtectedRoute allowedRoles={["manager"]}>
          <NavBar />
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Navigate to="tasks" replace /> },
        { path: "tasks", element: <Tasks /> },
        { path: "add-tasks", element: <AddTasks /> },
        { path: "view-task/:id", element: <ViewTask /> },
        { path: "employees", element: <Employee /> },
        { path: "employees/:id", element: <EmployeeProfile /> },
        { path: "employees/logs/:id", element: <Logs /> }, // Ensure this path is correct
      ],
      errorElement: <ErrorBoundary />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
