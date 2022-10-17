import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const GlobalLoading = ({children}) => {
    const {globalLoading} = useContext(UserContext);

    return(
        <>
        {globalLoading ? (
            <h5>Carregando...</h5>
        ) : (
            {children}
        )}
        </>
    )
}
export default GlobalLoading;