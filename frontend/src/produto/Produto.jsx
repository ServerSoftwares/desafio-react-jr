import React from "react";
import './Produto.css';
import  { useState } from "react";


var prod = function Produto(props){

    const [showDetalhes, setShowDetalhes] = useState(0)

    const [Edit, setEdit] = useState(0)





    
    function detalhes(){

if(showDetalhes === 1){
    var data = new Date(props.data_cadastro)

    if(data.getDate()>9){
var data_cadastro = ""+ data.getDate()+"/"
    }else{
        var data_cadastro = "0"+ data.getDate()+"/"
    }

    if((data.getMonth() + 1)>9){
         data_cadastro += ""+ (data.getMonth()+1)+"/"
            }else{
                 data_cadastro += "0"+ (data.getMonth()+1)+"/"
            }

            data_cadastro+=data.getFullYear()


return(<React.Fragment>
    <div id="precoProd">Preço: R${props.preco}</div>
    <div id="dataProd">Data de cadastro: {data_cadastro}</div>
</React.Fragment>)

}else{
   
    return
}
    }

    function controleDetalhes(){
        if(showDetalhes===1){
            setShowDetalhes(0)
        }else{
setShowDetalhes(1)
        }
    }

    function liberarEdit(){
if(Edit===1){
return(
    <div id="caixaEdit">
        <input type="text" placeholder="Digite a nova descrição" id="NovaDesc"></input>
        <input type="number" placeholder="Digite o novo preço" id="NovoPreco"></input>
       <div id="CaixaBotoesEdit"> <div onClick={()=>props.attProd()}>Enviar</div><div onClick={()=>setEdit(0)}>Voltar</div></div>
    </div>
)
}else{
    return
}
    }

    return(
    <div className="produto">
<div id="codProduto">Cod: {props.codigo}</div>
<div id="descricaoProduto">{props.descricao}</div>
{detalhes()}
<div id="botoes"><div id="editarProd" onClick={()=>setEdit(1)}>Editar</div><div id="excluirProd" onClick={()=>props.excluir()}>Excluir</div><div id="detalhesProd" onClick={()=>controleDetalhes()}>Detalhes</div></div>
{liberarEdit()}
</div>
    )
}

export default prod