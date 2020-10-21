const MSGS = require('../messages')

module.exports = function (req, res, next) {
    try{
        if(!req.files) { //se o file existe...
            res.send(204).send({ error: MSGS.FILE_NOTSENT });
        } else {
            let photo = req.files.photo
            if (photo.mimetype.includes('image/')){
                photo.mv('./uploads/' + photo.name)
                next()
        }else{
            res.status(400).end({ error: MSGS.FILE_INVALID_FORMAT})
        }

    }

    }catch(err) {
        res.status(500).send({ "error": err.message })
    }
}