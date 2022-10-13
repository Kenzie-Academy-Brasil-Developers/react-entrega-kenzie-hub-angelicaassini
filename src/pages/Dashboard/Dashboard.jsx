import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Logo from '../../services/Logo.png';
import apiKenzieHub from "../../services/api";
import {Container} from './styles';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = window.localStorage.getItem("@TOKEN");

  useEffect(() => {
    console.log(token);
    if (token) {
      apiKenzieHub.defaults.headers["Authorization"] = `Bearer ${token}`;
      // {headers: { Authorization: `Bearer ${token}` }}
      apiKenzieHub
        .get("/profile")
        .then((response) => {
          console.log(response);
          const {data} = response
          setUser(data)
        })
        .catch((error) => {
          console.log("deu ruim");
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
        });
    }
  }, [token]);

  function logout() {
    setUser("");
    window.localStorage.clear();
    navigate("/login", { replace: true });
  }

  return (
    <Container>
      <nav>
                <img src={Logo} alt="logo Kenzie Hub" />
                <button onClick={logout}>Sair</button>
      </nav>
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
