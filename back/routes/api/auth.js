const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const MSGS = require('../../messages')


// @route    POST /auth
// @desc     Authenticate user & get token
// @access   Public
//API DE LOGIN
router.post('/',[
    check('email', MSGS.VALID_EMAIL).isEmail(),
    check('password', MSGS.REQUIRED_PASSWORD).exists()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    //const jwtSecret = process.env.jwtSecret || config.get('jwtSecret') 
    const { email, password } = req.body
    try{
        let user = await User.findOne({ email }).select('id password email name')  // Busca no banco e retorna User objeto no formado id, pass, email, name)
        if (!user) {
            return res.status(404).json({ errors: [{ msg: MSGS.USER404 }] })
        }else{
            const isMatch = await bcrypt.compare(password, user.password); //Se a senha for igual ao user senha é match, se nao for, desce e segue para erro
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: MSGS.PASSWORD_INVALID }] });
            }else{
                const payload = {
                    user: {
                      id: user.id,
                      name: user.name
                    }
                }
                
                jwt.sign( payload, config.get('jwtSecret'), { expiresIn: '5 days' }, //alterado
                    (err, token) => {
                      if (err) throw err;
                      payload.token = token
                      res.json(payload);
                    }
                  );
            }
        }

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }

})

module.exports = router;


