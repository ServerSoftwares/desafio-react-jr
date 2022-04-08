import React from "react";
import "./card.css";
import FormDialog from "./dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        codigo={props.codigo}
        descricao={props.descricao}
        preco={props.preco}
        listCard={props.listCard}
        setListCard={props.setListCard}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-codigo">{props.codigo}</h1>
        <p className="card-descricao">{props.descricao}</p>
        <p className="card-data_cadastro">{props.data_cadastro}</p>
        <h3 className="card-preco">R${props.preco}</h3>
      </div>
    </>
  );
}
