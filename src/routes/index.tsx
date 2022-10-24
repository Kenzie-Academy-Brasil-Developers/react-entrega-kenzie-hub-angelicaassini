import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoutes from "../components/ProtectedRoutes";
import GlobalLoading from "../components/GlobalLoading";

const RoutesMain = () => {
  return (
    <Routes>
      <Route element={<GlobalLoading />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default RoutesMain;
