import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const GlobalLoading = () => {
    const {globalLoading} = useContext(UserContext);

    return globalLoading ? (
            <h5 style={{color: "white"}}> Carregando...</h5>
        ) : (
            <Outlet/>
        )
}
export default GlobalLoading;