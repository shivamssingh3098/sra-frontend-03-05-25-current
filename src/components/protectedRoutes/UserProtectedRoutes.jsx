import { Outlet } from "react-router-dom";
import { UserProtectedRoute } from "../../protected/UserProtectedRoute";

const UserProtectedRoutes = () => {
  return (
    <UserProtectedRoute>
      <Outlet />
    </UserProtectedRoute>
  );
};

export default UserProtectedRoutes;
