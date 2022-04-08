//CHECAR MAIS UMA VEZ ULTIMA STRING E CONEXÃO COM BD

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "DESAFIO-REACT-JS",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { codigo } = req.body;
  const { descricao } = req.body;
  const { preco } = req.body;
  const { data_cadastro } = req.body;

  let mysql = "INSERT INTO PRODUTO ( codigo, descricao, valor, data_cadastro) VALUES (?, ?, ?, ?)";
  db.query(mysql, [codigo, descricao, preco, data_cadastro], (err, result) => {
    res.send(result);
  });
});

app.post("/search", (req, res) => {
    const { codigo } = req.body;
    const { descricao } = req.body;
    const { preco } = req.body;
    const { data_cadastro } = req.body;

  let mysql =
    "SELECT * from PRODUTOS WHERE codigo = ? AND descricao = ? AND preco = ? AND data_cadastro = ?";
  db.query(mysql, [codigo, descricao, preco, data_cadastro], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.get("/getCards", (req, res) => {  //CHECAR
  let mysql = "SELECT * FROM PRODUTOS";
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/edit", (req, res) => {
  const { codigo } = req.body;
  const { descricao } = req.body;
  const { preco } = req.body;
  const { data_cadastro } = req.body;
  let mysql = "UPDATE PRODUTOS SET codigo = ?, descricao = ?, preco = ? WHERE data_cadastro = ?"; //TESTAR COMANDO
  db.query(mysql, [codigo, descricao, preco, data_cadastro], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:codigo", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM PRODUTOS WHERE codigo = ?";
  db.query(mysql, codigo, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});