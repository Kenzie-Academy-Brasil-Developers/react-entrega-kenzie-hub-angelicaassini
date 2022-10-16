import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Logo from "../../services/Logo.png";
import { Container, StyledNav } from "./styles";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    setUser("");
    localStorage.removeItem('@KENZIEHUB-TOKEN');
    navigate("/login", { replace: true });
  }

  return (
    <Container>
      <StyledNav>
        <img src={Logo} alt="logo Kenzie Hub" />
        <button onClick={logout}>Sair</button>
      </StyledNav>
      <header>
        <p>Olá, {user.name}</p>
        <span>{user.course_module}</span>
      </header>
      <main>
        <h1>Que pena! Estamos em desenvolvimento:(</h1>
        <h3>
          Nossa aplicação está em desenvolvimento, breve teremos novidades
        </h3>
      </main>
    </Container>
  );
};
export default Dashboard;
