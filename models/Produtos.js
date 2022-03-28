const mongoose = require('mongoose')

const Produtos = mongoose.model('Produtos', {
    codigo: Number, 
    descricao: String,
    preco: Number,
    data_cadastro: Date
})

module.exports = Produtos