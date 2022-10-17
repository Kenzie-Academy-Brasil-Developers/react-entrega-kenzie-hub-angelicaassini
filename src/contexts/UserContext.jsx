import {createContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import apiKenzieHub from '../services/api';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext({});

const UserProvider = ({children})  => {
    const [user, setUser] = useState(null);
    const [globalLoading, setGlobalLoading] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    
    async function loginUser(data, setGlobalLoading){

        try{
            setGlobalLoading(true);
            const response = await apiKenzieHub.post('/sessions', data);
            const {user: userResponse, token} = response.data;
            apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`;
            
            setUser(userResponse);
            localStorage.setItem('@KENZIEHUB-TOKEN', token);
            localStorage.setItem('@KENZIEHUB-USERID', user);
            
            const toNavigate = location.state?.from?.pathname || 'dashboard'
        
            navigate(toNavigate, {replace: true});
        }
        catch(error){
            toast.error('Ops! Algo deu errado', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('@KENZIEHUB-TOKEN');

            if(token){
                setGlobalLoading(true);
                try{
                    apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`
                    const {data} = await apiKenzieHub.get('/profile');
                    setUser(data);
                }
                catch(error){
                    localStorage.removeItem('@KENZIEHUB-TOKEN');
                    localStorage.removeItem('@USERID')
                    toast.error("Ops! Algo deu errado", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                }
                finally{
                    setGlobalLoading(false);
                }
            }
        })();  /*que é esse parenteses()?*/
    }, []);

    return (
        <UserContext.Provider value={{loginUser, user, globalLoading}}>
            {children}
        </UserContext.Provider>
    );
};
export default  UserProvider;