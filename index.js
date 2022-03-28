const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

const produtosRoutes = require('./routes/produtosRoutes')

app.use('/produtos', produtosRoutes)

app.get('/', (req,res) =>{
    res.json({message: 'Olá, Mundo'})
})


mongoose.connect('mongodb+srv://barth:cgKaZdP5TAquTddF@cluster0.plp1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ')
    .then(() => {
        console.log('Conectado ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
