import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import apiKenzieHub from "./services/api";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object({
  title:  yup.string().required("Tecnologia é obrigatória"),
  status: yup.string().required("Status é obrigatório"),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddModal = () => {
  const {register, handleSubmit, formState: {errors} } =
  useForm({resolver: yupResolver(schema)});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function createTech(data) {
    try{
      await apiKenzieHub.post("/users", data)
      Navigate('/login');
      toast.success('Tecnologia cadastrada com sucesso!', {
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
        toast.error('Ops! Esta tecnologia já está cadastrada', {
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

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <form onSubmit={handleSubmit(createTech)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Cadastrar Tecnologia</Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <label htmlFor="title">Nome</label>
              <input
                id="title"
                type="text"
                placeholder="Digite o nome da tecnologia"
                {...register("title")}
              />
              <p>{errors.title?.message}</p>

              <label htmlFor="status">Selecionar status</label>
                <select id="status" {...register("status")}>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                </select>

              <button type="submit">Cadastrar Tecnologia</button>
            </Typography>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export default AddModal;