import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ITechsFormData } from "../components/Modal/AddModal";

import apiKenzieHub from "../services/api";
import { IUserContext, UserContext } from "./UserContext";

export interface ITechProviderProps{
    children: React.ReactNode;
}

interface IModalIsOpen{
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ITechContext{
    techs:ITechsResponse[];
    setTechs: React.Dispatch<React.SetStateAction<ITechsResponse[]>>;
    createTech:(data: ITechsFormData)  => void;
    removeTech:(tech_id: string) => void;
    modalIsOpen:boolean;
    setModalIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

interface ITechsResponse{
    id: string;
    title: string;
    status: string;
}

export const TechContext = createContext({} as ITechContext);

const TechProvider = ({children}: ITechProviderProps) => {
    const {techs, setTechs, setGlobalLoading} = useContext<IUserContext>(UserContext) 
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    
        async function createTech(data: ITechsFormData){            
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

    async function removeTech(tech_id: string){
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