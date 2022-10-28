import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiKenzieHub from "../services/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IRegisterFormData } from "../pages/Register/Register";
import { ILoginFormData } from "../pages/Login/Login";
import { AxiosError } from "axios";

interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  course_module: string;
  bio: string;
  contact: string;
  techs: ITech[];
  // works: Iworks[];
}

interface ITech {
  id: string;
  title: string;
  status: string;
}

export interface IUserContext {
  registerUser: (data: IRegisterFormData) => void;
  loginUser: (data: ILoginFormData) => void;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  techs: ITech[];
  setTechs: React.Dispatch<React.SetStateAction<ITech[]>>;
  globalLoading: boolean;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IApi {
  status: string;
  message: string;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [techs, setTechs] = useState<ITech[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  async function registerUser(data: IRegisterFormData) {
    try {
      await apiKenzieHub.post("/users", data);
      navigate("/");
      toast.success("Conta criada com sucesso!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Ops! Seu cadastro deu errado", {
        position: "top-right",
        autoClose: 2500,
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
    async function loadUser() {
      const token = localStorage.getItem("@KENZIEHUB-TOKEN");

      if (token) {
        setGlobalLoading(true);
        try {
          apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`;
          const { data } = await apiKenzieHub.get("/profile");
          console.log(data)
          setUser(data);
          setTechs(data.techs);
          const toNavigate = location.state?.from?.pathname || "/dashboard";
          navigate(toNavigate, { replace: true });
        } catch (error) {
          localStorage.removeItem("@KENZIEHUB-TOKEN");
          localStorage.removeItem("@KENZIEHUB-USERID");
          const requestError = error as AxiosError<IApi>;
          toast.error(requestError.response?.data.message, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } 
        finally {
            setGlobalLoading(false);
        }
      }
    }
    loadUser();
  }, []);

  async function loginUser(data: ILoginFormData) {
    try {
      setGlobalLoading(true);
      const response = await apiKenzieHub.post("/sessions", data);

      const { user: userResponse, token } = response.data;
      apiKenzieHub.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userResponse);
      setTechs(userResponse.techs);

      localStorage.setItem("@KENZIEHUB-TOKEN", token);
      localStorage.setItem("@KENZIEHUB-USERID", userResponse.id);

      const toNavigate = location.state?.from?.pathname || "/dashboard";
      navigate(toNavigate, { replace: true });
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Ops! Algo deu errado, tente novamente", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setGlobalLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        registerUser, loginUser,
        user, setUser,
        techs, setTechs,
        globalLoading, setGlobalLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

export function useUserContext(){
  const context = useContext<IUserContext>(UserContext);
  return context
}