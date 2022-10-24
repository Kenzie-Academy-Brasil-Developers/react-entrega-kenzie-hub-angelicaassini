import { useForm } from "react-hook-form";

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';

import { Container, StyledRegisterForm } from "./styles";
import { useContext } from "react";
import { IUserContext, UserContext } from "../../contexts/UserContext";

const schema = yup.object({
    name:                 yup.string().required("Nome é obrigatório"),
    email:                yup.string().email("Deve ser um email válido").required("Email é obrigatório"),
    password:             yup.string()
                            .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
                            .matches(/[a-z]/, 'Deve conter ao menos 1 letra minúscula')
                            .matches(/\d/, 'Deve conter ao menos 1 número')
                            .matches(/[\W|_]/,'Deve conter um caractere especial')
                            .matches(/.{8,}/, 'Deve ter no mínimo 8 caracteres')
                            .required("Senha é obrigatória"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], "Confirmação de senha deve ser igual a senha"),
    bio:                  yup.string().required("A bio é obrigatória"),
    contact:              yup.string().required("O contato é obrigatório"),
    course_module:        yup.string().required(),

})

export interface IRegisterFormData{
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    bio: string;
    contact: string;
    course_module: string;

}

const Register = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<IRegisterFormData>({
        resolver: yupResolver(schema),
    });

    const {registerUser} = useContext<IUserContext>(UserContext)  

    return(
        <Container> 
            <StyledRegisterForm  onSubmit={handleSubmit(registerUser)}>
                <div className="title">
                    <h1>Crie sua conta</h1>
                    <h3>Rápido e grátis, vamos nessa</h3>
                </div>
                <label htmlFor="name">Nome</label>
                <input id="name" type="text" placeholder="Digite aqui seu nome" {...register("name")}/>
                <p>{errors.name?.message}</p>

                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Digite aqui seu email" {...register("email")}/>
                <p>{errors.email?.message}</p>

                <label htmlFor="password">Senha</label>
                <input id="password" type="password" placeholder="Digite aqui sua senha" {...register("password")}/>
                <p>{errors.password?.message}</p>

                <label htmlFor="passwordConfirmation">Confirmar senha</label>
                <input id="passwordConfirmation" type="password" placeholder="Digite novamente sua senha"/>
                <p>{errors.passwordConfirmation?.message}</p>

                <label htmlFor="bio">Bio</label>
                <input id="bio" type="text" placeholder="Fale sobre você" {...register("bio")}/>
                <p>{errors.bio?.message}</p>

                <label htmlFor="contact">Contato</label>
                <input id="contact" type="text" placeholder="Opção de contato" {...register("contact")}/>
                <p>{errors.contact?.message}</p>

                <label htmlFor="course_module">Selecionar módulo</label>
                <select id="course_module" {...register("course_module")}>
                    <option value="Primeiro Módulo (Introdução ao Frontend)">Primeiro Módulo (Introdução ao Frontend)</option>
                    <option value="Segundo Módulo (Frontend Avançado)">Segundo Módulo (Frontend Avançado)</option>
                    <option value="Terceiro Módulo (Introdução ao Backend)">Terceiro Módulo (Introdução ao Backend)</option>
                    <option value="Quarto Módulo (Backend Avançado)">Quarto Módulo (Backend Avançado)</option>
                </select>

                <button type="submit">Cadastrar</button>
            </StyledRegisterForm>
        </Container>
    )
};
export default Register;