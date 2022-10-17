import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoutes from  "../components/ProtectedRoutes"
import AddModal from "../AddModal";


const RoutesMain = () => (
    <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route element={<ProtectedRoutes/>}>
            <Route path='/modal' element={<AddModal/>} />
            <Route path='/register'  element={ <Register/> }/>
            <Route path='/dashboard' element={ <Dashboard/> }/>
        </Route>
    </Routes>
)
export default RoutesMain;
