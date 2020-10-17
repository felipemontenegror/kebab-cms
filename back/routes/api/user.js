const express = require('express');
const User = require('../../models/user');
const auth = require('../../middleaware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const MSGS = require('../../messages');



//@router   GET /user/:userId
//@desc     DETAIL user 
//acess     Private
router.get('/:userId', auth, async (req, res, next) => { 
    try{
        const id = req.params.userId
        const user = await User.findOne({_id : id})
        if (user) {
            res.json(user)
        } else {
            res.status(404).send({ "error" : MSGS.USER404 })
        }
    }   catch (err){
        console.error(err.message)
        res.status(500).send({ "error" : MSGS.GENERIC_ERROR })
    }
})

// @route    DELETE /user/:userId
// @desc     DELETE user
// @access   Private

router.delete('/:userId', auth, async(req, res, next) => {
    try{
        const id = req.params.userId
        const user = await User.findOneAndDelete({_id : id})
        if (user) {
            res.json(user)
        } else {
            res.status(404).send({ "error" : MSGS.USER404})
        }
    }   catch (err) {
        console.error(err.message)
        res.status(500).send({ "error" : MSGS.GENERIC_ERROR})
    }
})

// @route    PATCH /user/:userId
// @desc     PARTIAL EDIT user
// @access   Private

router.patch('/:userId', auth, async (request, res, next) => {
    try {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() })
        return
      }
      const id = request.params.userId
      const salt = await bcrypt.genSalt(10)
      
      let bodyRequest = request.body
  
      if(bodyRequest.password){
        bodyRequest.password = await bcrypt.hash(bodyRequest.password, salt)
      }
      const update = { $set: bodyRequest }
      const user = await User.findByIdAndUpdate(id, update, { new: true })
      if (user) {
        res.send(user)
      } else {
        res.status(404).send({ error: MSGS.USER404 })
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })
  

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', auth, async (req, res, next) => {
    try {
      const user = await User.find({})
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })
  

  // @route    POST /user
// @desc     CREATE user
// @access   Private
router.post('/', auth, [
    check('email', 'email is not valid').isEmail(),
    check('name').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ], async (req, res, next) => {
    try {
      let { name, email, password } = req.body
  
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      } else {
        let usuario = new User({ name, email, password })
  
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);
  
        await usuario.save()
        if (usuario.id) {
          res.json(usuario);
        }
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
  })
  
  
  module.exports = router;
  