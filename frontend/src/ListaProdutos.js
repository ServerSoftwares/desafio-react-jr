import React from 'react'
import axios from 'axios'

export default class ListaProdutos extends React.Component{

    state={
        produtos:[]
    }

    componentDidMount(){
        axios.get('http://localhost:5501/produtos')
        .then(res=>{
            const dadosProdutos=res.data
            this.setState({produtos:dadosProdutos})
        })
    }

    render(){
        return(
            <div>
                {this.setState.produtos.map(
                    produto=> <div key={produto.codigo}> {produto.descricao} - {produto.preco} </div>
                )}
            </div>
        )
    }
}