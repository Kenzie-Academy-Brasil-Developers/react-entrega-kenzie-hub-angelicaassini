import { IUserContext, UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";

import { Container, StyledLoginForm } from "./styles";
import { LinkStyled as Link } from "./styles";

export interface  ILoginFormData{
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("Email é obrigatório"),
  password: yup.string().required("Password é obrigatório"),
});

const Login = () => {
  const { loginUser}  = useContext<IUserContext>(UserContext);

  const {register, handleSubmit, formState: { errors }} = 
  useForm<ILoginFormData>({resolver: yupResolver(schema)});

  return (
    <Container>
      <StyledLoginForm onSubmit={handleSubmit(loginUser)}>
        <title>Login</title>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <button type="submit">Entrar</button>

        <span>Ainda não possui uma conta?</span>
        <Link to={"/register"}>Cadastre-se</Link>
      </StyledLoginForm>
    </Container>
  );
};
export default Login;
