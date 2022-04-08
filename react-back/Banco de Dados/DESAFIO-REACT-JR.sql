create database DESAFIO_REACT_JR;

use DESAFIO_REACT_JR;

create table PRODUTO 
(
codigo tinyint(20) primary key NOT NULL AUTO_INCREMENT,
descricao varchar(50) NOT NULL,
preco float(30) NOT NULL,
data_cadastro date
);