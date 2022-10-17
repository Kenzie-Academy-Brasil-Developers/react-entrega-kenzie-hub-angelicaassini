import { UserContext } from "../../contexts/UserContext";
import { TechContext } from "../../contexts/TechContext";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container, StyledNav, StyledTechs } from "./styles";
import {ModalLink as Link} from "./styles";
import Logo from "../../services/Logo.png";

import {BsTrash} from "react-icons/bs";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const { removeTech } = useContext(TechContext);

  const techs = user.techs
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    localStorage.removeItem('@KENZIEHUB-TOKEN');
    navigate("/", { replace: true });
  }

  return(
    <Container>
      <StyledNav>
        <img src={Logo} alt="logo Kenzie Hub" />
        <button type="button" onClick={() => logout}>Sair</button>
      </StyledNav>

      <header>
        <p>Olá, {user.name}</p>
        <span>{user.course_module}</span>
      </header>

      <StyledTechs>
        <div>
          <h2>Tecnologias</h2>
          <Link to={'/modal'}>+</Link>
        </div>
        <ul>
          {techs.map(tech => (
            <li key = {tech.id}>
              <h2>{tech.title}</h2>
              <div>
                  <h3>{tech.status}</h3>
                  <button type="button" onClick={() => removeTech(tech.id)}>
                    <BsTrash/>
                  </button>
              </div>
            </li>
          ))}
        </ul>
      </StyledTechs>
    </Container>
  )
};
export default Dashboard;
