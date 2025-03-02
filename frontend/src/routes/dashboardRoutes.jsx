import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from '../components/protectedRoutes';



const DashboardRoutes = () => (
  <>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </>
);
export default DashboardRoutes;