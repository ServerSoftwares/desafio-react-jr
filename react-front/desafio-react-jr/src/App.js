import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterProduto = () => {
    Axios.post("http://localhost:3001/register", {
      codigo: values.codigo,
      descricao: values.descricao,
      preco: values.preco,
      data_cadastro: values.data_cadastro,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        codigo: values.codigo,
        descricao: values.descricao,
        preco: values.preco,
        data_cadastro: values.data_cadastro,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id, //CHECAR
            codigo: values.codigo,
            descricao: values.descricao,
            preco: values.preco,
            data_cadastro: values.data_cadastro,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterProduto} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
      ))}
    </div>
  );
}
