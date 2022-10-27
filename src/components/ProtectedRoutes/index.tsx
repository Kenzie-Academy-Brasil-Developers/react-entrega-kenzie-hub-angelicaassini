import { useContext } from "react";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { IUserContext, UserContext } from "../../contexts/UserContext";

const ProtectedRoutes = () => {
    const {user, globalLoading} = useContext<IUserContext>(UserContext);
    const location = useLocation();

    if(globalLoading) {
        return null;
    }

    return (
        <>
            {user ? 
            (
                <Outlet/>
            ) : 
            (
                <Navigate to= '/' replace state={{from: location}}/>
            )
            }
        </>)
};
export default ProtectedRoutes;