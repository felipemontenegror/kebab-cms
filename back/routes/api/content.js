const express = require('express')
const Content = require('../../models/content')
const auth = require('../../middleaware/auth')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const MSGS = require('../../messages')


// @route    DELETE /content/:contentId
// @desc     DELETE content
// @access   Private
router.delete('/:contentId', auth, async(req, res, next) => {
  try {
    const id = req.params.contentId
    const content = await Content.findOneAndDelete({_id : id})
    if (content) {
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    PATCH /content/:contentId
// @desc     PARTIAL EDIT content
// @access   Private
router.patch('/:contentId', auth, async (request, res, next) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const id = request.params.contentId
    const update = { $set: bodyRequest }
    const content = await Content.findByIdAndUpdate(id, update, { new: true })
    if (content) {
      res.send(content)
    } else {
      res.status(404).send({ error: MSGS.CONTENT404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    GET /content
// @desc     LIST content
// @access   Public
router.get('/', async (req, res, next) => {
  try {
    const content = await Content.find({})
    res.json(content)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})

// @route    POST /content
// @desc     CREATE content
// @access   Private
router.post('/', auth, async (req, res, next) => {
  try {

    let content = new content(req.body)
    await content.save()
    if (content.id) {
        res.json(content);
    }
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


module.exports = router;
