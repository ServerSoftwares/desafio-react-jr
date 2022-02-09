const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const PORT = 3001;

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Reidekonoh@753',
    database: 'desafio',
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.json())


app.get("/produtos",(req,res)=>{

    const query = "SELECT * FROM produtos";
    db.query(query, (err,result)=>{
        res.json({result: result})
    });
    
});  


app.post("/produtos", (req, res)=>{

        const produto = req.body
        var dia_atual = new Date();
        var data_cadastro = dia_atual.getFullYear();
        data_cadastro+="-0"+(dia_atual.getMonth()+1)+"-0"+dia_atual.getDate();

        const query= "INSERT INTO produtos (descricao,preco,data_cadastro) VALUES (?,?,?)";
        db.query(query,[produto.descricao, produto.preco, data_cadastro],(err,result)=>{
        
        res.json({result: result})
        });
});


app.get("/produtos/:codigo",(req,res)=>{
        const {codigo} = req.params;
        query = "SELECT * FROM produtos WHERE codigo = ?"     

        db.query(query,[codigo],(err,result)=>{
        
        res.json({result: result})

    });
});  


app.delete("/produtos/:codigo",(req,res)=>{
    
         const {codigo} = req.params;
                 
         query = "DELETE FROM produtos WHERE codigo=?"
                
         db.query(query,[codigo],(err,result)=>{
        
            res.json({result: result})
        });

})


app.patch("/produtos/:codigo",(req,res)=>{

        const produto = req.body
        const {codigo} = req.params;
        const query = "UPDATE produtos SET  descricao = ?, preco = ?  WHERE codigo = ?";

        db.query(query,[produto.descricao, produto.preco, codigo],(err,result)=>{
        res.json({result: result})

    });
})


app.listen(PORT,()=>{
    console.log('porta 3001 aberta');
})