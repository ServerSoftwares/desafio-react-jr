import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    codigo: props.codigo,
    descricao: props.descricao,
    preco: props.preco,
    data_cadastro: props.data_cadastro,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.codigo]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      codigo: editValues.codigo,
      descricao: editValues.descricao,
      preco: editValues.preco,
      data_cadastro: editValues.data_cadastro,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.codigo == editValues.codigo
            ? {
              codigo: editValues.codigo,
              descricao: editValues.descricao,
              preco: editValues.preco,
              data_cadastro: editValues.data_cadastro,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteProduto = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.codigo}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.codigo != editValues.codigo;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="Código do Produto"
            defaultValue={props.codigo}
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição do Produto"
            defaultValue={props.descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="preco"
            label="Preço"
            defaultValue={props.preco}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="data_cadastro"
            label="Data de aquisição"
            defaultValue={props.data_cadastro}
            type="date"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteProduto()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditProduto()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
