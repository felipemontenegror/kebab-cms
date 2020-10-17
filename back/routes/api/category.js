const express = require('express');
const Category = require('../../models/category');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages');
const auth = require('../../middleaware/auth');


// @route  GET /Category/:id
// @desc   DETAIL Category
// @acess  Public

//busca através de usuario id
router.get('/:id',auth, async (req,res, next) =>{ //rota de mudança dinamica async req/res
    try {
        const id = req.params.id //constante id recebe a rota objeto de solicitação req.params do id 
        const category = await Category.findOne({_id : id}) //findOne passando ID como query
        if(category){
            res.json(category)
        }else{
            res.status(404).send({ "error": MSGS.CATEGORY404}) // nao funcionou
        }
        res.json(category)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
    }
})

// @route  PATCH /Category/:id
// @desc   PARTIAL UPDATE Category
// @acess  Public

// Atualizar, alterar algum item
router.patch('/:id', auth, async (req, res, next) =>{
    try {
        const id = req.params.id
        const update = { $set: req.body } // $set palavra reservada q faz update apenas na propriedade do body 
        const category = await Category.findByIdAndUpdate(id, update, { new: true}) // new = true devolve atualizado
        if(category){
            res.json(category)
        }else{
            res.status(404).send({ "error": MSGS.CATEGORY404 })
        }
    }catch (err){
        console.error(err.message)
        res.status(500).send({ "error" : MSGS.GENERIC_ERROR})
    }
})


// @route  DELETE /Category/:id
// @desc   DELETE Category
// @acess  Public

// Filtra o ID e deleta (igual a um get id com findone and delete)
router.delete('/:id'), auth, async (req, res, next) =>{
    try{
        const id = req.params
        const category = await Category.findOneAndDelete({_id : id}) //chama category ja filtrando por ID e deletando
        if(category){
            res.json(category)
        }else{
            res.status(404).send({ "error": MSGS.CATEGORY404 })
    }
    }catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
        
    }
}


// @route  GET /Category
// @desc   LIST Category
// @acess  Public
router.get('/', auth, async (req,res, next) =>{
    try {
        const category = await Category.find({})
        res.json(category)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": GENERIC_ERROR})
    }
})

// @route  POST /Category
// @desc   CREATE Category
// @acess  Public
router.post('/', auth, [
    check('name').not().isEmpty(),check('icon').not().isEmpty()
],  async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }   else {
            let { name, icon} = req.body
            console.log(req.body)
            let category = new Category({ name, icon})
            await category.save()
            if (category.id) {
                res.json(category);
        }
    }
}   catch (err) {
    console.error(err.message)
    res.status(500).send({"error": GENERIC_ERROR})
}
})

module.exports = router;

