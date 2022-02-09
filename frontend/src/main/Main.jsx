import React from "react";
import './Main.css';
import  { useEffect, useState } from "react";
import Axios from "axios";
import Produto from '../produto/Produto.jsx'
var main = function Main(){
    
    const [listaProdutos, setListaProdutos] = useState([])

    const [NovoProd, setNovoProd] = useState(0)

    useEffect(()=>{
   
        Axios.get('http://localhost:3001/produtos').then((resp)=>{

        setListaProdutos(resp.data.result)
      })

},[]);


function att(){
    Axios.get('http://localhost:3001/produtos').then((resp)=>{

    setListaProdutos(resp.data.result)
})
}



function GerarNovoProduto(){

    if(NovoProd === 1){

        return(
        <div id="novoProd">
        <input type="text" id="descricaoInput" placeholder="Digite a descrição"></input>
        <input type="number" id="precoInput" placeholder="Digite o preço"></input>
        <div id="enviarNovoProd" onClick={()=>EnviarNovoProduto()}>Enviar</div>
       </div>)
    }else{

        return
    }
}



function EnviarNovoProduto(){

   var obj = {
       descricao: document.getElementById("descricaoInput").value,
       preco: document.getElementById("precoInput").value
   } 

    Axios.post("http://localhost:3001/produtos",obj).then(resp => {
        console.log(resp)
        att()
    })

}



function excluirProd(codigo){
    if(window.confirm("Deseja mesmo excluir este item?")){
        Axios.delete('http://localhost:3001/produtos/'+codigo).then((resp)=>{

        console.log(resp)
        att()
        
        })
    }
}



function attProd(cod){

    var novaDesc = document.getElementById("NovaDesc").value
    var novoPreco2 = parseFloat(document.getElementById("NovoPreco").value)

    var obj={

       descricao: novaDesc,
       preco: novoPreco2

    }

    Axios.patch("http://localhost:3001/produtos/"+cod,obj).then(resp => {
        console.log(resp);
        att();
    })
}




    return (
<div id="container">
     <div id="containerProdutos">{listaProdutos.map((value,key)=>{
            
            return <Produto key = {value.codigo} codigo={value.codigo} descricao={value.descricao} preco={value.preco} data_cadastro={value.data_cadastro} excluir={()=>excluirProd(value.codigo)} attProd={()=>attProd(value.codigo)}></Produto>})}</div>
            <div id="EnviarNovoProd" onClick={()=>setNovoProd(1)}>+</div>

            {GerarNovoProduto()}
</div>

    )
}

export default main