CREATE TABLE produtos (
  codigo int NOT NULL AUTO_INCREMENT,
  descricao varchar(300) NOT NULL,
  preco double NOT NULL,
  data_cadastro date NOT NULL,
  PRIMARY KEY (codigo)
) 