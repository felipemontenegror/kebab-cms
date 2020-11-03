const express = require('express');
const Content = require('../../models/content');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleaware/auth')
const MSGS = require('../../messages')
const file = require('../../middleaware/file')
const get_complete_link = require('../../service/get_complete_link')
const get_max_order = require('../../service/get_max_order')

//banner é um array dentro de content 

// @route    POST /banner/:contentId
// @desc     CREATE banner
// @access   Private
router.post('/:contentId', auth, file, async (req, res, next) => {
  try {
    const id = req.params.contentId
    if(req.body.photo_name){
        req.body.photo = `banner/${req.body.photo_name}`
      }
    let content = await Content.findOne({ _id : id })
    if (!req.body.order){
      req.body.order = get_max_order(content, 'banner')
    }
    content = await Content.findOneAndUpdate({_id : id}, { $push: { banner: req.body } }, { new: true })
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


// @route    PATCH /banner/:contentId-:infoId
// @desc     PATCH banner
// @access   Private
router.patch('/:contentId-:infoId', auth, file, async (req, res, next) => {
  try {
    const id = req.params.contentId
    const infoId = req.params.infoId

    let query = {'banner._id' : infoId}
    if(req.body.photo_name){
      req.body.photo = `banner/${req.body.photo_name}`
    }
    let update = {}
    for (const [key, value] of Object.entries(req.body)) {
      update[`banner.$.${key}`] = value
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


// @route    DELETE /banner/:contentId
// @desc     DELETE banner
// @access   Private
router.delete('/:contentId', auth, async (req, res, next) => {
  try {
    const id = req.params.contentId
    
    content = await Content.findOneAndUpdate({_id : id}, 
      { $pull: { banner: req.body } }, { new: true })
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
