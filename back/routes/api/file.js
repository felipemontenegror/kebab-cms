const express = require('express')
const router = express.Router()
const auth = require('../../middleaware/auth');
const MSGS = require('../../messages')

router.post('/', auth, async(req, res) => {
    try{
        if(!req.files) { //se o file existe...(!) é not
            res.send(204).send({ error: MSGS.FILE_NOTSENT });
        } else {
            let photo = req.files.photo
            if (photo.mimetype.includes('image/')){
                photo.mv('./uploads/' + photo.name);

            let data = {
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size
            };

            res.status(201).send({ message: MSGS.FILE_UPLOADED, data: data});

        }else{
            res.status(400).end({ error: MSGS.FILE_INVALID_FORMAT, data: data})
        }

    }

    }catch(err) {
        res.status(500).send({ "error": err.message })
    }
})

module.exports = router;