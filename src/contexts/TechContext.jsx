import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import apiKenzieHub from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

const TechProvider = ({children}) => {
    const {setGlobalLoading} = useContext(UserContext)

    const [techs, setTechs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    
        async function createTech(data){            
                setGlobalLoading(true)
                try{
                    const newTech = await apiKenzieHub.post("/users/techs", data)
                    setTechs((oldTechs) => [...oldTechs, newTech.data])
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

    async function removeTech(tech_id){
        const token = localStorage.getItem("@KENZIEHUB-TOKEN");

        if(token){
            try{
                await apiKenzieHub.delete(`/users/techs/${tech_id}`)
                const newTechs = techs.filter((tech) => tech.id !== tech_id)
                setTechs(newTechs)
                toast.success('Tecnologia removida com sucesso!', {
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
    };
    

    return(
        <TechContext.Provider value={{techs, setTechs, createTech, removeTech, modalIsOpen, setModalIsOpen}}>
            {/* {console.log(techs)} */}
            {children}
        </TechContext.Provider>
    )
}
export default TechProvider;