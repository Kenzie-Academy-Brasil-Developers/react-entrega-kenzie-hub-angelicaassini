import {createContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import apiKenzieHub from '../services/api';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext({});

const UserProvider = ({children})  => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location=useLocation();

    
    async function loginUser(data){
        try{
            const response = await apiKenzieHub.post('/sessions', data);
            const {user: userResponse, token} = response.data;
            apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`;
            
            setUser(userResponse);
            localStorage.setItem('@KENZIEHUB-TOKEN', token);
            
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
        async function loadUser(){
            const token = localStorage.getItem('@KENZIEHUB-TOKEN');

            if(token){
                try{
                    apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`
                    const {data} = await apiKenzieHub.get('/profile');
                    setUser(data);
                }
                catch(error){
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
            }
            setLoading(false);
        }
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{loginUser, user, loading}}>
            {children}
        </UserContext.Provider>
    );
};
export default  UserProvider;