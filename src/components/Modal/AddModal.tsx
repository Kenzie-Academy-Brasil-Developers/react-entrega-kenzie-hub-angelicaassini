import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

import {TechContext} from '../../contexts/TechContext';


import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import * as React from 'react';


import { Modal } from "./styles";

const schema = yup.object({
  title:  yup.string().required("Tecnologia é obrigatória"),
  status: yup.string().required("Status é obrigatório"),
});

export interface ITechsFormData{
  title: string;
  status: string;
}

const AddModal = () => {
  const {createTech, setModalIsOpen, techs} = useContext(TechContext)

  const {register, handleSubmit, formState: {errors} } =
  useForm<ITechsFormData>({resolver: yupResolver(schema)});

  useEffect(() =>{
    
  }, [techs])

  return (
    <>
      <Modal >
          <form onSubmit={handleSubmit((data)=> createTech(data))}>
           
              <div className="h1-button">
                <h1>Cadastrar Tecnologia</h1>
                <button onClick={() => setModalIsOpen(false)}>X</button>
              </div>
              <div className="input1">
              <label htmlFor="title">Nome</label>
              <input
                id="title"
                type="text"
                placeholder="Digite o nome da tecnologia"
                {...register("title")}
              />
              <p>{errors.title?.message}</p>
              </div>
              <div className="select-option">
              <label htmlFor="status">Selecionar status</label>
                <select id="status" {...register("status")}>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>
                </div>
              <button type="submit">Cadastrar Tecnologia</button>
          </form>     
      </Modal>
    </>
  );
};
export default AddModal;

