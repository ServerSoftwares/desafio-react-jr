const express = require('express')
//const res = require('express/lib/response')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use((req, res, next) =>{
    //console.log("Acessou o Middleware!")
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors());
    next();
})

const produtosRoutes = require('./routes/produtosRoutes')

app.use('/produtos', produtosRoutes)

app.get('/', (req,res) =>{
    res.json({message: 'Olá, Mundo'})
})


mongoose.connect('mongodb+srv://barth:cgKaZdP5TAquTddF@cluster0.plp1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ')
    .then(() => {
        console.log('Conectado ao MongoDB')
        app.listen(5501)
    })
    .catch((err) => console.log(err))
