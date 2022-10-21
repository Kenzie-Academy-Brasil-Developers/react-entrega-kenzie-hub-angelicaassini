import {createContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import apiKenzieHub from '../services/api';

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext({});

const UserProvider = ({children})  => {
    const [user, setUser] = useState([]);
    const [techs, setTechs] = useState([]);
    const [globalLoading, setGlobalLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    async function registerUser(data) {
        try{
            await apiKenzieHub.post("/users", data)
            navigate('/');
            toast.success('Conta criada com sucesso!', {
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
                setGlobalLoading(true);
                try{
                    apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`
                    const {data} = await apiKenzieHub.get('/profile');
                    setUser(data);
                    setTechs(data.techs);
                    // const toNavigate = location.state?.from?.pathname || '/dashboard'
                    // navigate(toNavigate, {replace: true});
                }
                catch(error){
                    localStorage.removeItem('@KENZIEHUB-TOKEN');
                    localStorage.removeItem('@KENZIEHUB-USERID')
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
        }
        loadUser();
    }, []);

    
    async function loginUser(data){
        
        try{
            setGlobalLoading(true);
            const response = await apiKenzieHub.post('/sessions', data);
            console.log(response)
            const {user: userResponse, token} = response.data;
            apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`;
            setUser(userResponse);
            console.log(user)
            setTechs(userResponse.techs)

            localStorage.setItem('@KENZIEHUB-TOKEN', token);
            localStorage.setItem('@KENZIEHUB-USERID', user.id);

            console.log(location.state?.from?.pathname)
            const toNavigate = location.state?.from?.pathname || '/dashboard'
            console.log(toNavigate)
            
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
        finally{
            setGlobalLoading(false)
        }
    }
    

    return (
        <UserContext.Provider value={{registerUser, loginUser, user, setUser, techs, setTechs, globalLoading, setGlobalLoading}}>
            {children}
        </UserContext.Provider>
    );
};
export default  UserProvider;