import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";


const RoutesMain = () => (
    <Routes>
        <Route path='/'          element={ <Navigate to={'/login'}/> }/>
        <Route path='/login'     element={ <Login/> }/>
        <Route path='/register'  element={ <Register/> }/>
        <Route path='/dashboard' element={ <Dashboard/> }/>
    </Routes>
)
export default RoutesMain;
