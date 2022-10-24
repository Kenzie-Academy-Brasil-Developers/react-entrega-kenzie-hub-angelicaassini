import Logo from '../../services/Logo.png'
import { ITechContext, TechContext } from "../../contexts/TechContext";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ContainerDashboard, StyledNav, StyledTechs } from "./styles";

import {BsTrash} from "react-icons/bs";
import AddModal from "../../components/Modal/AddModal";

import { IUserContext, UserContext } from "../../contexts/UserContext";


const Dashboard = () => {
  const {modalIsOpen, setModalIsOpen, removeTech, techs} 
    = useContext<ITechContext>(TechContext);
  
    const { user, setUser } = useContext<IUserContext>(UserContext);

  const navigate = useNavigate();

  useEffect(() =>{
    
  }, [techs])

  function logout() {
    setUser(null);
    localStorage.removeItem('@KENZIEHUB-TOKEN');
    // localStorage.removeItem('@KENZIEHUB-USERID');
    navigate("/", { replace: true });
  }
  
    return(
    <ContainerDashboard>
      <StyledNav>
        <img src={Logo} alt="logo Kenzie Hub" />
        <button type="button" onClick={() => logout()}>Sair</button>
      </StyledNav>

      <header>
        <p>Olá, {user?.name}</p>
        <span>{user?.course_module}</span>
      </header>

      <StyledTechs>
        <div>
          <h2>Tecnologias</h2>
          <button onClick={()=> setModalIsOpen(!modalIsOpen)}>+</button>
        </div>
        <ul>
          {techs.map(({id, title, status}) => (
            <li key = {id}>
              <h2>{title}</h2>
              <div>
                  <h3>{status}</h3>
                  <button type="button" onClick={() => removeTech(id)}>
                    <BsTrash/>
                  </button>
              </div>
            </li>
          ))}
        </ul>
      </StyledTechs>
      {modalIsOpen && <AddModal/>}
    </ContainerDashboard>

  )
};
export default Dashboard;
