const express = require('express');
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages');
const auth = require('../../middleaware/auth');
const file = require('../../middleaware/file');
const config = require('config');


// @route  GET /Product/:id
// @desc   DETAIL Product
// @acess  Public

//busca através de usuario id
router.get('/:id', async (req,res, next) =>{ //rota de mudança dinamica async req/res
    try {
        const id = req.params.id //constante id recebe a rota objeto de solicitação req.params do id 
        const product = await Product.findOne({_id : id}) //findOne passando ID como query
        if(product){
            res.json(product)
        }else{
            res.status(404).send({ "error": MSGS.PRODUCT404}) // verificar
        }
        res.json(product)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": MSGS.GENERIC_ERROR}) 
    }
})

// @route  PATCH /product/:id
// @desc   PARTIAL UPDATE product
// @acess  Private

// Atualizar, alterar algum item
router.patch('/:id', auth, file, async (req, res, next) =>{
    try {
        req.body.last_modified_by = req.user.id
        if(req.body.photo_name){
        req.body.photo = `product/${req.body.photo_name}` 
        }
        const product = await Product.findByIdAndUpdate(id, params.id, { $set: req.body}, { new: true}) // $set palavra reservada q faz update apenas na propriedade do body 
        if(product){
            res.json(product)
        }else{
            res.status(404).send({ "error": MSGS.PRODUCT404 })
        }
    }catch (err){
        console.error(err.message)
        res.status(500).send({ "error" : MSGS.GENERIC_ERROR})
    }
})


// @route  DELETE /product/:id
// @desc   DELETE product
// @acess  Private

// Filtra o ID e deleta (igual a um get id com findone and delete)
router.delete('/:id'), auth, async (req, res, next) =>{
    try{
        const id = req.params
        const product = await Product.findOneAndDelete({_id : id}) //chama Product ja filtrando por ID e deletando
        if(product){
            res.json(product)
        }else{
            res.status(404).send({ "error": MSGS.PRODUCT404 })
    }
    }catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
        
    }
}


// @route  GET /product
// @desc   LIST product
// @acess  Public

router.get('/', async (req, res, next) =>{
    try {
        let products = await Product.find({})
        const BUCKET_PUBLIC_PATH = process.env.BUCKET_PUBLIC_PATH || config.get('BUCKET_PUBLIC_PATH')
        products = products.map(function(product) {
          product.photo = `${BUCKET_PUBLIC_PATH}${product.photo}`
          return product
        })

        res.json(products)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
    }
})

// @route  POST /product
// @desc   CREATE product
// @acess  Private

router.post('/', auth, file, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        }   else {
            req.body.photo = `product/${req.body.photo_name}` 
            let product = new Product( req.body )
            product.last_modified_by = req.user.id
            await product.save()

            if (product.id) {
                const BUCKET_PUBLIC_PATH = process.env.BUCKET_PUBLIC_PATH || config.get('S3_BUCKET_NAME')
                product.photo = `${BUCKET_PUBLIC_PATH}${product.photo}`
                res.json(product);
        }
    }
}   catch (err) {
    console.error(err.message)
    res.status(500).send({"error": MSGS.GENERIC_ERROR})
}
})

module.exports = router;
