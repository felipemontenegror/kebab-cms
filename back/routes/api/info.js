const express = require('express');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleaware/auth')
const MSGS = require('../../messages')
const file = require('../../middleaware/file')
const get_complete_link = require('../../service/get_complete_link')
const get_max_order = require('../../service/get_max_order')



// @route    PATCH /infos/:contentId-:infoId
// @desc     PATCH infos
// @access   Private
router.patch('/:contentId-:infoId', auth, file, async (req, res, next) => {
  try {
    const id = req.params.contentId
    const infoId = req.params.infoId

    let query = {'infos._id' : infoId}
    if(req.body.photo_name){
      req.body.photo = `infos/${req.body.photo_name}`
    }
    let update = {}
    for (const [key, value] of Object.entries(req.body)) {
      update[`infos.$.${key}`] = value
    }
    await Content.updateOne(query, {$set : update}, { new: true })
    let content = await Content.findOne(query)
    
    if (content.id){
      content = get_complete_link(content)
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
  }
})

// @route    POST /infos/:contentId
// @desc     CREATE infos
// @access   Private
router.post('/:contentId', auth, file, async (req, res, next) => {
  try {
    const id = req.params.contentId
    if(req.body.photo_name){
        req.body.photo = `infos/${req.body.photo_name}`
    }
    let content = await Content.findOne({ _id : id })
    if (!req.body.order){
      req.body.order = get_max_order(content, 'infos')
    }
    content = await Content.findOneAndUpdate({_id : id}, { $push: { infos: req.body } }, { new: true })
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

// @route    DELETE /infos/:contentId
// @desc     DELETE infos
// @access   Private
router.delete('/:contentId', auth, async (req, res, next) => {
  try {
    const id = req.params.contentId
    
    let content = await Content.findOneAndUpdate({_id : id}, { $pull: { infos: req.body } }, { new: true })
    if (content) {
      content = get_complete_link(content)
      res.json(content)
    } else {
      res.status(404).send({ "error": MSGS.CONTENT404 })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
  }
})

module.exports = router;
