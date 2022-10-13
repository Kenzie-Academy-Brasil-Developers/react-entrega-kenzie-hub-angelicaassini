import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Container, StyledLoginForm } from "./styles";
import {LinkStyled as Link} from './styles';
import apiKenzieHub from "../../services/api";


const schema = yup.object({
    email:    yup.string().required("Email é obrigatório"),
    password: yup.string().required("Password é obrigatório"),
})

const Login = () => {

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema),
    })  

    const navigate =  useNavigate();

    async function loginUser (data){
        await apiKenzieHub.post("/sessions", data)
        .then((response) => {
            window.localStorage.clear();
            window.localStorage.setItem('@TOKEN', response.data.token);
            apiKenzieHub.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            window.localStorage.setItem('@USERID', response.data.user.id);
            navigate('/dashboard');
            toast.success('Login realizado com sucesso!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }) 
        .catch((error) => {
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
        })
    }

    return(

        <Container>
            <StyledLoginForm onSubmit={handleSubmit(loginUser)}>
                <title>Login</title>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Digite seu email" {...register("email")}/>
                <p>{errors.email?.message}</p>

                <label htmlFor="password">Senha</label>
                <input id="password" type="password" placeholder="Digite sua senha" {...register("password")}/>
                <p>{errors.password?.message}</p>

                <button type="submit">Entrar</button>

                <span>Ainda não possui uma conta?</span>
                <Link to={'/register'}>Cadastre-se</Link>
            </StyledLoginForm>
        </Container>
    )
};
export default Login;

