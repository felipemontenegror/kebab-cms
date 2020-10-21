const express = require('express');
const Product = require('../../models/product');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages');
const auth = require('../../middleaware/auth');
const file = require('../../middleaware/file');


// @route  GET /Product/:id
// @desc   DETAIL Product
// @acess  Public

//busca através de usuario id
router.get('/:id', auth, async (req,res, next) =>{ //rota de mudança dinamica async req/res
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
// @acess  Public

// Atualizar, alterar algum item
router.patch('/:id', auth, async (req, res, next) =>{
    try {
        const id = req.params.id
        const update = { $set: req.body } // $set palavra reservada q faz update apenas na propriedade do body 
        const product = await Product.findByIdAndUpdate(id, update, { new: true}) // new = true devolve atualizado
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
// @acess  Public

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
router.get('/', auth, async (req,res, next) =>{
    try {
        const product = await Product.find({})
        res.json(product)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
    }
})

// @route  POST /product
// @desc   CREATE product
// @acess  Public
router.post('/', auth, file, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }   else {
            // TODO: get last_modified_by by req.user after code auth
            req.body.photo = `uploads/${req.files.photo.name}` // n entendi
            let product = new Product( req.body )
            await product.save()
            if (product.id) {
                res.json(product);
        }
    }
}   catch (err) {
    console.error(err.message)
    res.status(500).send({"error": MSGS.GENERIC_ERROR})
}
})

module.exports = router;
