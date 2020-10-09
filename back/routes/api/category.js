const express = require('express');
const Category = require('../../models/category');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages')


// @route  GET /Category/:id
// @desc   DETAIL Category
// @acess  Public

//busca através de usuario id
router.get('/:id',[], async (req,res, next) =>{ //rota de mudança dinamica async req/res
    try {
        const id = req.params.id //variável id recebe a rota objeto de solicitação req.params do id 
        const category = await Category.findOne({_id : id}) //findOne passando ID como query
        if(category){
            res.json(category)
        }else{
            res.status(404).send({ "error": MSGS.CATEGORY404})
        }
        res.json(category)
    }   catch (err) {
        console.error(err.message)  
        res.status(500).send({ "error": MSGS.GENERIC_ERROR})
    }
})


// @route  GET /Category
// @desc   LIST Category
// @acess  Public
router.get('/', async (req,res, next) =>{
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
router.post('/', [
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

