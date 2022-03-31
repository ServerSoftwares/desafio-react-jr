import { Component } from "react";
import api from "./api";
import app from './App.css'


class App extends Component{

  state= {
    produtos: [],
  }

  async componentDidMount(){
    const response = await api.get('');

    this.setState({produtos: response.data})
   
  }
  

  render(){

    const { produtos } = this.state;
    
    return(
      <div>
        <h1>Listar os produtos</h1>
        {console.log(produtos)}
        {produtos.map(produto => (
          <li className="Produtos" key={produto.id}>
            <h2 className="Title">
              <strong>Codigo: </strong>
              {produto.codigo} 
            </h2>
            <p>
            <strong>Descrição: </strong>
              {produto.descricao}
              <button className="btn" >Editar</button>
              <button className="btn">detalhes</button>
            </p>

          </li>
        ))}
      </div>
    )
  }
}

export default App;
