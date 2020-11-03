const express = require('express')
const Content = require('../../models/content')
const auth = require('../../middleaware/auth')
const file = require('../../middleaware/file_content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const MSGS = require('../../messages')
const get_complete_link = require('../../service/get_complete_link')



// @route    DELETE /content/:contentId
// @desc     DELETE content
// @access   Private
// @route    DELETE /content/:contentId
// @desc     DELETE content
// @access   Public
router.delete('/:contentId', auth, async(req, res, next) => {
  try {
    const id = req.params.contentId
    const content = await Content.findOneAndDelete({_id : id})
    if (content) {
      content = get_complete_link(content)
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
// @access   Public
router.patch('/:contentId', auth, file, async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const id = req.params.contentId
    const update = { $set: req.body }

    let content = await Content.findByIdAndUpdate(id, update, { new: true })
    if (content) {
      content = get_complete_link(content)
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
    let content = await Content.findOne({}).sort('-last_modification_date')
    content = get_complete_link(content)
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

    let content = new Content(req.body)
    await content.save()
    if (content.id) {
      content = get_complete_link(content)
      res.json(content);
    }
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR })
  }
})


module.exports = router;

