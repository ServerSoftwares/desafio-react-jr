const router = require('express').Router()
const Produtos = require('../models/Produtos')


router.post('/', async (req, res) => {
    const { codigo, descricao, data_cadastro, preco} = req.body
  
    const produtos = {
      codigo,
      descricao,
      preco,
      data_cadastro
    }
  
    try {
      await Produtos.create(produtos)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const produtos = await Produtos.find()
  
      res.status(200).json(produtos)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const produtos= await Produtos.findOne({ _id: id })
  
      if (!produtos) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(produtos)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.patch('/:id', async (req, res) => {
    const id = req.params.id
  
    const { codigo, descricao, preco} = req.body
  
    const produtos = {
      codigo,
      descricao,
      preco
    }
  
    try {
      const updatedProdutos = await Produtos.updateOne({ _id: id }, produtos)
  
      if (updatedProdutos.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(produtos)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const produtos = await Produtos.findOne({ _id: id })
  
    if (!produtos) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Produtos.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  module.exports = router